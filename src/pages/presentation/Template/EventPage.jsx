import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { Field, FieldArray, Formik } from 'formik'
import { AssignedEventFilter, AssignedEventList, AssignedEventLocation, EventPageConfig, EventPageDataList, EventPageListTimeZone, errorMessage, eventList, getLocationNameList, loadingStatus, successMessage } from '../../../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../components/bootstrap/Option'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Button from '../../../components/bootstrap/Button'
import { Col, Row } from 'react-bootstrap'
import Checks from '../../../components/bootstrap/forms/Checks'
import Label from '../../../components/bootstrap/forms/Label'
import Spinner from '../../../components/bootstrap/Spinner'
import Popovers from '../../../components/bootstrap/Popovers'
import { useNavigate, useParams } from 'react-router-dom'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import JoditEditor from 'jodit-react';

const EventPage = () => {

    const { id } = useParams()
    const { token, AssignedLocationList, AssignedEventList, ListTimeZone, EventTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const joditToolbarConfig = {
        buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent', 'link', 'paragraph', 'brush', 'fontsize', 'underline'],
      };

    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,

        );
        if (success == "Event Page updated successfully") {
            navigate('../template/pageList')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))
    };

    const [initialValues, setInitialValues] = useState({
        eventList: [
            {
                eventLocationId: '',
                eventId: '',
                scheduleDate: '',
                scheduleTime: '',
                published: 'now',
                timeZone: '',
                description: '',
            }
        ],
        BannerImage: ''
    })

    const imageUrl = EventTemplateData?.BannerImage

    useEffect(() => {
        dispatch(AssignedEventLocation(token))
        dispatch(EventPageDataList({ id, token }))
        dispatch(EventPageListTimeZone(token))
    }, [token])





    const LocationsLists = AssignedLocationList?.filter((item) => item?.numberOfTickets > 0)
    const uniqueArray = LocationsLists.reduce((accumulator, currentItem) => {
        const isDuplicate = accumulator.some(item => item.eventLocationId === currentItem.eventLocationId);
        if (!isDuplicate) {
            accumulator.push(currentItem);
        }
        return accumulator;
    }, []);

    const LocationNameList = uniqueArray.map(({ eventLocationId, eventLocationName }) => ({ label: eventLocationName, value: eventLocationId }))




    useEffect(() => {
        error && handleSave(error)
        success && handleSave(success)
        if (Loading) {
            setIsLoading(true)
        }
        else {
            setIsLoading(false)
        }
    }, [error, success, Loading]);


    const validateImageSize = (file, minWidth, maxWidth, minHeight, maxHeight) => {
        const image = new Image();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                image.onload = () => {
                    const { width, height } = image;
                    console.log(file, width, height);
                    if (
                        width >= minWidth &&
                        width <= maxWidth &&
                        height >= minHeight &&
                        height <= maxHeight
                    ) {

                        resolve();
                    } else {
                        reject(`Invalid image resolution`);
                    }
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };


    const disableDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate() - 1;

        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };


        const EditData = EventTemplateData?.eventList?.map((item) => {

            const locationField = item.eventLocationId;
            const eventField = item.eventId;
            const publishedStatus = item.published;
            const scheduleDateField = item.scheduleDateAndTime?.split(' ')[0];
            const scheduleTimeField = formatDate(item?.scheduleDateAndTime);
            const TimeZone = item.timeZone
            const DescriptionField = item.description
            return {
                eventLocationId: locationField,
                eventId: eventField,
                scheduleDate: scheduleDateField,
                scheduleTime: scheduleTimeField,
                published: publishedStatus,
                timeZone: TimeZone,
                description: DescriptionField,
            }
        })

        setInitialValues((prevState) => ({ ...prevState, eventList: EditData }))

    }, [EventTemplateData])




    const [filteredEvents, setFilteredEvents] = useState([[]]);

    const [indexToUpdate, setIndexToUpdate] = useState(null);

    const [locationToUpdate, setlocationToUpdate] = useState(null);


    const fetchFilteredEvents = async (LocationId) => {
        const response = await dispatch(AssignedEventFilter({ token, LocationId }));
        const EventListName = response?.payload?.map(({ eventName, _id }) => ({
            label: eventName,
            value: _id,
        }));
        return EventListName;
    };

    const updateFilteredEvent = async (eventList) => {
        const updatedFilteredEvents = await Promise.all(
            eventList?.map(async (item) => {
                const filteredEventData = await fetchFilteredEvents(item.eventLocationId);
                return filteredEventData;
            })
        );
        setFilteredEvents(updatedFilteredEvents);
    };

    useEffect(() => {
        updateFilteredEvent(initialValues.eventList);
    }, [initialValues.eventList]);



    const handleLocationChange = (LocationId, index, setFieldValue, value) => {
        setFieldValue(`eventList.${index}.eventLocationId`, LocationId);
        dispatch(AssignedEventFilter({ token, LocationId }));
        setIndexToUpdate(index)
        setlocationToUpdate(LocationId)
    };

    useEffect(() => {
        updateFilteredEvents();
    }, [indexToUpdate, locationToUpdate, AssignedEventList]);

    useEffect(() => {
        setFilteredEvents([[]])
        setIndexToUpdate(null)
        setlocationToUpdate(null)
    }, []);


    const updateFilteredEvents = () => {
        var EventListName
        if (AssignedEventList) {
            EventListName = AssignedEventList?.map(({ eventName, _id }) => ({
                label: eventName,
                value: _id,
            }));
        }
        const updatedFilteredEvents = [...filteredEvents];
        updatedFilteredEvents[indexToUpdate] = EventListName;
        setFilteredEvents(updatedFilteredEvents);
    };


    const handleEventChange = (eventIds, index, setFieldValue) => {
        console.log(eventIds, index);
        setFieldValue(`eventList.${index}.eventId`, eventIds)
        setIndexToUpdate(null);
        setlocationToUpdate(null)
    };



    const OnSubmit = async (values) => {

        console.log("values111", values);

        for (let i = 0; i < values?.eventList?.length; i++) {
            if (values?.eventList[i].scheduleTime != "" && values?.eventList[i].scheduleDate != "" && values?.eventList[i].scheduleTime != undefined && values?.eventList[i].scheduleDate != undefined) {
                console.log(values?.eventList[i]);
                let fromTimeHours = parseInt(values?.eventList[i].scheduleTime.split(':')[0], 10);
                const fromTimeMinutes = values?.eventList[i].scheduleTime.split(':')[1];
                let fromTimePeriod = '';

                if (fromTimeHours < 12) {
                    fromTimePeriod = 'AM';
                } else {
                    fromTimePeriod = 'PM';
                    if (fromTimeHours > 12) {
                        fromTimeHours -= 12;
                    }
                }


                const convertedFrom = `${fromTimeHours}:${fromTimeMinutes} ${fromTimePeriod}`;

                values.eventList[i].scheduleDateAndTime = values.eventList[i].scheduleDate.concat(" ", convertedFrom)

            }
        }
        for (let i = 0; i < values?.eventList?.length; i++) {

            if (values?.eventList[i]?.published == "now") {
                const removeField = ({ scheduleDate, scheduleTime, timeZone, scheduleDateAndTime, ...rest }) => rest;
                values.eventList[i] = removeField(values.eventList[i]);
            }
            if (values?.eventList[i]?.scheduleDateAndTime) {
                const removeField = ({ scheduleDate, scheduleTime, ...rest }) => rest;
                values.eventList[i] = removeField(values.eventList[i]);
            }

        }
        setIsLoading(true)

        dispatch(EventPageConfig({ token, id, values }))

    };

    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='Event' iconColor='success'>
                            <CardTitle>Event</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        {
                            Loading && 
                            <div className='d-flex justify-content-center align-items-center w-100'>
                              <Spinner/>
                            </div> || (
                                <div className='container'>
                            <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => { OnSubmit(values, resetForm) }} enableReinitialize={true}>
                                {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                                <div>
                                                    <Label className='h5'>Banner Image</Label>
                                                    <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' isDisplayInline="true">
                                                        <Button icon='Error'></Button>
                                                    </Popovers>
                                                </div>
                                                <Field name="BannerImage">
                                                    {({ field, form }) => (
                                                        <>
                                                            <Row className='imageBanner'>
                                                                <Col lg={6} >
                                                                    <div className="bannerBgImageMain">
                                                                        <img src={imageUrl} className="bannerBgImage" width={200} height={100} ></img>
                                                                        <div className="black"></div>
                                                                        <div className="bannerBgoverlay">
                                                                            Live Image
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />}
                                                                </Col>
                                                            </Row>

                                                            <div className='d-flex justify-content-end mb-2 mt-2'>
                                                                <button type='button' className="Imgbtn">+</button>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(event) => {
                                                                        const file = event.target.files[0];
                                                                        form.setFieldValue(field.name, file);
                                                                        validateImageSize(file, 1900, 2000, 500, 600)
                                                                            .then(() => {
                                                                                form.setFieldError(field.name, '');
                                                                            })
                                                                            .catch((error) => {
                                                                                form.setFieldError(field.name, error);
                                                                                form.setFieldValue(field.name, '');
                                                                                // Clear the field value if validation fails
                                                                            })
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </Field>
                                            </div>

                                        </Row>
                                        <FieldArray name='eventList'>
                                            {({ push, remove }) => (
                                                <>
                                                    {values?.eventList?.map((item, index) => (
                                                        <>
                                                            <Row key={index}>
                                                                <Col lg={12}>
                                                                    <Row className='d-flex flex-row justify-content-evenly align-items-center'>
                                                                        <Col lg={6} className='d-flex flex-row justify-content-evenly align-items-center gap-3'>
                                                                            <FormGroup className='locationSelect '>
                                                                                <Field
                                                                                    as="select"
                                                                                    name={`eventList.${index}.eventLocationId`}
                                                                                    onChange={(e) => handleLocationChange(e.target.value, index, setFieldValue, values)}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventList[index].eventLocationId}
                                                                                >
                                                                                    <Option value=''>Select location</Option>
                                                                                    {
                                                                                        LocationNameList?.map((item) => (
                                                                                            <>
                                                                                                <Option value={item?.value}  >{item?.label}</Option>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </Field>
                                                                            </FormGroup>
                                                                            <FormGroup className='locationSelect '>
                                                                                <Field
                                                                                    as="select"
                                                                                    name={`eventList.${index}.eventId`}
                                                                                    // onChange={handleChange}
                                                                                    onChange={(e) => handleEventChange(e.target.value, index, setFieldValue)}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventList[index].eventId}
                                                                                >
                                                                                    <Option value=''>Select Event</Option>
                                                                                    {
                                                                                        filteredEvents[index]?.map((item) => (
                                                                                            <>
                                                                                                <Option value={item?.value}>{item?.label}</Option>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </Field>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg={6}>
                                                                            <Row className='radioGroup mt-3'>
                                                                                <Col lg={4} className=' fs-5 eventRadio1'>
                                                                                    <Label className={values.eventList[index].published === 'schedule' ? " bg-warning text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2"}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`eventList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='schedule'

                                                                                        />
                                                                                        Schedule Date</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio2'>
                                                                                    <Label className={values.eventList[index].published === 'now' ? "bg-success text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2 "}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`eventList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='now'
                                                                                        />
                                                                                        Publish Now</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio3'>
                                                                                    <Label className={values.eventList[index].published === 'unpublish' ? "bg-danger text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2"}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`eventList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='unpublish'
                                                                                        />
                                                                                        Un-Publish</Label>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        {
                                                                            values?.eventList[index]?.published == 'schedule' && (
                                                                                <Col lg={12} >
                                                                                    <Row className='d-flex justify-content-center'>
                                                                                        <Col lg={3}>
                                                                                            <Field
                                                                                                type="date"
                                                                                                name={`eventList.${index}.scheduleDate`}
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                value={values.eventList[index].scheduleDate}
                                                                                                className='form-control'
                                                                                                min={disableDates()}
                                                                                            />
                                                                                        </Col>
                                                                                        <Col lg={3}>
                                                                                            <Field
                                                                                                type="time"
                                                                                                name={`eventList.${index}.scheduleTime`}
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                value={values.eventList[index].scheduleTime}
                                                                                                className='form-control'
                                                                                            />
                                                                                        </Col>
                                                                                        <Col lg={2}>
                                                                                            <FormGroup className='locationSelect '>
                                                                                                <Field
                                                                                                    as="select"
                                                                                                    name={`eventList.${index}.timeZone`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value={values.eventList[index].timeZone}
                                                                                                >
                                                                                                    <Option value=''>Select Time</Option>
                                                                                                    {
                                                                                                        ListTimeZone?.map((item) => (
                                                                                                            <>
                                                                                                                <Option value={item?._id}  >{item?.timeZone}</Option>
                                                                                                            </>
                                                                                                        ))
                                                                                                    }
                                                                                                </Field>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            )
                                                                        }
                                                                        <Col lg={8} >
                                                                            <FormGroup >
                                                                                <JoditEditor
                                                                                    value={values.eventList[index].description}
                                                                                    placeholder="Description"
                                                                                    config={joditToolbarConfig}
                                                                                    onChange={(content) => values.eventList[index].description = content}
                                                                                    onBlur={handleBlur}
                                                                                    name={`eventList.${index}.description`}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col>
                                                                    {values?.eventList[index]?.published == 'unpublish' && (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Button type="button" icon='Delete' color={'danger'} isLight
                                                                                // onClick={() => remove(index)} 
                                                                                onClick={() => {
                                                                                    remove(index)

                                                                                    setFilteredEvents((prevFilteredEvents) =>
                                                                                        prevFilteredEvents.filter((item, i) => i !== index)
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                            <hr />
                                                            <div>
                                                                {index === values.eventList.length - 1 && index !== values.eventList.length && (
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            push({
                                                                                eventLocationId: '',
                                                                                eventId: '',
                                                                                scheduleDate: '',
                                                                                scheduleTime: '',
                                                                                published: 'now',
                                                                                timeZone: '',
                                                                                description: '',
                                                                            })
                                                                            setFilteredEvents((prevFilteredEvents) => [...prevFilteredEvents, []]);
                                                                        }
                                                                        }
                                                                        // onClick={handleAddField}
                                                                        color={'warning'}
                                                                        className='mt-4 px-4 py-2 fs-5'
                                                                        icon={'Add'}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))

                                                    }
                                                </>
                                            )}
                                        </FieldArray>
                                        <div className='text-end'>
                                            <Button
                                                size='lg'
                                                className='w-20 '
                                                icon={isLoading ? undefined : 'Save'}
                                                isDark
                                                color={isLoading ? 'success' : 'info'}
                                                isDisable={isLoading}
                                                type='submit'
                                            >
                                                {isLoading && <Spinner isSmall inButton />}
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                            )
                        }
                        
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    )
}

export default EventPage
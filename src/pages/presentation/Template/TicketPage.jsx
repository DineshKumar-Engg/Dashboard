import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { Field, FieldArray, Formik } from 'formik'
import { AssignTicketPageList, AssignedEventFilter, AssignedEventList, AssignedEventLocation, EventPageConfig, EventPageDataList, EventPageListTimeZone, TicketPageConfig, TicketPageDataList, TicketPageEventList, errorMessage, eventList, getLocationNameList, loadingStatus, successMessage } from '../../../redux/Slice'
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

const TicketPage = () => {

    const { id } = useParams()
    const { token, TicketEventList, AssignedTicketList, ListTimeZone, TicketTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const joditToolbarConfig = {
        buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent', 'link', 'paragraph', 'brush', 'fontsize', 'underline'],
      };

    const imageUrl = TicketTemplateData?.ticketBannerImage

    useEffect(() => {
        dispatch(EventPageListTimeZone(token))
    }, [token])

    const EventList = TicketEventList?.map((item) => ({
        label: item?.eventList?.eventName,
        value: item?.eventList?.eventId
    }))

    // const TicketList = AssignedTicketList?.map(({ticketId,ticketname})=>({
    //     label:ticketname,
    //     value:ticketId
    // }))

    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,

        );
        if (success == "Ticket Page updated successfully") {
            navigate('../template/pageList')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))
    };

    const [initialValues, setInitialValues] = useState({
        ticketList: [
            {
                eventId: '',
                ticketId: '',
                scheduleDate: '',
                scheduleTime: '',
                published: 'now',
                timeZone: '',
                description: ''
            }
        ],
        ticketBannerImage: ''
    })

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

    const [filteredEvents, setFilteredEvents] = useState([[]]);

    const [indexToUpdate, setIndexToUpdate] = useState(null);

    const [locationToUpdate, setlocationToUpdate] = useState(null);


    useEffect(() => {
        dispatch(TicketPageEventList(token))
        dispatch(TicketPageDataList({ id, token }))
        dispatch(EventPageListTimeZone(token))
    }, [token])



    const handleLocationChange = (eventId, index, setFieldValue, value) => {
        setFieldValue(`ticketList.${index}.eventId`, eventId);
        dispatch(AssignTicketPageList({ token, eventId }));
        setIndexToUpdate(index)
        setlocationToUpdate(eventId)
    };

    const handleEventChange = (ticketIds, index, setFieldValue) => {
        setFieldValue(`ticketList.${index}.ticketId`, ticketIds)
        setIndexToUpdate(null);
        setlocationToUpdate(null)
    };
    useEffect(() => {
        updateFilteredEvents();
    }, [indexToUpdate, locationToUpdate, AssignedTicketList]);

    useEffect(() => {
        setFilteredEvents([[]])
        setIndexToUpdate(null)
        setlocationToUpdate(null)
    }, []);

    const updateFilteredEvents = () => {
        var TicketListName
        if (AssignedTicketList) {
            TicketListName = AssignedTicketList?.map(({ ticketId, ticketname }) => ({
                label: ticketname,
                value: ticketId
            }))
        }
        const updatedFilteredEvents = [...filteredEvents];
        updatedFilteredEvents[indexToUpdate] = TicketListName;
        setFilteredEvents(updatedFilteredEvents);
    };


    // Auto populate start

    const fetchFilteredEvents = async (eventId) => {

        const response = await dispatch(AssignTicketPageList({ token, eventId }));
        const TicketListName = response?.payload?.map(({ ticketId, ticketname }) => ({
            label: ticketname,
            value: ticketId,
        }));
        return TicketListName;
    };

    const updateFilteredEvent = async (ticketList) => {
        const updatedFilteredEvents = await Promise.all(
            ticketList?.map(async (item) => {
                const filteredEventData = await fetchFilteredEvents(item.eventId);
                return filteredEventData;
            })
        );
        setFilteredEvents(updatedFilteredEvents);
    };

    useEffect(() => {
        updateFilteredEvent(initialValues.ticketList);
    }, [initialValues.ticketList]);


    useEffect(() => {

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };


        const TicketData = TicketTemplateData?.ticketList?.map((item) => {

            const eventId = item.eventId;
            const ticketId = item.ticketId;
            const publishedStatus = item.published;
            const scheduleDateField = item.scheduleDateAndTime?.split(' ')[0];
            const scheduleTimeField = formatDate(item?.scheduleDateAndTime);
            const TimeZone = item.timeZone
            const description = item.description
            return {
                eventId: eventId,
                ticketId: ticketId,
                scheduleDate: scheduleDateField,
                scheduleTime: scheduleTimeField,
                published: publishedStatus,
                timeZone: TimeZone,
                description:description
            }
        })

        setInitialValues((prevState) => ({ ...prevState, ticketList: TicketData }))

    }, [TicketTemplateData])

    // Auto populate start

    const OnSubmit = async (values) => {


        for (let i = 0; i < values?.ticketList?.length; i++) {
            if (values?.ticketList[i].scheduleTime != "" && values?.ticketList[i].scheduleDate != "" && values?.ticketList[i].scheduleTime != undefined && values?.ticketList[i].scheduleDate != undefined) {
                console.log(values?.ticketList[i]);
                let fromTimeHours = parseInt(values?.ticketList[i].scheduleTime.split(':')[0], 10);
                const fromTimeMinutes = values?.ticketList[i].scheduleTime.split(':')[1];
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

                values.ticketList[i].scheduleDateAndTime = values.ticketList[i].scheduleDate.concat(" ", convertedFrom)

            }
        }
        for (let i = 0; i < values?.ticketList?.length; i++) {

            if (values?.ticketList[i]?.published == "now") {
                const removeField = ({ scheduleDate, scheduleTime, scheduleDateAndTime, ...rest }) => rest;
                values.ticketList[i] = removeField(values.ticketList[i]);
            }
            if (values?.ticketList[i]?.scheduleDateAndTime) {
                const removeField = ({ scheduleDate, scheduleTime, ...rest }) => rest;
                values.ticketList[i] = removeField(values.ticketList[i]);
            }

        }

        console.log(values)

        setIsLoading(true)

        dispatch(TicketPageConfig({ token, id, values }))

    };


    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='Event' iconColor='success'>
                            <CardTitle>Ticket</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
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
                                                <Field name="ticketBannerImage">
                                                    {({ field, form }) => (
                                                        <>
                                                            <Row className='imageBanner'>
                                                                <Col lg={6} >
                                                                    <div className="bannerBgImageMain">
                                                                        <img src={imageUrl} className="bannerBgImage" width={250} height={100} ></img>
                                                                        <div className="black"></div>
                                                                        <div className="bannerBgoverlay">
                                                                            Live Image
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={250} height={100} />}
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
                                        <FieldArray name='ticketList'>
                                            {({ push, remove }) => (
                                                <>
                                                    {values?.ticketList?.map((item, index) => (
                                                        <>
                                                            <Row key={index}>
                                                                <Col lg={12}>
                                                                    <Row className='d-flex flex-row justify-content-evenly align-items-center'>
                                                                        <Col lg={6} className='d-flex flex-row justify-content-evenly align-items-center gap-3'>
                                                                            <FormGroup className='locationSelect '>
                                                                                <Field
                                                                                    as="select"
                                                                                    name={`ticketList.${index}.eventId`}
                                                                                    onChange={(e) => handleLocationChange(e.target.value, index, setFieldValue, values)}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.ticketList[index].eventId}
                                                                                >
                                                                                    <Option value=''>Select Event</Option>
                                                                                    {
                                                                                        EventList?.map((item) => (
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
                                                                                    name={`ticketList.${index}.ticketId`}
                                                                                    // onChange={handleChange}
                                                                                    onChange={(e) => handleEventChange(e.target.value, index, setFieldValue)}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.ticketList[index].ticketId}
                                                                                >
                                                                                    <Option value=''>Select Ticket</Option>
                                                                                    {
                                                                                        filteredEvents[index]?.map((item) => (
                                                                                            <>
                                                                                                <Option value={item?.value}>{item?.label}</Option>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </Field>
                                                                            </FormGroup>
                                                                           
                                                                                            <FormGroup className='locationSelect '>
                                                                                                <Field
                                                                                                    as="select"
                                                                                                    name={`ticketList.${index}.timeZone`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value={values.ticketList[index].timeZone}
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
                                                                        <Col lg={6}>
                                                                            <Row className='radioGroup mt-3'>
                                                                                <Col lg={4} className=' fs-5 eventRadio1'>
                                                                                    <Label className={values.ticketList[index].published === 'schedule' ? " bg-warning text-white fw-normal px-4 py-2 " : "bg-info text-white fw-normal px-4 py-2"}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`ticketList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='schedule'

                                                                                        />
                                                                                        Schedule Date</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio2'>
                                                                                    <Label className={values.ticketList[index].published === 'now' ? "bg-success text-white fw-normal px-4 py-2 " : "bg-info text-white fw-normal px-4 py-2 "}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`ticketList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='now'
                                                                                        />
                                                                                        Publish Now</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio3'>
                                                                                    <Label className={values.ticketList[index].published === 'unpublish' ? "bg-danger text-white fw-normal px-4 py-2 " : "bg-info text-white fw-normal px-4 py-2"}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`ticketList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='unpublish'
                                                                                        />
                                                                                        Un-Publish</Label>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        {
                                                                            values?.ticketList[index]?.published == 'schedule' && (
                                                                                <Col lg={12} >
                                                                                    <Row className='d-flex justify-content-center'>
                                                                                        <Col lg={3}>
                                                                                            <Field
                                                                                                type="date"
                                                                                                name={`ticketList.${index}.scheduleDate`}
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                value={values.ticketList[index].scheduleDate}
                                                                                                className='form-control'
                                                                                                min={disableDates()}
                                                                                            />
                                                                                        </Col>
                                                                                        <Col lg={3}>
                                                                                            <Field
                                                                                                type="time"
                                                                                                name={`ticketList.${index}.scheduleTime`}
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                value={values.ticketList[index].scheduleTime}
                                                                                                className='form-control'
                                                                                            />
                                                                                        </Col>
                                                                                        
                                                                                    </Row>
                                                                                </Col>
                                                                            )
                                                                        }
                                                                        <Col lg={8} >
                                                                            <FormGroup >
                                                                                <JoditEditor
                                                                                    value={values.ticketList[index].description}
                                                                                    placeholder="Description"
                                                                                    config={joditToolbarConfig}
                                                                                    onChange={(content) => values.ticketList[index].description = content}
                                                                                    onBlur={handleBlur}
                                                                                    name={`ticketList.${index}.description`}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col>
                                                                    {values?.ticketList[index]?.published == 'unpublish' && (
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
                                                                {index === values.ticketList.length - 1 && index !== values.ticketList.length && (
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            push( {
                                                                                eventId: '',
                                                                                ticketId: '',
                                                                                scheduleDate: '',
                                                                                scheduleTime: '',
                                                                                published: 'now',
                                                                                timeZone: '',
                                                                                description: ''
                                                                            })
                                                                            // setFilteredEvents((prevFilteredEvents) => [...prevFilteredEvents, []]);
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
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    )
}

export default TicketPage
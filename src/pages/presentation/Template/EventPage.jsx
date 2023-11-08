import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
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
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop,oopsTitle, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'
import { errorMonitor } from 'events'


const EventPage = () => {


    const { id } = useParams()
    const { token, AssignedLocationList, AssignedEventList, EventTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);


    const Notification = (val, tit, pos, ico, btn) => {
        Swal.fire({
            position: `${pos}`,
            title: `${tit}`,
            text: `${val}`,
            icon: `${ico}`,
            confirmButtonText: `${btn}`,
        })
        if (success == "Event Page updated successfully") {
            navigate(-1)
        }
        clearErrors();
        clearSuccesses();
        setLoadingStatus(false);
    }

    useEffect(() => {
        error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
        success && Notification(success, scc, posTop, sccIcon, BtnGreat)
        Loading ? setIsLoading(true) : setIsLoading(false)
    }, [error, success, Loading]);






    const joditToolbarConfig = {
        "useSearch": false,
        "toolbarButtonSize": "small",
        "enter": "P",
        "toolbarAdaptive": false,
        "toolbarSticky": false,
        "showCharsCounter": false,
        "showWordsCounter": false,
        "showXPathInStatusbar": false,
        "buttons": "bold,italic,underline,align,ul,ol,fontsize,paragraph,brush,lineHeight,spellcheck,cut,copy,paste,selectall,link,symbols,indent,outdent"
    }



    const [initialValues, setInitialValues] = useState({
        eventList: [
            {
                eventLocationId: '',
                eventId: '',
                published: 'now',
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



    const validate = (values) => {
        const errors = {};

        values?.eventList?.forEach((event, index) => {
            if (!event?.eventLocationId) {
                errors[`eventList[${index}].eventLocationId`] = "Required *";
            }

            if (!event?.eventId) {
                errors[`eventList[${index}].eventId`] = "Required *";
            }

        });

        return errors;
    };



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
                        reject(`Invalid image resolution,Please select image width 1900px to 2000px and height 500px to 600px`);
                    }
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };



    useEffect(() => {

    
        const EditData = EventTemplateData?.eventList?.map((item) => {

            const locationField = item.eventLocationId;
            const eventField = item.eventId;
            const publishedStatus = item.published;
            const DescriptionField = item.description
            return {
                eventLocationId: locationField,
                eventId: eventField,
                published: publishedStatus,
                description: DescriptionField,
            }
        })

        if (EventTemplateData?.eventList?.length > 0) {
            setInitialValues((prevState) => ({ ...prevState, eventList: EditData }))
        }
        else {
            setInitialValues({
                eventList: [
                    {
                        eventLocationId: '',
                        eventId: '',
                        published: 'unpublish',
                        description: '',
                    }
                ],
                BannerImage: ''
            })
        }

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

        if (values.eventList.length == 0) {
            values.eventList = ''
        }
        console.log("values111", values);
        dispatch(EventPageConfig({ token, id, values }))
        setIsLoading(true)

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
                        <div className='container'>
                            <Formik initialValues={initialValues} validate={validate} onSubmit={(values) => { OnSubmit(values) }} enableReinitialize={true}>
                                {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm, errors }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                                <div>
                                                    <h3 className='fw-bold  text-center mb-3'>Banner Image
                                                        <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' >
                                                            <Button icon='Error'></Button>
                                                        </Popovers>
                                                    </h3>
                                                </div>
                                                <Field name="BannerImage">
                                                    {({ field, form }) => (
                                                        <>
                                                            <Row className='imageBanner'>
                                                                <Col lg={6} >
                                                                    <div className="bannerBgImageMain">
                                                                        <img src={imageUrl} className="bannerBgImage" ></img>
                                                                        <div className="black"></div>
                                                                        <div className="bannerBgoverlay">
                                                                            <h4> Live Image</h4>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    {field.value && (
                                                                        <div className='d-flex '>
                                                                            <div className="bannerBgImageMain">
                                                                                <div className='d-flex align-items-start justify-content-center'>
                                                                                    <img src={URL.createObjectURL(field.value)} alt="Logo Image" />
                                                                                </div>
                                                                                <div className="black"></div>
                                                                                <div className="bannerBgoverlay">
                                                                                    <h4>New Image</h4>
                                                                                </div>
                                                                            </div>
                                                                            <div className='cancelImageBtnEvent'>
                                                                                <Button icon='Cancel' isLight color='danger' onClick={() => { setFieldValue('BannerImage', '') }}></Button>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    }
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
                                                                                Notification(error, oopsTitle, poscent, errIcon, BtnCanCel)
                                                                            })
                                                                            .finally(() => {
                                                                                event.target.value = null;
                                                                            });
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
                                                    {
                                                        values?.eventList != '' &&
                                                        (
                                                            values?.eventList?.map((item, index) => (
                                                                <>
                                                                    <Row key={index} className='mt-5'>
                                                                        <Col lg={12}>
                                                                            <Row className='d-flex flex-row justify-content-center align-items-center'>
                                                                                <Col lg={4} className='d-flex flex-row justify-content-between align-items-center gap-2'>
                                                                                    <FormGroup className='locationSelect  d-block '>
                                                                                        <h5>Location</h5>
                                                                                        <Field
                                                                                            as="select"
                                                                                            name={`eventList.${index}.eventLocationId`}
                                                                                            onChange={(e) => handleLocationChange(e.target.value, index, setFieldValue, values)}
                                                                                            onBlur={handleBlur}
                                                                                            value={values.eventList[index].eventLocationId}
                                                                                            className='m-0'
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

                                                                                        <p className='text-danger'>{errors[`eventList[${index}].eventLocationId`]}</p>
                                                                                    </FormGroup>
                                                                                    <FormGroup className='locationSelect '>
                                                                                        <h5> Events</h5>
                                                                                        <Field
                                                                                            as="select"
                                                                                            name={`eventList.${index}.eventId`}
                                                                                            // onChange={handleChange}
                                                                                            onChange={(e) => handleEventChange(e.target.value, index, setFieldValue)}
                                                                                            onBlur={handleBlur}
                                                                                            value={values.eventList[index].eventId}
                                                                                            className='m-0'
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
                                                                                        <p className='text-danger'>{errors[`eventList[${index}].eventId`]}</p>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col lg={8} >
                                                                                    <Row>
                                                                                        <h5 className='text-center'>Event Status</h5>
                                                                                    </Row>
                                                                                    <Row className='radioGroup d-flex flex-row justify-content-around align-items-center'>

                                                                                        <Col lg={3} className=' fs-5 eventRadio2'>
                                                                                            <Label className={values.eventList[index].published === 'now' ? "eventRadio2" : "eventRadioBlue"}>
                                                                                                <Field
                                                                                                    type="radio"
                                                                                                    name={`eventList.${index}.published`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value='now'
                                                                                                />
                                                                                                <Popovers title='Tips ?' trigger='hover' desc='Click to Publish an Event now' >
                                                                                                    Publish Now
                                                                                                </Popovers>
                                                                                            </Label>
                                                                                        </Col>
                                                                                        <Col lg={3} className=' fs-5 eventRadio3'>
                                                                                            <Label className={values.eventList[index].published === 'unpublish' ? "eventRadio3" : "eventRadioBlue"}>
                                                                                                <Field
                                                                                                    type="radio"
                                                                                                    name={`eventList.${index}.published`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value='unpublish'
                                                                                                />
                                                                                                <Popovers title='Tips ?' trigger='hover' desc='Click to Unpublish an Event to remove from website' >
                                                                                                    Unpublish
                                                                                                </Popovers>
                                                                                            </Label>
                                                                                        </Col>
                                                                                        <Col lg={3} className='d-flex align-items-center eventRadio3'>
                                                                                            
                                                                                            <Button type="button" icon='Delete' color={'danger'} isLight  className='py-3 px-4'
                                                                                                
                                                                                                onClick={() => {
                                                                                                    
                                                                                                    if(values.eventList[index].published === 'unpublish'){
                                                                                                        remove(index)
                                                                                                        setFilteredEvents((prevFilteredEvents) =>
                                                                                                            prevFilteredEvents.filter((item, i) => i !== index)
                                                                                                        );
                                                                                                    }else{
                                                                                                        const errorMessage = 'Please unpublish Event to delete'
                                                                                                        Notification(errorMessage, errTitle, poscent, errIcon, BtnCanCel)
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                Delete
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>

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
                                                                                        published: 'unpublish',
                                                                                        description: '',
                                                                                    })
                                                                                    setFilteredEvents((prevFilteredEvents) => [...prevFilteredEvents, []]);
                                                                                }
                                                                                }
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

                                                        )
                                                    }

                                                </>
                                            )}
                                        </FieldArray>
                                        <div className='text-end'>
                                            <Button
                                                size='lg'
                                                className='w-20 '
                                                icon={isLoading ? undefined : 'Save'}
                                                color={isLoading ? 'success' : 'info'}
                                                isDisable={isLoading}
                                                type='submit'
                                                isLight
                                            >
                                                {isLoading && <Spinner isSmall inButton />}
                                                Save & Close
                                            </Button>
                                            <Button
                                                className='w-20 py-3 px-3 my-3 mx-3'
                                                color={'danger'}
                                                isLight
                                                shadow='default'
                                                hoverShadow='none'
                                                icon='Cancel'
                                                onClick={() => {
                                                    resetForm()
                                                    navigate(-1)
                                                }}
                                            >
                                                Cancel
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

export default EventPage
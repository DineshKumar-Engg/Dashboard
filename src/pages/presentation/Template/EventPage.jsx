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
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'
import { errorMonitor } from 'events'


const EventPage = () => {


    const { id } = useParams()
    const { token, AssignedLocationList, AssignedEventList, ListTimeZone, EventTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);


	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			// timer: 3000
		})
		if (success == "Event Page updated successfully") {
			navigate(-1)
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
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
                scheduleDate:'' ,
                scheduleTime:'' ,
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

    // const validationSchema = Yup.object().shape({
    //     eventList: Yup.array().of(
    //         Yup.object().shape({
    //             eventLocationId: Yup.string().required("required*"),
    //             eventId: Yup.string().required("required*"),
    //             published: Yup.string().required("required*"),
            
    //         })
    //     )
    // });

    const validate = (values) => {
        const errors = {};
    
        values?.eventList?.forEach((event, index) => {
          if (!event?.eventLocationId) {
            errors[`eventList[${index}].eventLocationId`] = "Required *";
          }
    
          if (!event?.eventId) {
            errors[`eventList[${index}].eventId`] = "Required *";
          }
    
        //   if (event?.published === 'schedule') {
        //     if (!event.scheduleDate) {
        //       errors[`eventList[${index}].scheduleDate`] = "Required *";
        //     }
        //     if (!event?.scheduleTime) {
        //       errors[`eventList[${index}].scheduleTime`] = "Required *";
        //     }
        //     if (!event?.timeZone) {
        //       errors[`eventList[${index}].timeZone`] = "Required *";
        //     }
        //   }
        });
    
        console.log(errors);

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

        if (EventTemplateData?.eventList?.length > 0) {
            setInitialValues((prevState) => ({ ...prevState, eventList: EditData }))
        }
        else {
            setInitialValues({
                eventList: [
                    {
                        eventLocationId: '',
                        eventId: '',
                        scheduleDate:'' ,
                        scheduleTime:'' ,
                        published: 'now',
                        timeZone: '',
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

            if (values?.eventList[i]?.published == "now" || values?.eventList[i]?.published == "unpublish" ) {
                const removeField = ({ scheduleDate, scheduleTime, timeZone, scheduleDateAndTime, ...rest }) => rest;
                values.eventList[i] = removeField(values.eventList[i]);
            }
            if (values?.eventList[i]?.scheduleDateAndTime) {
                const removeField = ({ scheduleDate, scheduleTime, ...rest }) => rest;
                values.eventList[i] = removeField(values.eventList[i]);
            }
        }

        if (values.eventList.length == 0) {
            values.eventList = ''
        }

        console.log("values111", values);

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
                        <div className='container'>
                            <Formik initialValues={initialValues} validate={validate } onSubmit={(values) => { OnSubmit(values) }} enableReinitialize={true}>
                                {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm ,errors}) => (
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
                                                    {
                                                        values?.eventList != '' &&
                                                        (
                                                            values?.eventList?.map((item, index) => (
                                                                <>
                                                                    <Row key={index} className='mt-5'>
                                                                        <Col lg={12}>
                                                                            <Row className='d-flex flex-row justify-content-evenly align-items-center'>
                                                                                <Col lg={4} className='d-flex flex-row justify-content-evenly align-items-center gap-2'>
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
                                                                                <Col lg={8}>
                                                                                    <Row>
                                                                                        <h5 className='text-center'>Event Status</h5>
                                                                                    </Row>
                                                                                    <Row className='radioGroup'>
                                                                                        <Col lg={3} className=' fs-5 eventRadio1'>
                                                                                                {/* <Button icon='Error'></Button> */}
                                                                                                <Label className={values.eventList[index].published === 'schedule' ? "eventRadio1" : "eventRadioBlue"}>
                                                                                                    <Field
                                                                                                        type="radio"
                                                                                                        name={`eventList.${index}.published`}
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        value='schedule'
                                                                                                    />
                                                                                                   
                                                                                                    <Popovers title='Tips ?' trigger='hover' desc='Click to Schedule Date And Time to Publish an Event' >                                                                                                    
                                                                                                    Schedule Date 
                                                                                                    </Popovers>
                                                                                                    </Label>
                                                                                            

                                                                                        </Col>
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
                                                                                        <Col lg={3} className='d-flex align-items-center'>
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
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                {
                                                                                    values?.eventList[index]?.published == 'schedule' && (
                                                                                        <Col lg={12}>
                                                                                            <Row className='d-flex justify-content-center'>
                                                                                                <Col lg={3}>
                                                                                                <Label>Schedule Date</Label>
                                                                                                    <Field
                                                                                                        type="date"
                                                                                                        name={`eventList.${index}.scheduleDate`}
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        value={values.eventList[index].scheduleDate}
                                                                                                        className='form-control'
                                                                                                        min={disableDates()}
                                                                                                    />
                                                                                                    <p className='text-danger'>{errors[`eventList[${index}].scheduleDate`]}</p>
                                                                                                </Col>
                                                                                                <Col lg={3}>
                                                                                                <Label>Schedule Time</Label>
                                                                                                    <Field
                                                                                                        type="time"
                                                                                                        name={`eventList.${index}.scheduleTime`}
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        value={values.eventList[index].scheduleTime}
                                                                                                        className='form-control'
                                                                                                    />
                                                                                                     <p className='text-danger'>{errors[`eventList[${index}].scheduleTime`]}</p>

                                                                                                </Col>
                                                                                                <Col lg={2}>
                                                                                                    <FormGroup className='locationSelect ' label='Schedule Time-Zone'>
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
                                                                                                        <p className='text-danger'>{errors[`eventList[${index}].timeZone`]}</p>
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

                                                                        {/* <Col>
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
                                                                        </Col> */}
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
                                                                                        scheduleDate:'' ,
                                                                                        scheduleTime:'' ,
                                                                                        published: 'now',
                                                                                        timeZone: '',
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
                                                    navigate('../template/pageList')
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
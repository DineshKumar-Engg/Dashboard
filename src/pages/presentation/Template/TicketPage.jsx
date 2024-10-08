import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { ErrorMessage, Field, FieldArray, Formik, useFormikContext } from 'formik'
import { AssignTicketPageList, AssignedEventFilter, AssignedEventList, AssignedEventLocation, EventPageConfig, EventPageDataList, EventPageListTimeZone, GetTicketRedemptionData, TicketPageConfig, TicketPageDataList, TicketPageEventList, errorMessage, eventList, getLocationNameList, loadingStatus, successMessage } from '../../../redux/Slice'
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
import { errTitle, scc, poscent, posTop, errIcon, oopsTitle, sccIcon, BtnCanCel, BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'
import { Calendar } from 'primereact/calendar';
import { today } from '../Constant'

const TicketPage = () => {

    const { id } = useParams()
    const { token, TicketEventList, AssignedTicketList,TicketRedemptionData, TicketTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);




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




    const EventList = TicketEventList?.map((item) => ({
        label: item?.eventList?.eventName,
        value: item?.eventList?.eventId,
        timeZone:item?.eventList?.timezoneName
    }))


    const Notification = (val, tit, pos, ico, btn) => {
        Swal.fire({
            position: `${pos}`,
            title: `${tit}`,
            text: `${val}`,
            icon: `${ico}`,
            confirmButtonText: `${btn}`,
            // timer: 3000
        })
        if (success == "Ticket Page updated successfully") {
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


    const [initialValues, setInitialValues] = useState({
        ticketList: [
            {
                eventId: '',
                ticketId: '',
                published: 'unpublish',
                scheduleDateAndTime:'',
                scheduleToDateAndTime:'',
                description: '',
                timeZonename:'',
                scheduleMin:'',
                scheduleMax:''
            }
        ],
        ticketBannerImage: ''
    })


    const eventZone =(eveId)=>{
    const selectedEvent = EventList?.find((event) => event.value === eveId);
    return selectedEvent?.timeZone
    
    }

    const tickId = async (id)=>{
        const response = await dispatch(GetTicketRedemptionData({ token, id }))

           const allDates = response?.payload?.redemption.reduce((dates, entry) => {
               dates.push(entry.redemDateAndTimeFrom, entry.redemDateAndTimeTo);
               return dates;
           }, []);
           
           const dateObjects = allDates?.map(dateString => new Date(dateString));
           
           const minDate =calculateMinDate (Math.min(...dateObjects)) ;
           const maxDate = calculateMaxDate (Math.max(...dateObjects));
   
           return {
               minDateVal:minDate,
               maxDateVal:maxDate
           }
    }

    useEffect(() => {

        const processData = async () => {
            const TicketData = await Promise.all(
                TicketTemplateData?.ticketList?.map(async (item) => {
                    const formatDate = (dateString) => {
                        const date = new Date(dateString);
                        return date;
                    };
    
                    const response = await dispatch(GetTicketRedemptionData({ token, id: item.ticketId }));
    
                    const allDates = response?.payload?.redemption.reduce((dates, entry) => {
                        dates.push(entry.redemDateAndTimeFrom, entry.redemDateAndTimeTo);
                        return dates;
                    }, []);
                    
                    const dateObjects = allDates?.map(dateString => new Date(dateString));
                    const minDate = calculateMinDate(Math.min(...dateObjects));
                    const maxDate = calculateMaxDate(Math.max(...dateObjects));
                    
                    console.log("minDate, maxDate", minDate, maxDate);
    
                    return {
                        eventId: item.eventId,
                        ticketId: item.ticketId,
                        published: item.published,
                        scheduleDateAndTime: item.scheduleDateAndTime ? formatDate(item.scheduleDateAndTime) : '',
                        scheduleToDateAndTime: item.scheduleToDateAndTime ? formatDate(item.scheduleToDateAndTime) : '',
                        description: item.description,
                        timeZonename: eventZone(item.eventId),
                        scheduleMin: minDate,
                        scheduleMax: maxDate
                    };
                })
            );
    
            if (TicketTemplateData?.ticketList?.length > 0) {
                setInitialValues((prevState) => ({ ...prevState, ticketList: TicketData }))
            }
            else {
                setInitialValues({
                    ticketList: [
                        {
                            eventId: '',
                            ticketId: '',
                            published: 'unpublish',
                            scheduleDateAndTime:'',
                            scheduleToDateAndTime:'',
                            description: ''
                        }
                    ],
                    ticketBannerImage: ''
                })
            }
            console.log('TicketData', TicketData);
        };
    
        processData();

    }, [TicketTemplateData])

    const handleLocationChange = (eventId, index, setFieldValue, value) => {
        
        setFieldValue(`ticketList.${index}.eventId`, eventId);
        const selectedEvent = EventList?.find((event) => event.value === eventId);
        setFieldValue(`ticketList.${index}.timeZonename`, selectedEvent?.timeZone );
        dispatch(AssignTicketPageList({ token, eventId }));
        setIndexToUpdate(index)
        setlocationToUpdate(eventId)
    };

    const calculateMaxDate = (val) => {
        if(val){
            const eventDateAndTimeFrom = new Date(val);
            const news = new Date(eventDateAndTimeFrom.getFullYear(), eventDateAndTimeFrom.getMonth(), eventDateAndTimeFrom.getDate(),23,59,59); // Set time to end of the day (23:59:59)
            return news
        }
      return null
    };

    const calculateMinDate = (val) => {
        if(val){
            const eventDateAndTimeFrom = new Date(val);
            const news = new Date(eventDateAndTimeFrom.getFullYear(), eventDateAndTimeFrom.getMonth(), eventDateAndTimeFrom.getDate(),0,10,10); // Set time to end of the day (23:59:59)
            return news
        }
      return null
    };




    const handleEventChange = async (id, index,setFieldValue) => {
        setFieldValue(`ticketList.${index}.ticketId`, id)

        const {minDateVal,maxDateVal} = await tickId(id)

        setFieldValue(`ticketList.${index}.scheduleMin`,minDateVal)
        setFieldValue(`ticketList.${index}.scheduleMax`,maxDateVal)

        setIndexToUpdate(null);
        setlocationToUpdate(null)
    };




    const validateImageSize = (file, minWidth, maxWidth, minHeight, maxHeight) => {
        const image = new Image();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                image.onload = () => {
                    const { width, height } = image;
                    
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
  

    const [filteredEvents, setFilteredEvents] = useState([[]]);

    const [indexToUpdate, setIndexToUpdate] = useState(null);

    const [locationToUpdate, setlocationToUpdate] = useState(null);


    useEffect(() => {
        dispatch(TicketPageEventList(token))
        dispatch(TicketPageDataList({ id, token }))
    }, [id,token])

    

    




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
    const HandleEditor = (setFieldValue, index, content) => {
        setFieldValue(`ticketList.${index}.description`, content)
    }

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


    const extractTimePart = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;
        const timePart = formattedDate.slice(10, 16);
        return [ timePart, formattedDate?.split(' ')[0]];
    }

    const extractTimeSubmit = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }




    const validate = (values) => {
        const errors = {};

        values?.ticketList?.forEach((ticket, index) => {
            if (!ticket?.eventId) {
                errors[`ticketList[${index}].eventId`] = "Required *";
            }

            if (!ticket?.ticketId) {
                errors[`ticketList[${index}].ticketId`] = "Required *";
            }
            if (ticket?.published === 'schedule') {
                if (!ticket.scheduleDateAndTime ) {
                    errors[`ticketList[${index}].scheduleDateAndTime`] = "Required *";
                }
                if (!ticket.scheduleToDateAndTime) {
                    errors[`ticketList[${index}].scheduleToDateAndTime`] = "Required *";
                }
                
                if (
                    ticket?.scheduleDateAndTime &&
                    ticket?.scheduleToDateAndTime
                ) {
                    const extractedTimeFrom = extractTimePart( ticket.scheduleDateAndTime);
                    const extractedTimeTo = extractTimePart(ticket.scheduleToDateAndTime);

                    if (extractedTimeTo[1] === extractedTimeFrom[1] && extractedTimeTo[0] < extractedTimeFrom[0]) {
                        errors[`ticketList[${index}].scheduleToDateAndTime`] = "To Time must be greater than From Time";
                    } 
                    if(extractedTimeTo[1]<extractedTimeFrom[1]){
                        errors[`ticketList[${index}].scheduleToDateAndTime`] = 'To Date must be greater than From Date';
                    }
                }
            }
        });



        return errors;
    };

    const OnSubmit = async (values) => {

        

        if (values.ticketList.length == 0) {
            values.ticketList = ''
        }else{
            values?.ticketList?.forEach((val, index) => {
                values.ticketList[index].scheduleDateAndTime = extractTimeSubmit(val?.scheduleDateAndTime);
                values.ticketList[index].scheduleToDateAndTime = extractTimeSubmit(val?.scheduleToDateAndTime);
            })
    
            for (let i = 0; i < values?.ticketList?.length; i++) {
    
                if (values?.ticketList[i]?.published == "now" || values?.ticketList[i]?.published == "unpublish") {
                    const removeField = ({scheduleDateAndTime,scheduleToDateAndTime,timeZonename,scheduleMax,scheduleMin, ...rest }) => rest;
                    values.ticketList[i] = removeField(values.ticketList[i]);
                }else if(values?.ticketList[i]?.published == "schedule"){
                    const removeField = ({scheduleMax,scheduleMin,timeZonename, ...rest }) => rest;
                    values.ticketList[i] = removeField(values.ticketList[i]);
                }
               
            }
        }

        console.log(values);
        
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
                            <Formik initialValues={initialValues} validate={validate} onSubmit={(values, { resetForm }) => { OnSubmit(values, resetForm) }} enableReinitialize={true}>
                                {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm, errors }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                                <div>
                                                    <h3 className='fw-bold  text-center mb-3'>Banner Image
                                                        <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900px to 2000px and height 500px to 600px'>
                                                            <Button icon='Error'></Button>
                                                        </Popovers>
                                                    </h3>
                                                </div>
                                                <Field name="ticketBannerImage">
                                                    {({ field, form }) => (
                                                        <>
                                                            <Row className='imageBanner'>
                                                                <Col lg={6} >

                                                                    <div className="bannerBgImageMain">
                                                                        <img src={TicketTemplateData?.ticketBannerImage} className="bannerBgImage" ></img>
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
                                                                                <Button icon='Cancel' isLight color='danger' onClick={() => { setFieldValue('ticketBannerImage', '') }}></Button>

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
                                        <FieldArray name='ticketList' >
                                            {({ push, remove }) => (
                                                <>
                                                    {
                                                        values?.ticketList != '' && (
                                                            values?.ticketList?.map((item, index) => (
                                                                <>
                                                                    <Row key={index} className='mt-5'>


                                                                        <Col lg={12}>
                                                                            <Row className='d-flex flex-row justify-content-evenly align-items-center'>
                                                                                <Col lg={4} className='d-flex flex-row justify-content-evenly align-items-center gap-2'>
                                                                                    <FormGroup className='locationSelect'>
                                                                                        <h5>Events</h5>
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
                                                                                        <p className='text-danger m-0'>{errors[`ticketList[${index}].eventId`]}</p>
                                                                                        {
                                                                                            values.ticketList[index].timeZonename && (
                                                                                            <small className='text-dark mb-0'>TimeZone : {values.ticketList[index].timeZonename}</small>
                                                                                            )
                                                                                        }
                                                                                    </FormGroup>
                                                                                    <FormGroup className='locationSelect mb-2'>
                                                                                        <h5>Tickets</h5>
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
                                                                                        <p className='text-danger m-0'>{errors[`ticketList[${index}].ticketId`]}</p>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col lg={8}>
                                                                                    <Row>
                                                                                        <h5 className='text-center'>Ticket Status</h5>
                                                                                    </Row>
                                                                                    <Row className='radioGroup d-flex flex-row justify-content-end align-items-center'>
                                                                                        <Col lg={3} className=' fs-5 eventRadio1'>
                                                                                            <Label className={values.ticketList[index].published === 'schedule' ? "eventRadio1" : "eventRadioBlue"}>
                                                                                                <Field
                                                                                                    type="radio"
                                                                                                    name={`ticketList.${index}.published`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value='schedule'

                                                                                                />
                                                                                                <Popovers title='Tips ?' trigger='hover' desc='Click to Schedule Date And Time to Publish an Ticket' >
                                                                                                    Schedule Date
                                                                                                </Popovers>
                                                                                            </Label>
                                                                                        </Col>
                                                                                        <Col lg={3} className=' fs-5 eventRadio2'>
                                                                                            <Label className={values.ticketList[index].published === 'now' ? "eventRadio2" : "eventRadioBlue"}>
                                                                                                <Field
                                                                                                    type="radio"
                                                                                                    name={`ticketList.${index}.published`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value='now'
                                                                                                />
                                                                                                <Popovers title='Tips ?' trigger='hover' desc='Click to Publish an Ticket now' >
                                                                                                    Publish Now
                                                                                                </Popovers>
                                                                                            </Label>
                                                                                        </Col>
                                                                                        <Col lg={3} className=' fs-5 eventRadio3'>
                                                                                            <Label className={values.ticketList[index].published === 'unpublish' ? "eventRadio3" : "eventRadioBlue"}>
                                                                                                <Field
                                                                                                    type="radio"
                                                                                                    name={`ticketList.${index}.published`}
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    value='unpublish'
                                                                                                />
                                                                                                <Popovers title='Tips ?' trigger='hover' desc='Click to Unpublish an Ticket to remove from website' >
                                                                                                    Unpublish
                                                                                                </Popovers>
                                                                                            </Label>
                                                                                        </Col>
                                                                                        <Col lg={2} className='d-flex align-items-center'>
                                                                                            <Button type="button" icon='Delete' color={'danger'} isLight
                                                                                                className='py-3 px-4'
                                                                                                onClick={() => {
                                                                                                    if (values.ticketList[index].published === 'unpublish') {
                                                                                                        remove(index)
                                                                                                        setFilteredEvents((prevFilteredEvents) =>
                                                                                                            prevFilteredEvents.filter((item, i) => i !== index)
                                                                                                        );
                                                                                                    } else {
                                                                                                        const errorMessage = 'Please unpublish Ticket to delete'
                                                                                                        Notification(errorMessage, errTitle, poscent, errIcon, BtnCanCel)
                                                                                                    }

                                                                                                }}
                                                                                            >
                                                                                                Delete
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                {
                                                                                    values?.ticketList[index]?.published == 'schedule' && (
                                                                                        <Col lg={12} >
                                                                                            <Row className='d-flex justify-content-center'>
                                                                                                <Col lg={2}>
                                                                                                    <Label>Schedule From Date & Time </Label>
                                                                                                    <Calendar
                                                                                                        name={`ticketList.${index}.scheduleDateAndTime`}
                                                                                                        placeholder='From Date & Time'
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        value={values.ticketList[index].scheduleDateAndTime}
                                                                                                        showTime
                                                                                                        hourFormat="24"
                                                                                                        minDate={today}
                                                                                                        maxDate={values.ticketList[index].scheduleMax}
                                                                                                    />
                                                                                                    <p className='text-danger'>{errors[`ticketList[${index}].scheduleDateAndTime`]}</p>
                                                                                                </Col>
                                                                                                <Col lg={2}>
                                                                                                    <Label>Schedule To Date & Time</Label>
                                                                                                    <Calendar
                                                                                                        name={`ticketList.${index}.scheduleToDateAndTime`}
                                                                                                        placeholder='To Date & Time'
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        value={values.ticketList[index].scheduleToDateAndTime}
                                                                                                        showTime
                                                                                                        hourFormat="24"
                                                                                                        minDate={today}
                                                                                                        maxDate={values.ticketList[index].scheduleMax}
                                                                                                    />
                                                                                                    <p className='text-danger'>{errors[`ticketList[${index}].scheduleToDateAndTime`]}</p>
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
                                                                                            onChange={(content) => {
                                                                                                HandleEditor(setFieldValue, index, content)
                                                                                                // setFieldValue(`ticketList.${index}.description`,content)
                                                                                            }}
                                                                                            onBlur={handleBlur}
                                                                                            name={`ticketList.${index}.description`}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>

                                                                    </Row>
                                                                    <hr />
                                                                    <div>
                                                                        {index === values.ticketList.length - 1 && index !== values.ticketList.length && (
                                                                            <Button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    push({
                                                                                        eventId: '',
                                                                                        ticketId: '',
                                                                                        published: 'unpublish',
                                                                                        scheduleDateAndTime:'',
                                                                                        scheduleToDateAndTime:'',
                                                                                        description: ''
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
                                                isLight
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

export default TicketPage
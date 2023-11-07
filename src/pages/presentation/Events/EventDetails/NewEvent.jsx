import React, { useState, useEffect, useRef } from 'react';
import { ErrorMessage, Field, FieldArray, Formik, useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../../components/bootstrap/Card';
import useDarkMode from '../../../../hooks/useDarkMode';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import Button from '../../../../components/bootstrap/Button';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { EventPageListTimeZone, addEvent, editEvent, editEventData, getCategoryNameList, getLocationNameList } from '../../../../redux/Slice';
import { useNavigate, useParams } from 'react-router-dom';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat,today } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'
import { Col, Container, Row } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';


const NewEvent = () => {

    const { CategoryNameList, LocationNameList, ListTimeZone, error, Loading,EditEventDatas, success, token } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const[initialValues,setInitialValues]=useState({
        eventName: '',
        eventCategoryId: '',
        eventLocationId: '',
        eventSchedule: [{
            eventDateAndTimeFrom: '',
            eventDateAndTimeTo: '',
        }],
        timeZone: '',
        description: '',
        eventImage: null,
        status: false
    })




    useEffect(() => {
        dispatch(getCategoryNameList(token))
        dispatch(getLocationNameList(token))
        dispatch(EventPageListTimeZone(token))
        if(id){
            dispatch(editEventData({ token, id }))
        }
    }, [token,id])


    const Notification = (val, tit, pos, ico, btn) => {
        Swal.fire({
            position: `${pos}`,
            title: `${tit}`,
            text: `${val}`,
            icon: `${ico}`,
            confirmButtonText: `${btn}`,

        })
        if (success) {
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


    useEffect(() => {

        

        if(id && EditEventDatas){

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date;
            };
    
            const EventScheduleData = EditEventDatas?.eventSchedule?.map((item) => {
                const fromTime = formatDate(item.eventDateAndTimeFrom);
                const toTime = formatDate(item.eventDateAndTimeTo);
                return {
                    eventDateAndTimeFrom: fromTime,
                    eventDateAndTimeTo: toTime
                };
            });



            setInitialValues((prevState) => 
            ({ ...prevState, 
            
            eventName: EditEventDatas?.eventName ,
            eventCategoryId:EditEventDatas?.eventCategoryId,
            eventLocationId: EditEventDatas?.eventLocationId,
            eventSchedule: EventScheduleData,
            timeZone: EditEventDatas?.timeZone,
            description: EditEventDatas?.description,
            eventImage: null,
            status: EditEventDatas?.status
            }))
        }

      }, [EditEventDatas]);



    const extractTimePart = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;
        const timePart = formattedDate?.slice(10, 16);
        return [ timePart, formattedDate?.split(' ')[0]];
    }
    const extractTimeSubmit = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }

   

    const validate = (values) => {

        const errors = {}

        console.log("values", values);

        if (!values.eventName) {
            errors.eventName = 'Required';
        } else if (values.eventName.length < 3) {
            errors.eventName = 'Must be 3 characters or more';
        } else if (values.eventName.length > 200) {
            errors.eventName = 'Must be 200 characters or less';
        }

        if (!values.eventCategoryId) {
            errors.eventCategoryId = 'Required';
        }
        if (!values.eventLocationId) {
            errors.eventLocationId = 'Required';
        }
        if (!values.description) {
            errors.description = 'Required';
        }
        if (values.description.length > 2000) {
            errors.description = 'Must be 2000 characters or less';
        }

        values?.eventSchedule?.forEach((value, index) => {
            if (!value.eventDateAndTimeFrom) {
                errors[`eventSchedule[${index}].eventDateAndTimeFrom`] = "Required";
            }
            if (!value.eventDateAndTimeTo) {
                errors[`eventSchedule[${index}].eventDateAndTimeTo`] = "Required";
            }
            
            if (value.eventDateAndTimeFrom && value.eventDateAndTimeTo) {
                const extractedTimeFrom = extractTimePart(value.eventDateAndTimeFrom);
                const extractedTimeTo = extractTimePart(value.eventDateAndTimeTo);


                if (extractedTimeTo[1] === extractedTimeFrom[1] && extractedTimeTo[0] < extractedTimeFrom[0]) {
                    errors[`eventSchedule[${index}].eventDateAndTimeTo`] = 'Event End Time must be greater than Event From Time';
                }
            }
            
        })

        if (!values.timeZone) {
            errors.timeZone = 'Required';
        }
        if (values.eventImage?.size > 1000000) {
            errors.eventImage = 'Image must be less than 1MB';
        }


        return errors;
    }

    const OnSubmit = (values) => {

        const formData = new FormData();

        console.log("values",values);

        for (let value in values) {
            if (value != 'eventSchedule') {
                formData.append(value, values[value]);
            }
        }

        values?.eventSchedule?.forEach((val, index) => {
            const extractedTimeFrom = extractTimeSubmit(val.eventDateAndTimeFrom);
            const extractedTimeTo = extractTimeSubmit(val.eventDateAndTimeTo);
            formData.append(`eventSchedule[${index}][eventDateAndTimeFrom]`, extractedTimeFrom);
            formData.append(`eventSchedule[${index}][eventDateAndTimeTo]`, extractedTimeTo);
        })

        if(id){
            dispatch(editEvent({ formData, id, token }))
        }else{
            dispatch(addEvent({ formData, token }))
        }

        setIsLoading(true);
        
    }



    return (
        <PageWrapper>
            <Page>

                <Card>
                    <CardHeader>
                        <CardLabel icon='Add' iconColor='success'>
                            <CardTitle>
                                { id ? 'Edit Event' : 'New Event'
                                }                           
                             </CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <Formik initialValues={initialValues} validate={validate} onSubmit={values => { OnSubmit(values) }} enableReinitialize={true}>
                            {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors, setFieldValue }) => (
                                <form onSubmit={handleSubmit}>
                                    <Container>
                                        <Row>
                                            <Col lg={6}>
                                                <Row>
                                                    <Col lg={10}>
                                                        <Label className='fs-5'>Event Name</Label>
                                                        <Field
                                                            type='text'
                                                            name='eventName'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.eventName}
                                                            className='form-control'
                                                        />
                                                        <ErrorMessage name='eventName' component="div" className="error" />
                                                    </Col>
                                                    <Col lg={6} >
                                                        <Label className='fs-5'>Event Category</Label>
                                                        <div className='locationSelect'>
                                                            <Field
                                                                as="select"
                                                                name='eventCategoryId'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.eventCategoryId}
                                                            >
                                                                <Option value=''>Select Event Category</Option>
                                                                {
                                                                    CategoryNameList.map((item, index) => (
                                                                        <>
                                                                            <Option key={index} value={item?._id}>{item?.eventCategoryName}</Option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </Field>
                                                            <ErrorMessage name='eventCategoryId' component="div" className="error" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6} >
                                                        <Label className='fs-5'>Event Location</Label>
                                                        <div className='locationSelect'>
                                                            <Field
                                                                as="select"
                                                                name='eventLocationId'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.eventLocationId}
                                                            >
                                                                <Option value=''>Select Event Location</Option>
                                                                {
                                                                    LocationNameList.map((item, index) => (
                                                                        <>
                                                                            <Option key={index} value={item?._id}>{item?.eventLocationName}</Option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </Field>
                                                            <ErrorMessage name='eventLocationId' component="div" className="error" />
                                                        </div>
                                                    </Col>
                                                    {/* <Col lg={10}>
                                                        
                                                    </Col> */}
                                                    <Col lg={10}>
                                                        <Label className='fs-5'>Event Time Zone</Label>
                                                        <div className='locationSelect'>
                                                            <Field
                                                                as="select"
                                                                name='timeZone'
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.timeZone}
                                                            >
                                                                <Option value=''>Select Event Time Zone</Option>
                                                                {
                                                                    ListTimeZone.map((item, index) => (
                                                                        <>
                                                                            <Option key={index} value={item?._id}>{item?.timeZone}</Option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </Field>
                                                            <ErrorMessage name='timeZone' component="div" className="error" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={10}>
                                                        <Label className='fs-5 my-3'>Event Schedule</Label>

                                                        <FieldArray name='eventSchedule'>
                                                            {({ push, remove }) => (
                                                                <>
                                                                    {
                                                                        values?.eventSchedule?.map((_, index) => (
                                                                            <Row className='my-2' key={index}>
                                                                                 <Label className='fs-5 bold mt-3 mb-3'>{index + 1}. {" "}Event Date & Time</Label>
                                                                                <Col lg={5}>
                                                                                    <div>
                                                                                    
                                                                                        <Calendar
                                                                                            id='eventDateAndTimeFrom'
                                                                                            name={`eventSchedule.${index}.eventDateAndTimeFrom`}
                                                                                            placeholder='Enter From Date & Time'
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value={values.eventSchedule[index].eventDateAndTimeFrom}
                                                                                            showTime
                                                                                            hourFormat="24"
                                                                                            minDate={today}
                                                                                        />
                                                                                    </div>
                                                                                    <p className='text-danger'>{errors[`eventSchedule[${index}].eventDateAndTimeFrom`]}</p>
                                                                                </Col>
                                                                                <Col lg={5}>
                                                                                    <Calendar
                                                                                        id='eventDateAndTimeTo'
                                                                                        name={`eventSchedule.${index}.eventDateAndTimeTo`}
                                                                                        placeholder='Enter To Date & Time'
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        value={values.eventSchedule[index].eventDateAndTimeTo}
                                                                                        showTime
                                                                                        hourFormat="24"
                                                                                        minDate={today}
                                                                                    />
                                                                                    <p className='text-danger'>{errors[`eventSchedule[${index}].eventDateAndTimeTo`]}</p>
                                                                                </Col>
                                                                                <Col lg={2}>
                                                                                    {index !== 0 && (
                                                                                        <Button type="button" color={'danger'} isLight onClick={() => remove(index)}>
                                                                                            Delete
                                                                                        </Button>
                                                                                    )}
                                                                                </Col>

                                                                            </Row>
                                                                        ))
                                                                    }
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => push({
                                                                            eventDateAndTimeFrom: '',
                                                                            eventDateAndTimeTo: '',
                                                                        })}
                                                                        color={'warning'}
                                                                        className='mt-4 px-4 py-2 fs-5'
                                                                        icon={'Add'}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </>
                                                            )}

                                                        </FieldArray>

                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6}>
                                                <Row>

                                                    <Col lg={8}>
                                                        <Label className='fs-5'>Event Description</Label>
                                                        <Textarea
                                                            type='text'
                                                            name='description'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.description}
                                                            className='form-control'
                                                        />
                                                        <ErrorMessage name='description' component="div" className="error" />
                                                    </Col>
                                                    <Col lg={8}>
                                                        <Label className='fs-5'>Event Image</Label>
                                                        <Input
                                                            type='file'
                                                            id='eventImage'
                                                            name='eventImage'
                                                            onChange={(e) => {
                                                                setFieldValue('eventImage', e.target.files[0])
                                                            }}
                                                            className='form-control'
                                                        />
                                                        <ErrorMessage name='eventImage' component="div" className="error" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <div className='d-flex justify-content-end'>
                                            <Button
                                                className='w-20 py-3 px-3 my-3'
                                                icon={isLoading ? undefined : 'Save'}
                                                isLight
                                                color={isLoading ? 'success' : 'info'}
                                                isDisable={isLoading}
                                                onClick={handleSubmit}>
                                                {isLoading && <Spinner isSmall inButton />}
                                                Save & Close
                                            </Button>
                                            <Button
                                                className='w-20 py-3 px-3 my-3 mx-2'
                                                color={'danger'}
                                                isLight
                                                shadow='default'
                                                hoverShadow='none'
                                                icon='Cancel'
                                                onClick={() => {

                                                    navigate(-1)
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Container>
                                </form>
                            )}
                        </Formik>
                    </CardBody>

                </Card>
            </Page>
        </PageWrapper>
    )
}

export default NewEvent


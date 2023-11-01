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
import { EventPageListTimeZone, getCategoryNameList, getLocationNameList } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'
import { Col, Container, Row } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";   

const NewEvent = () => {
    const { themeStatus } = useDarkMode();
    const { CategoryNameList, LocationNameList, ListTimeZone, error, Loading, success, token } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getCategoryNameList(token))
        dispatch(getLocationNameList(token))
        dispatch(EventPageListTimeZone(token))
    }, [token])


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


    const handleChangeFile = (e,setFieldValue) => {
        const file = e.target.files[0]
        console.log(file);
        setFieldValue('eventImage', file)
    }


    const disablePastDates = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }
        return `${yyyy}-${mm}-${dd}`;
    };


    const extractTimePart = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;
        const timePart = formattedDate.slice(10, 16);
        return timePart;
    }
    const extractTimeSubmit = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${(eventTime.getMonth() + 1).toString().padStart(2, '0')}/${eventTime.getDate().toString().padStart(2, '0')}/${eventTime.getFullYear()} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }

    const initialValues = {
        eventName: '',
        eventCategoryId: '',
        eventLocationId: '',
        eventSchedule: [{
            eventFrom: '',
            eventTo: '',
        }],
        timeZone: '',
        description: '',
        eventImage: null,
        status: false
    }

    const validate = (values) => {

        const errors = {}

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

        values?.eventSchedule?.forEach((value,index)=>{
            if(!value.eventFrom){
                errors[`eventSchedule[${index}].eventFrom`] = "Required";
            }
            if(!value.eventTo){
                errors[`eventSchedule[${index}].eventTo`] = "Required";
            }
            if (value.eventFrom && value.eventTo) {

            const extractedTimeFrom = extractTimePart(value.eventFrom);
            const extractedTimeTo = extractTimePart(value.eventTo);

            if (extractedTimeTo < extractedTimeFrom) {
                errors[`eventSchedule[${index}].eventTo`] = 'Event Time To must be greater than Event Time From';
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

        console.log("values", values);

        if (values?.eventSchedule) {
            values?.eventSchedule?.forEach((value,index)=>{
                const extractedTimeFrom = extractTimeSubmit(value.eventFrom);
                const extractedTimeTo = extractTimeSubmit(value.eventTo);
                values.eventSchedule[index].eventFrom = extractedTimeFrom
                values.eventSchedule[index].eventTo = extractedTimeTo
            })
        }
       
        console.log("values111", values);
    }



    return (
        <PageWrapper>
            <Page>

                <Card>
                    <CardHeader>
                        <CardLabel icon='Add' iconColor='success'>
                            <CardTitle>Add New Event Details</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <Formik initialValues={initialValues} validate={validate} onSubmit={values => { OnSubmit(values) }}>
                            {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
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
                                                    <Col lg={10}>
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
                                                    <Label className='fs-5'>Event Schedule</Label>

                                                        <FieldArray name='eventSchedule'>
                                                            {({ push, remove }) => (
                                                                <>
                                                                    {
                                                                        values.eventSchedule.map((_, index) => (
                                                                            <Row className='my-2' key={index}>
                                                                                <Col lg={5}>
                                                                                    <div>
                                                                                    <Calendar
                                                                                    id='eventTimeFrom'
                                                                                    name={`eventSchedule.${index}.eventFrom`}
                                                                                    placeholder='Enter Event From Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventSchedule[index].eventFrom}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                    
                                                                                />
                                                                                    </div>
                                                                                
                                                                                <p className='text-danger'>{errors[`eventSchedule[${index}].eventFrom`]}</p>
                                                                                </Col>
                                                                                <Col lg={5}>
                                                                                <Calendar
                                                                                    id='eventTo'
                                                                                    name={`eventSchedule.${index}.eventTo`}
                                                                                    placeholder='Enter Event To Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventSchedule[index].eventTo}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                />
                                                                                 <p className='text-danger'>{errors[`eventSchedule[${index}].eventTo`]}</p>
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
                                                                            eventFrom: '',
                                                                            eventTo: '',
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
                                            <Label className='fs-5'>Event Image</Label>
                                                        <Field
                                                            type='file'
                                                            name='eventImage'
                                                            onChange={(e)=>{handleChangeFile(setFieldValue,e)}}
                                                            value={values.eventImage}
                                                            className='form-control'
                                                        />
                                                        <ErrorMessage name='eventImage' component="div" className="error" />
                                            </Col>
                                        </Row>
                                        <div>
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


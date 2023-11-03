import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../../../components/bootstrap/Card'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Input from '../../../../../components/bootstrap/forms/Input'
import Button from '../../../../../components/bootstrap/Button'
import Label from '../../../../../components/bootstrap/forms/Label'
import Select from '../../../../../components/bootstrap/forms/Select'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Checks from '../../../../../components/bootstrap/forms/Checks'
import Textarea from '../../../../../components/bootstrap/forms/Textarea'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { useFormik } from 'formik'
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import classNames from 'classnames'
import { EditTicketRedemption, EventPageListTimeZone, addTicketRedemption } from '../../../../../redux/Slice'
import { errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import Icon from '../../../../../components/icon/Icon'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar } from 'primereact/calendar';


const Redemption = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { error, Loading, success, token, ListTimeZone, TicketRedemptionData } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const TicketId = queryParams.get('i');

    const handleSave = () => {
        setIsLoading(false);

        if (success == "TicketRedemption created successfully") {
            const params = new URLSearchParams();
            params.append('i', TicketId);
            params.append('p', 'FeesStructure');
            params.append('t', 'create');
            navigate(`?${params.toString()}`);
        }
    };

    useEffect(() => {
        error && handleSave()
        success && handleSave()
        if (Loading) {
            setIsLoading(true)
        }
        else {
            setIsLoading(false)
        }
    }, [error, success, Loading]);





    const [initialValues, setInitialValues] = React.useState({
        redemption: [
            {
                redemDateAndTimeFrom: "",
                redemDateAndTimeTo: "",
            }
        ],
        status: false
    })

    useEffect(() => {
        dispatch(EventPageListTimeZone(token))
    }, [token])

    const extractTimePart = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;
        const timePart = formattedDate.slice(10, 16);
        return timePart;
    }
    const extractTimeSubmit = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }

    // useEffect(() => {
       
    //     setInitialValues((prevState) => ({ ...prevState,status: false }))

    // }, [TicketRedemptionData]);



    const validate = (values) => {

        const errors = {}

        values?.redemption?.forEach((value, index) => {
            if (!value.redemDateAndTimeFrom) {
                errors[`redemption[${index}].redemDateAndTimeFrom`] = "Required";
            }
            if (!value.redemDateAndTimeTo) {
                errors[`redemption[${index}].redemDateAndTimeTo`] = "Required";
            }
            if (value.redemDateAndTimeFrom && value.redemDateAndTimeTo) {

                const extractedTimeFrom = extractTimePart(value.redemDateAndTimeFrom);
                const extractedTimeTo = extractTimePart(value.redemDateAndTimeTo);

                if (extractedTimeTo < extractedTimeFrom) {
                    errors[`redemption[${index}].redemDateAndTimeTo`] = 'Redemption End Time must be greater than Redemption From Time ';
                }
            }
        })


        return errors;
    }





    const OnSubmit = (values) => {


        values?.redemption?.forEach((val, index) => {
            values.redemption[index].redemDateAndTimeFrom = extractTimeSubmit(val?.redemDateAndTimeFrom);
            values.redemption[index].redemDateAndTimeTo = extractTimeSubmit(val?.redemDateAndTimeTo);

        })
        values.ticketId = TicketId
        console.log("values", values);
        dispatch(addTicketRedemption({ values, token }))
        setIsLoading(true);

    }



    return (
        <Card>
            <CardHeader>
                <CardLabel icon='Timelapse' iconColor='warning'>
                    <CardTitle>Ticket Redemption</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <Formik initialValues={initialValues} validate={validate} onSubmit={values => { OnSubmit(values) }} enableReinitialize={true}>
                        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <FieldArray name="redemption">
                                                {({ push, remove }) => (
                                                    <div>
                                                        {values?.redemption?.map((_, index) => (
                                                            <>
                                                                <div key={index} className='row'>
                                                                    <Label className='fs-5 bold mt-3 mb-3'>{index + 1}. {" "}Redemption Date & Time</Label>
                                                                    <div className='col-lg-12  d-flex justify-content-center text-center mt-4'>
                                                                        <div className='row'>
                                                                            <div className="col-lg-6 d-flex flex-column">
                                                                                <Label>Redeem From Date & Time</Label>
                                                                                <Calendar
                                                                                    name={`redemption.${index}.redemDateAndTimeFrom`}
                                                                                    placeholder='Enter Redemption From Date & Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].redemDateAndTimeFrom}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                />
                                                                                {/* <ErrorMessage name={`redemption.${index}.FromDate`} component="div" className="error" /> */}
                                                                                <p className='text-danger'>{errors[`redemption[${index}].redemDateAndTimeFrom`]}</p>
                                                                            </div>
                                                                            <div className="col-lg-6 d-flex flex-column">
                                                                            <Label>Redeem To Date & Time</Label>
                                                                                <Calendar
                                                                                    name={`redemption.${index}.redemDateAndTimeTo`}
                                                                                    placeholder='Enter Redemption To Date & Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].redemDateAndTimeTo}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                />
                                                                               <p className='text-danger'>{errors[`redemption[${index}].redemDateAndTimeTo`]}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {index !== 0 && (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Button type="button" color={'danger'} isLight onClick={() => remove(index)}>
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {index === values.redemption.length - 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => push({
                                                                            redemDateAndTimeFrom: "",
                                                                            redemDateAndTimeTo: "",
                                                                        })}
                                                                        color={'warning'}
                                                                        className='mt-4 px-4 py-2 fs-5'
                                                                        icon={'Add'}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </>
                                                        ))}
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-4">
                                    <strong className='fw-blod fs-5 text-danger'><u>Redemption Limit Rules</u></strong>
                                    <div className='w-50 mt-4'>
                                        <FormGroup label='Scan Limit' name='ticketScanLimit' className='fw-blod fs-5 locationSelect '>
                                            <Select
                                                placeholder='--Select Your Limits--'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name='ticketScanLimit'
                                                value={values.ticketScanLimit}
                                                // isValid={values.ticketScanLimit}
                                                // isTouched={values.ticketScanLimit}
                                                // invalidFeedback={values.ticketScanLimit}
                                                validFeedback='Looks good!'
                                                ariaLabel='label'
                                            >
                                                <Option value='1'>01</Option>
                                                <Option value='2'>02</Option>
                                                <Option value='3'>03</Option>
                                            </Select>
                                            <ErrorMessage name='ticketScanLimit' component="div" className="error" />
                                        </FormGroup>
                                    </div>
                                    <p className='text-danger'>*Only 03 scan limit allowed</p>
                                </div> */}
                                </div>
                                <div className='mt-4 text-end'>
                                    <Button
                                        type="submit"
                                        size='lg'
                                        className='w-20 '
                                        icon={isLoading ? undefined : 'Save'}
                                        isLight
                                        color={isLoading ? 'success' : 'info'}
                                    // isDisable={isLoading}
                                    // disabled={!isValid || Object.keys(touched).length === 0}
                                    >
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
                            </form>
                        )}

                    </Formik>
                </div>
            </CardBody>
        </Card>
    )
}

export default Redemption


{/* <div className="col-lg-4">
                        <strong className='fw-blod fs-5 text-danger'><u>Redemption Limit Rules</u></strong>
                        <div className='w-50 mt-4'>
                            <FormGroup label='Scan Limit' className='fw-blod fs-5 locationSelect '>
                                <Select
                                    placeholder='--Select Your Limits--'
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    // value={formik.values.eventCategoryId}
                                    // isValid={formik.isValid}
                                    // isTouched={formik.touched.eventCategoryId}
                                    // invalidFeedback={formik.errors.eventCategoryId}
                                    validFeedback='Looks good!'
                                    ariaLabel='label'
                                >
                                    <Option value='01'>01</Option>
                                    <Option value='02'>02</Option>
                                    <Option value='03'>03</Option>
                                </Select>
                            </FormGroup>
                        </div>
                        <p className='text-danger'>*Only 03 scan limit allowed</p>

                    </div> */}

{/* <div className='mt-4 text-end'>
                        <Button
                            size='lg'
                            className='w-20 '
                            icon={isLoading ? undefined : 'Save'}
                            isLight
                            color={isLoading ? 'success' : 'info'}
                            isDisable={isLoading}
                        
                        >
                            {isLoading && <Spinner isSmall inButton />}
                            Save
                        </Button>
                    </div> */}
{/* <div className="col-lg-8">
<div className='d-flex justify-content-between  flex-column g-2 mt-4'>
    <Label>Redeem Date</Label>
    <div className='d-flex justify-content-between mt-2'>
        <FormGroup id='eventDateFrom' label='From' >
            <Input
                type='date'
                placeholder='Enter Event Title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={item.redemFromDate}
                isValid={formik.isValid}
                isTouched={item.redemFromDate}
                invalidFeedback={item.redemFromDate}
                validFeedback='Looks good!'
            />
        </FormGroup>
        <FormGroup id='eventDateTo' label='To' >
            <Input
                type='date'
                placeholder='Enter Event Title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={item.redemToDate}
                isValid={formik.isValid}
                isTouched={item.redemToDate}
                invalidFeedback={item.redemToDate}
                validFeedback='Looks good!'
            />
        </FormGroup>
    </div>
</div>
</div>
<div className="col-lg-8 mt-4">
<div className='d-flex justify-content-between flex-column g-2 mt-4'>
    <Label>Redeem Time</Label>
    <div className='d-flex justify-content-between mt-2'>
        <FormGroup id='eventTimeFrom' label='From' >
            <Input
                type='time'
                placeholder='Enter Event Title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventTimeFrom}
                isValid={formik.isValid}
                isTouched={formik.touched.eventTimeFrom}
                invalidFeedback={formik.errors.eventTimeFrom}
                validFeedback='Looks good!'
            />
        </FormGroup>
        <FormGroup id='eventTimeTo' label='To' >
            <Input
                type='time'
                placeholder='Enter Event Title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventTimeTo}
                isValid={formik.isValid}
                isTouched={formik.touched.eventTimeTo}
                invalidFeedback={formik.errors.eventTimeTo}
                validFeedback='Looks good!'
            />
        </FormGroup>
    </div>
</div>
</div>
<div className='text-start'>
<Button
color={'warning'}
className='mt-4 px-4 py-2 fs-5'
isDark
icon={'Add'}
onClick={handleAdd}
>
Add Date
</Button>
</div> */}

{/* <Button 
          type="submit" 
          disabled={!isValid || Object.keys(touched).length === 0}
          size='lg'
          className='w-20 '
          icon={isLoading ? undefined : 'Save'}
          isLight
          color={isLoading ? 'success' : 'info'}
          isDisable={isLoading}
          >
          {isLoading && <Spinner isSmall inButton />}
          Save
          </Button> */}
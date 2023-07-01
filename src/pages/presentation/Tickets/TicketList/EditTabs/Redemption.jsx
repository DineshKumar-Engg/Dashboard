import React, { useEffect, useState } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
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
import { EditTicketRedemption, addTicketRedemption } from '../../../../../redux/Slice'
import {  errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import Icon from '../../../../../components/icon/Icon'
import { useNavigate, useParams } from 'react-router-dom'

const Redemption = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {  error, Loading, success,token,TicketId,TicketRedemptionData} = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {id}=useParams()

    const handleSave = () => {
        setIsLoading(false);
  
        if (success == "TicketRedemption updated successfully") {
            navigate('../ticketPages/ticketLists')
         }
         dispatch(errorMessage({ errors: '' }))
         dispatch(successMessage({ successess: '' }))
         dispatch(loadingStatus({ loadingStatus: false }))
    };

    useEffect(() => {
        error && handleSave()
        success && handleSave()
        if(Loading)
        {
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
    }, [error, success, Loading]);



    const disableDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate()-1;
    
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }
    
        return `${yyyy}-${mm}-${dd}`;
    };


    useEffect(()=>{     
       
    },[])


    const initialValues = {
        redemption: [
            {
                FromDate: "",
                ToDate: "",
                FromTime: "",
                ToTime: ""
            }
        ],
        ticketScanLimit:'',
        status: false
    };

    const validationSchema = Yup.object({
            redemption: Yup.array().of(
                Yup.object().shape({
                    FromDate: Yup.date().required("From Date is required"),
                    ToDate: Yup.date().required("To Date is required"),
                    FromTime: Yup.string().required("From Time is required"),
                    ToTime: Yup.string().required("To Time is required")
                })
            ),
            ticketScanLimit:Yup.number().required('Scan limit is required')
    });

    const OnSubmit = (values)=>{

        console.log(values);
        for (let i=0 ; i < values?.redemption?.length;i++) {
            let fromTimeHours = parseInt(values?.redemption[i].FromTime.split(':')[0], 10);
            const fromTimeMinutes = values?.redemption[i].FromTime.split(':')[1];
            let fromTimePeriod = '';
        
            if (fromTimeHours < 12) {
              fromTimePeriod = 'AM';
            } else {
              fromTimePeriod = 'PM';
              if (fromTimeHours > 12) {
                fromTimeHours -= 12;
              }
            }
        
            let toTimeHours = parseInt(values?.redemption[i].ToTime.split(':')[0], 10);
            const toTimeMinutes = values?.redemption[i].ToTime.split(':')[1];
            let toTimePeriod = '';
        
            if (toTimeHours < 12) {
              toTimePeriod = 'AM';
            } else {
              toTimePeriod = 'PM';
              if (toTimeHours > 12) {
                toTimeHours -= 12;
              }
            }
        
            const convertedFrom = `${fromTimeHours}:${fromTimeMinutes} ${fromTimePeriod}`;
            const convertedTo = `${toTimeHours}:${toTimeMinutes} ${toTimePeriod}`;
            
        
            values.redemption[i].redemDateAndTimeFrom = values.redemption[i].FromDate.concat(" ",convertedFrom) 
            values.redemption[i].redemDateAndTimeTo = values.redemption[i].ToDate.concat(" ",convertedTo)  


            const removeField = ({ FromTime,ToTime,FromDate,ToDate, ...rest }) => rest;
            values.redemption[i] = removeField(values.redemption[i]);

        }

        console.log(values,token);
        dispatch(EditTicketRedemption({values,token,id}))
        setIsLoading(true);
    }

    

    return (
        <Card>
            <CardBody>
                <div className="row">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => {OnSubmit(values)}}>
                        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched ,errors}) => (
                            <form onSubmit={handleSubmit}>
                               <div className="row">
                               <div className="col-lg-6">
                                    <strong className='fw-blod fs-5 text-danger'><u>Scannable Date & Time</u></strong>
                                    <div>
                                        <FieldArray name="redemption">
                                            {({ push, remove }) => (
                                                <div>
                                                    {values.redemption.map((_, index) => (
                                                        <div key={index}>
                                                            <Label className='fs-5 bold mt-3 mb-3'>{index + 1}. {" "}Redemption Date & Time</Label>

                                                            <div className='d-flex justify-content-between  flex-column g-2 mt-4'>
                                                                <Label>Redeem Date</Label>
                                                                <div className='d-flex justify-content-around mt-2'>
                                                                    <FormGroup id='eventDateFrom' label='From' >
                                                                        <Field
                                                                            type='date'
                                                                            name={`redemption.${index}.FromDate`}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.redemption[index].FromDate}
                                                                            className='form-control'
                                                                            min={disableDates()}
                                                                        />
                                                                        <ErrorMessage name={`redemption.${index}.FromDate`} component="div" className="error" />
                                                                    </FormGroup>
                                                                    <FormGroup id='eventDateTo' label='To' >
                                                                        <Field
                                                                            type="date"
                                                                            name={`redemption.${index}.ToDate`}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.redemption[index].ToDate}
                                                                            className='form-control'
                                                                            min={disableDates()}
                                                                        />
                                                                        <ErrorMessage name={`redemption.${index}.ToDate`} component="div" className="error" />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>

                                                            <div className='d-flex justify-content-between flex-column g-2 mt-4'>
                                                                <Label>Redeem Time</Label>
                                                                <div className='d-flex justify-content-around mt-2'>
                                                                    <FormGroup id='eventTimeFrom' label='From' >
                                                                        <Field
                                                                            type="time"
                                                                            name={`redemption.${index}.FromTime`}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.redemption[index].FromTime}
                                                                            className='form-control'
                                                                        />
                                                                        <ErrorMessage name={`redemption.${index}.FromTime`} component="div" className="error" />
                                                                    </FormGroup>
                                                                    <FormGroup id='eventTimeTo' label='To' >
                                                                        <Field
                                                                            type="time"
                                                                            name={`redemption.${index}.ToTime`}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.redemption[index].ToTime}
                                                                            className='form-control'
                                                                        />
                                                                        <ErrorMessage name={`redemption.${index}.ToTime`} component="div" className="error" />
                                                                    </FormGroup>
                                                                </div>

                                                            </div>
                                                            {index !== 0 && (
                                                                <div className='d-flex justify-content-end'>
                                                                    <Button type="button" color={'danger'} isLight onClick={() => remove(index)}>
                                                                    Delete
                                                                </Button>
                                                                </div>
                                                            )}
                                                            {index === values.redemption.length - 1 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => push({ FromDate: "", ToDate: "", FromTime: "", ToTime: "" })}
                                                                    color={'warning'}
                                                                    className='mt-4 px-4 py-2 fs-5'
                                                                    icon={'Add'}
                                                                >
                                                                    Add
                                                                </Button>
                                                            )}
                                                           
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </FieldArray>



                                    </div>


                                </div>
                                <div className="col-lg-4">
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

                                </div>
                               </div>
                               <div className='mt-4 text-end'>
                        <Button
                           type="submit" 
                            size='lg'
                            className='w-20 '
                            icon={isLoading ? undefined : 'Save'}
                            isDark
                            color={isLoading ? 'success' : 'info'}
                            // isDisable={isLoading}
                            // disabled={!isValid || Object.keys(touched).length === 0}
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
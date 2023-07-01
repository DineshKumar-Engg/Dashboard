import React, { useState,useEffect } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Input from '../../../../../components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import { DateRangePicker } from 'react-date-range'
import Popovers from '../../../../../components/bootstrap/Popovers'
import dayjs from 'dayjs'
import Button from '../../../../../components/bootstrap/Button'
import Label from '../../../../../components/bootstrap/forms/Label'
import classNames from 'classnames'
import useDarkMode from '../../../../../hooks/useDarkMode';
import Icon from '../../../../../components/icon/Icon'
import Select from '../../../../../components/bootstrap/forms/Select'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Checks from '../../../../../components/bootstrap/forms/Checks'
import Textarea from '../../../../../components/bootstrap/forms/Textarea'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { EditTicketGeneral, GetTicketGeneralData, addTicketGeneral, errorMessage, getTicketCategoryList, loadingStatus, successMessage } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import { useNavigate, useParams } from 'react-router-dom'

const General = () => {
    const { TicketCategoryList, error, Loading, success,token,TicketId,TicketGeneralData } = useSelector((state) => state.festiv)

	const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()    
    const { darkModeStatus } = useDarkMode();


    const handleSave = () => {
        setIsLoading(false);
        if(success == "Ticket updated successfully"){
            navigate('../ticketPages/ticketLists')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))
    };
    const {id}=useParams()

    useEffect(() => {
        error && handleSave()
        success && handleSave(success)
        if(Loading)
        {
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
    }, [error, success, Loading]);
    const currentPage=1
    const perPage = 30
    useEffect(() => {
        dispatch(getTicketCategoryList({token,currentPage,perPage}))
    }, [token,currentPage,perPage])


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


    useEffect(() => {
        formik.setValues({
            ticketName: TicketGeneralData?.ticketName || '',
            ticketChannel: TicketGeneralData?.ticketChannel || '',
            ticketDateFrom: TicketGeneralData?.sellableDateAndTimeFrom?.split(' ')[0] || '',
            ticketDateTo: TicketGeneralData?.sellableDateAndTimeTo?.split(' ')[0] || '',
            ticketTimeFrom: TicketGeneralData?.sellableDateAndTimeFrom?.split(' ')[1] || '',
            ticketTimeTo:TicketGeneralData?.sellableDateAndTimeTo?.split(' ')[1] || '',
            ticketCategoryId: TicketGeneralData?.ticketCategoryId || '',
            ticketType:TicketGeneralData?.ticketType ||  '',
            description: TicketGeneralData?.description || '',
            totalTicketQuantity: TicketGeneralData?.totalTicketQuantity || '',
            purchaseLimit:TicketGeneralData?.purchaseLimit || '',
            status: TicketGeneralData?.status || false
        });
      }, [TicketGeneralData]);






    const formik = useFormik({
        initialValues: {
            ticketName: '',
            ticketChannel: 'online',
            ticketDateFrom:'',
            ticketDateTo:'',
            ticketTimeFrom:'',
            ticketTimeTo:'',
            ticketCategoryId:'',
            ticketType:'unlimited',
            description:'',
            totalTicketQuantity:'',
            purchaseLimit:'',
            ticketScanLimit:'',
            status: false,
        },
        validate: (values) => {

            const errors = {}

            if (!values.ticketName) {
                errors.ticketName = 'Required';
            } else if (values.ticketName.length < 3) {
                errors.ticketName = 'Must be 3 characters or more';
            } else if (values.ticketName.length > 30) {
                errors.ticketName = 'Must be 30 characters or less';
            }

            if (!values.ticketDateFrom) {
                errors.ticketDateFrom = 'Required';
            }
            if (!values.ticketDateTo) {
                errors.ticketDateTo = 'Required';
            }   

            if (!values.ticketTimeFrom) {
                errors.ticketTimeFrom = 'Required';
            }
            if (!values.ticketTimeTo) {
                errors.ticketTimeTo = 'Required';
            }   
            if (!values.ticketCategoryId) {
                errors.ticketCategoryId = 'Required';
            } 
            if (!values.ticketType) {
                errors.ticketType = 'Required';
            } 
            if (!values.ticketScanLimit) {
                errors.ticketScanLimit = 'Required';
            } 


            if (!values.totalTicketQuantity) {
                errors.totalTicketQuantity = 'Required';
            }
            if (!values.purchaseLimit) {
                errors.purchaseLimit = 'Required';
            } else if (values.purchaseLimit > 8) {
                errors.purchaseLimit = 'Must be less than 8 quantity';
            }



            if (!values.description) {
                errors.description = 'Required';
            } else if (values.description.length < 40) {
                errors.description = 'Must be 40 characters or more';
            }
            else if (values.description.length > 160) {
                errors.description = 'Must be 160 characters or less';
            }

            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {

            let fromTimeHours = parseInt(formik.values.ticketTimeFrom.split(':')[0], 10);
            const fromTimeMinutes = formik.values.ticketTimeFrom.split(':')[1];
            let fromTimePeriod = '';
        
            if (fromTimeHours < 12) {
              fromTimePeriod = 'AM';
            } else {
              fromTimePeriod = 'PM';
              if (fromTimeHours > 12) {
                fromTimeHours -= 12;
              }
            }
        
            let toTimeHours = parseInt(formik.values.ticketTimeTo.split(':')[0], 10);
            const toTimeMinutes = formik.values.ticketTimeTo.split(':')[1];
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

            formik.values.ticketTimeFrom = convertedFrom
            formik.values.ticketTimeTo = convertedTo

            formik.values.sellableDateAndTimeFrom = formik.values.ticketDateFrom.concat(" ",convertedFrom)
            formik.values.sellableDateAndTimeTo =formik.values.ticketDateTo.concat(" ",convertedTo)


            formik.values.ticketDateFrom=''
            formik.values.ticketDateTo=''
            formik.values.ticketTimeFrom=''
            formik.values.ticketTimeTo=''

            const removeField = ({ ticketDateFrom,ticketDateTo,ticketTimeFrom,ticketTimeTo, ...rest }) => rest;
            const value = removeField(values);
            

            console.log("submit",value);
            dispatch(EditTicketGeneral({value,token,id}))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },
    });

    return (
        <Card>
            <CardBody>
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <FormGroup id='ticketName' className='fw-blod fs-5 text-dark' label='Ticket Name'>
                        <Input
                            placeholder='Ticket Name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ticketName}
                            isValid={formik.isValid}
                            isTouched={formik.touched.ticketName}
                            invalidFeedback={formik.errors.ticketName}
                            validFeedback='Looks good!'
                        />
                    </FormGroup>
                    <div className='d-block my-2'>
                        <Label className='fw-blod fs-5'>Sellable Date</Label>
                        <div className='d-flex justify-content-between g-2'>
                            <FormGroup id='ticketDateFrom' label='From' className=' mx-1' >
                                <Input
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketDateFrom}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketDateFrom}
                                    invalidFeedback={formik.errors.ticketDateFrom}
                                    validFeedback='Looks good!'
                                    min={disableDates()}
                                />
                            </FormGroup>
                            <FormGroup id='ticketDateTo' label='To' className=' mx-1' >
                                <Input
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketDateTo}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketDateTo}
                                    invalidFeedback={formik.errors.ticketDateTo}
                                    validFeedback='Looks good!'
                                    min={disableDates()}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='d-block my-2'>
                        <Label className='fw-blod fs-5'>Sellable Time</Label>
                        <div className='d-flex justify-content-between'>
                            <FormGroup id='ticketTimeFrom' label='From' >
                                <Input
                                    type='time'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketTimeFrom}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketTimeFrom}
                                    invalidFeedback={formik.errors.ticketTimeFrom}
                                    validFeedback='Looks good!'
                                />
                            </FormGroup>
                            <FormGroup id='ticketTimeTo' label='To' >
                                <Input
                                    type='time'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketTimeTo}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketTimeTo}
                                    invalidFeedback={formik.errors.ticketTimeTo}
                                    validFeedback='Looks good!'
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 d-block">
                    <div className='row'>
                            <div className='col-lg-5'>
                            <FormGroup id='ticketChannel' label='Ticket Channel' className='locationSelect fw-blod fs-5'>
                               <Select
                                    placeholder='Enter Ticket Channel'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketChannel}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketChannel}
                                    invalidFeedback={formik.errors.ticketChannel}
                                    ariaLabel='label'
                                    validFeedback='Looks good!'
                                >
                                    <Option value='Online'>Online</Option>
                                    <Option value='BoxOffice' disabled>Box-Office</Option>
                                </Select>
                               </FormGroup>
                            </div>
                            <div className="col-lg-6">
                            <FormGroup id='ticketCategoryId' label='Ticket Category' className='locationSelect fw-blod fs-5'  >
                                <Select
                                    placeholder='--Select Your Ticket Category--'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketCategoryId}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketCategoryId}
                                    invalidFeedback={formik.errors.ticketCategoryId}
                                    validFeedback='Looks good!'
                                    ariaLabel='label'
                                >

                                    {
                                        TicketCategoryList?.length > 0 ?
                                            (
                                                TicketCategoryList.map((item, index) => (
                                                    <Option key={index} value={item?._id}>{item?.ticketCategory}</Option>
                                                ))
                                            )
                                            :
                                            (
                                                <Option>Loading...</Option>
                                            )

                                    }
                                </Select>
                            </FormGroup>
                            </div>
                       
                    </div>
                    <div className='row TicketCheck'>
                        <div className='col-lg-8'>
                            <div className='row'>
                            <Label className='fw-blod fs-5'>Ticket Limits </Label>
                          <div className="col-lg-6">
                          <FormGroup className='mt-4 fw-blod fs-5' id='ticketType'>
                                    <Checks
                                        type='radio'
                                        label='UnLimited Ticket'
                                        name='ticketType'
                                        onChange={formik.handleChange}
                                        checked={formik.values.ticketType}
                                        value='unlimited'
                                    />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                          <FormGroup className='mt-4 fw-blod fs-5' id='ticketType'>
                            <Checks
                                        type='radio'
                                        label='Limited Tickets'
                                        name='ticketType'
                                        onChange={formik.handleChange}
                                        checked={formik.values.ticketType}
                                        value='limited'
                                    />
                            </FormGroup>
                          </div>
                            </div>
                        </div>
                          <div className="col-lg-3">
                          <FormGroup label='Scan Limit' id='ticketScanLimit' className='fw-blod fs-5 locationSelect '>
                                            <Select
                                                placeholder='Scan Limit'
                                                onChange={formik.handleChange}
                                                value={formik.values.ticketScanLimit}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.ticketScanLimit}
                                                invalidFeedback={formik.errors.ticketScanLimit}
                                                validFeedback='Looks good!'
                                                ariaLabel='label'
                                            >
                                                <Option value='1'>01</Option>
                                                <Option value='2'>02</Option>
                                                <Option value='3'>03</Option>
                                            </Select>
                            </FormGroup>
                          </div>
                        </div>
                    <div className='mt-4 mx-1'>
                        <FormGroup
                            id='description'
                            label='Description'
                            className='fw-blod fs-5'
                        >
                            <Textarea
                                placeholder='Description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                isValid={formik.isValid}
                                isTouched={formik.touched.description}
                                invalidFeedback={formik.errors.description}
                                validFeedback='Looks good!'
                                rows={5}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="col-lg-3 d-block">
                    <div>
                        <FormGroup id='totalTicketQuantity' className='fw-blod fs-5' label='Total Ticket Quantity'>
                            <Input
                                placeholder='Enter Ticket Quantity'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.totalTicketQuantity}
                                isValid={formik.isValid}
                                isTouched={formik.touched.totalTicketQuantity}
                                invalidFeedback={formik.errors.totalTicketQuantity}
                                validFeedback='Looks good!'
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup id='purchaseLimit' className='fw-blod fs-5' label='Purchase Quantity'>
                            <Input
                                placeholder='Enter Purchase Quantity Limit'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.purchaseLimit}
                                isValid={formik.isValid}
                                isTouched={formik.touched.purchaseLimit}
                                invalidFeedback={formik.errors.purchaseLimit}
                                validFeedback='Looks good!'
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <p>
                            <strong className='text-danger'>
                                Note :
                            </strong>
                            The default is 8. This is the
                            maximum number your customer
                            can purchase in one transaction.
                        </p>
                    </div>
                </div>
                <div className='text-end'>
                    <Button
                    size='lg'
                   className='w-20 '
                   icon={isLoading ? undefined : 'Save'}
                   isDark
                   color={isLoading ? 'success' : 'info'}
                   isDisable={isLoading}
                   onClick={formik.handleSubmit}>
                   {isLoading && <Spinner isSmall inButton />}
                        Save
                    </Button>
                </div>
            </div>
        </div>
            </CardBody>
        </Card>
    )
}

export default General
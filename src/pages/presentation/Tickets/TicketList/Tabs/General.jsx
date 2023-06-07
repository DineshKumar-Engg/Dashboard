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
import { addTicketGeneral, errorMessage, getTicketCategoryList, loadingStatus, successMessage } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import { useNavigate } from 'react-router-dom'

const General = () => {
    const { TicketCategoryList, LocationList, error, Loading, success } = useSelector((state) => state.festiv)

	const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()    
    const { darkModeStatus } = useDarkMode();
    // const [state, setState] = useState({
    //     selection: {
    //         startDate: dayjs().toDate(),
    //         endDate: dayjs().toDate(),
    //         key: 'selection',
    //     },
    // });

    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,

        );
        if (success) {
            navigate('../ticketPages/ticketLists')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))

    };

	const TokenValidate = localStorage.getItem('Token')
	const TokenLength = TokenValidate?.length

    useEffect(()=>{
		if(TokenValidate == null || TokenLength ==0 )
		{
			navigate('../auth-pages/login')
		}
	},[TokenValidate])

    useEffect(() => {
        error && handleSave(error)
        success && handleSave(success)
        if(Loading)
        {
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
    }, [error, success, Loading]);
    useEffect(() => {
        dispatch(getTicketCategoryList())
    }, [dispatch])

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
            ticket_notes:'The default is 8',
            status: true,
        },
        validate: (values) => {

            const errors = {}

            if (!values.ticketName) {
                errors.ticketName = 'Required';
            } else if (values.ticketName.length < 3) {
                errors.ticketName = 'Must be 3 characters or more';
            } else if (values.ticketName.length > 20) {
                errors.ticketName = 'Must be 20 characters or less';
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



            if (!values.totalTicketQuantity) {
                errors.totalTicketQuantity = 'Required';
            }
            if (!values.purchaseLimit) {
                errors.purchaseLimit = 'Required';
            } 



            if (!values.description) {
                errors.description = 'Required';
            } else if (values.description.length < 3) {
                errors.description = 'Must be 3 characters or more';
            }
            else if (values.description.length < 50) {
                errors.description = 'Must be 50 characters or less';
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
            const dataToSend = removeField(values);
            
            console.log("submit",dataToSend);

            
            // const formData = new FormData();
            
            // for (let value in values) {
            //   formData.append(value, values[value]);
            // }
            



            dispatch(addTicketGeneral(dataToSend))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },

    });
    // const datePicker = (
    //     <DateRangePicker
    //         onChange={(item) => setState({ ...state, ...item })}
    //         // showSelectionPreview
    //         moveRangeOnFirstSelection={false}
    //         retainEndDateOnFirstSelection={false}
    //         months={2}
    //         ranges={[state.selection]}
    //         direction='horizontal'
    //         rangeColors={[
    //             String(process.env.REACT_APP_PRIMARY_COLOR),
    //         ]}
    //     />
    // );

    
    return (
        <Card>
            <CardBody>
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <FormGroup id='ticketName' className='fw-blod fs-5 text-dark' label='Ticket Name'>
                        <Input
                            placeholder='Tikcket Name'
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
                            <FormGroup id='ticketDateFrom' label='From' >
                                <Input
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketDateFrom}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketDateFrom}
                                    invalidFeedback={formik.errors.ticketDateFrom}
                                    validFeedback='Looks good!'
                                />
                            </FormGroup>
                            <FormGroup id='ticketDateTo' label='To' >
                                <Input
                                    type='date'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.ticketDateTo}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.ticketDateTo}
                                    invalidFeedback={formik.errors.ticketDateTo}
                                    validFeedback='Looks good!'
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
                            <div className='col-lg-6'>
                            <FormGroup >
                               <Label className='fw-blod fs-5'>Ticket Channel</Label>
                               <Input
                                    placeholder='Enter Event Title'
                                    value="Online"
                                    disabled='true'
                                    validFeedback='Looks good!'
                                />
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
                        <Label className='fw-blod fs-5'>Ticket Limits </Label>
                          <div className="col-lg-6">
                          <FormGroup className='mt-4 fw-blod fs-5' id='ticketType'>
                                    <Checks
                                        type='radio'
                                        label='Un-Limited Ticket'
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
                    <div className='mt-4'>
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
                <div >
                    <Button
                    size='lg'
                   className='w-20 '
                   icon={isLoading ? undefined : 'Save'}
                   isLight
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
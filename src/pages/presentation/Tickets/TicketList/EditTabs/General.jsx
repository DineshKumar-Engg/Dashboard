import React, { useState, useEffect } from 'react'
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
import { EditTicketGeneral, GetTicketCategoryData, GetTicketGeneralData, addTicketGeneral, errorMessage, getTicketCategoryList, loadingStatus, successMessage } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar } from 'primereact/calendar';

const General = () => {
    const { TicketCategoryData, error, Loading, success, token, TicketId, TicketGeneralData } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { darkModeStatus } = useDarkMode();


    const handleSave = () => {
        setIsLoading(false);
        // if(success == "Ticket updated successfully"){
        //     navigate('../ticketPages/ticketLists')
        // }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))
    };
    const { id } = useParams()

    useEffect(() => {
        error && handleSave()
        success && handleSave(success)
        if (Loading) {
            setIsLoading(true)
        }
        else {
            setIsLoading(false)
        }
    }, [error, success, Loading]);


    useEffect(() => {
        dispatch(GetTicketCategoryData(token))
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

    const formatDate = (dateString) => {
                const date = new Date(dateString);
                console.log(date);
                return date;
    };

           
    
    useEffect(() => {

        console.log("TicketGeneralData?.sellableDateAndTimeFrom",TicketGeneralData?.sellableDateAndTimeFrom);
        console.log("TicketGeneralData?.sellableDateAndTimeTo",TicketGeneralData?.sellableDateAndTimeTo);

            formik.setValues({
                ticketName: TicketGeneralData?.ticketName || '',
                ticketChannel: TicketGeneralData?.ticketChannel || '',
                sellableDateAndTimeFrom: formatDate(TicketGeneralData?.sellableDateAndTimeFrom) ,
                sellableDateAndTimeTo:  formatDate(TicketGeneralData?.sellableDateAndTimeTo),
                ticketCategoryId: TicketGeneralData?.ticketCategoryId || '',
                ticketType: TicketGeneralData?.ticketType || '',
                description: TicketGeneralData?.description || '',
                totalTicketQuantity: TicketGeneralData?.totalTicketQuantity || '',
                purchaseLimit: TicketGeneralData?.purchaseLimit || '',
                ticketScanLimit: TicketGeneralData?.ticketScanLimit || '',
                status: TicketGeneralData?.status || false
            });

            console.log("TicketGeneralData");
    }, [TicketGeneralData]);






    const formik = useFormik({
        initialValues: {
            ticketName: '',
            ticketChannel: 'online',
            sellableDateAndTimeFrom:'',
            sellableDateAndTimeTo:'',
            ticketCategoryId: '',
            ticketType: 'unlimited',
            description: '',
            totalTicketQuantity: '',
            purchaseLimit: '',
            ticketScanLimit: '',
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

            if (!values.sellableDateAndTimeFrom) {
                errors.sellableDateAndTimeFrom = "Required";
            }
            if (!values.sellableDateAndTimeTo) {
                errors.sellableDateAndTimeTo = "Required";
            }
            if (values.sellableDateAndTimeFrom && values.sellableDateAndTimeTo) {

                const extractedTimeFrom = extractTimePart(values.sellableDateAndTimeFrom);
                const extractedTimeTo = extractTimePart(values.sellableDateAndTimeTo);

                if (extractedTimeTo < extractedTimeFrom) {
                    errors.sellableDateAndTimeTo = 'Ticket Sellable End Time must be greater than Sellable From Time ';
                }
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

            if (values.ticketType === 'limited') {
                if (!values.totalTicketQuantity) {
                    errors.totalTicketQuantity = 'Required';
                } else if (values.totalTicketQuantity < 1) {
                    errors.totalTicketQuantity = 'Must be greater than 0 Ticket';
                }
            }

            if (!values.purchaseLimit) {
                errors.purchaseLimit = 'Required';
            } else if (values.purchaseLimit < 1) {
                errors.purchaseLimit = 'Must be greater than 1 quantity';
            } else if (values.purchaseLimit > 30) {
                errors.purchaseLimit = 'Must be less than 30 quantity';
            }


            if (!values.description) {
                errors.description = 'Required';
            }
            if (values.description.length > 1000) {
                errors.description = 'Must be 1000 characters or less';
            }

            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting, resetForm }) => {

            formik.values.ticketType == 'unlimited'? formik.values.totalTicketQuantity = undefined : null
            formik.values.sellableDateAndTimeFrom = extractTimeSubmit(values.sellableDateAndTimeFrom);
            formik.values.sellableDateAndTimeTo = extractTimeSubmit(values.sellableDateAndTimeTo);


            console.log("submit", values);
            dispatch(EditTicketGeneral({ values, token, id }))
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
                        <div className="col-lg-6">
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
                            <div className='row my-2'>
                                <Label className='fw-blod fs-5'>Sellable Date & Time</Label>
                                <div className='d-flex justify-content-between my-2'>

                                    <div className='col-lg-6'>
                                        <Calendar
                                            id='sellableDateAndTimeFrom'
                                            name='sellableDateAndTimeFrom'
                                            placeholder='Enter Date & Time'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sellableDateAndTimeFrom instanceof Date ? formik.values.sellableDateAndTimeFrom : null}
                                            showTime
                                            hourFormat="24"
                                        />
                                        <p className='text-danger'>{formik.errors.sellableDateAndTimeFrom }</p>
                                    </div>
                                    <div className='col-lg-6'>
                                        <Calendar
                                            id='sellableDateAndTimeTo'
                                            name='sellableDateAndTimeTo'
                                            placeholder='Enter Date & Time'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sellableDateAndTimeTo instanceof Date ? formik.values.sellableDateAndTimeTo : null}
                                            showTime
                                            hourFormat="24"
                                        />
                                        <p className='text-danger'>{formik.errors.sellableDateAndTimeTo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 d-block">
                            <div className='row'>
                                <div className='col-lg-6'>
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
                                                TicketCategoryData?.length > 0 ?
                                                    (
                                                        TicketCategoryData?.map((item, index) => (
                                                            <Option key={index} value={item?._id}>{item?.ticketCategoryName}</Option>
                                                        ))
                                                    )
                                                    :
                                                    (
                                                        <Option value=''>Loading...</Option>
                                                    )
                                            }
                                        </Select>
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
                        <hr />
                        <div className="col-lg-12 d-block">
                            <div className='row TicketCheck'>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <Label className='fw-blod fs-5'>Ticket Limits </Label>
                                        <div className="col-lg-6">
                                            <FormGroup className='mt-4 fw-blod fs-5' id='ticketType'>
                                                <Checks
                                                    type='radio'
                                                    label='Unlimited Ticket'
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
                                                    label='Limited Ticket'
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
                                    <FormGroup label='Ticket Scan Limit' id='ticketScanLimit' className='fw-blod fs-5 locationSelect '>
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
                            <div className='row'>
                                <div className="col-lg-4">
                                    <FormGroup id='purchaseLimit' className='fw-blod fs-5' label='Ticket Purchase Limit'>
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
                                    <div>
                                        <p>
                                            <strong className='text-danger'>
                                                Note :
                                            </strong>
                                            Ticket Purchase Limit is number of tickets a customer can buy per transaction.  Default ticket purchase limit is 30 tickets per transaction. If you want a different  Ticket purchase limit , then please enter the purchase limit per transaction.
                                        </p>
                                    </div>
                                </div>
                                {formik.values.ticketType == "limited"
                                    ?
                                    (
                                        <div className="col-lg-4">
                                            <FormGroup id='totalTicketQuantity' className='fw-blod fs-5' label='Total Ticket Quantity'>
                                                <Input
                                                    placeholder='Enter Ticket Quantity'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.totalTicketQuantity}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.totalTicketQuantity}
                                                    invalidFeedback={formik.errors.totalTicketQuantity}
                                                    disabled={formik.values.ticketType == 'unlimited'}
                                                    validFeedback='Looks good!'
                                                />
                                            </FormGroup>
                                        </div>
                                    )
                                    :
                                    null
                                }


                            </div>
                        </div>
                        <div className='text-end'>
                            <Button
                                size='lg'
                                className='w-20 '
                                icon={isLoading ? undefined : 'Save'}
                                isLight
                                color={isLoading ? 'success' : 'info'}
                                isDisable={isLoading}
                                onClick={formik.handleSubmit}>
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
                                    formik.resetForm()
                                    navigate(-1)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default General
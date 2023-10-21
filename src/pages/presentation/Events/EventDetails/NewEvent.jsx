import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../../components/bootstrap/Card';
import useDarkMode from '../../../../hooks/useDarkMode';
import validate from '../../helper/editPagesValidate';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
    SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import Button from '../../../../components/bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import dayjs, { Dayjs } from 'dayjs';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { CategoryFilter, EventFilter, EventPageListTimeZone, LocationFilter, TicketCatFilter, TicketFilter, TicketIdClear, addCategoryList, addEvent, getCategoryList, getCategoryNameList, getLocationList, getLocationNameList } from '../../../../redux/Slice';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import { Image } from '../../../../components/icon/material-icons';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'
import { Col, Row } from 'react-bootstrap';

const NewEvent = () => {


    const { themeStatus } = useDarkMode();
    const { CategoryNameList, LocationNameList,ListTimeZone, error, Loading, success, token } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // const handleSave = (val) => {
    //     setIsLoading(false);
    //     showNotification(
    //         <span className='d-flex align-items-center'>
    //             <Icon icon='Info' size='lg' className='me-1' />
    //             <span className='fs-6'>{val}</span>
    //         </span>,
    //     );
    //     if (success) {
    //         dispatch(TicketIdClear({ TicketStatus: '' }))
    //         dispatch(TicketFilter({ TicketId: "" }))
    //         dispatch(CategoryFilter({ CategoryFilterId: '' }))
    //         dispatch(LocationFilter({ LocationFilterId: '' }))
    //         dispatch(EventFilter({ EventId: '' }))
    //         dispatch(TicketCatFilter({ TicketCatFilterId: '' }))
    //         navigate('../events/event-details')
    //     }
    //     dispatch(errorMessage({ errors: '' }))
    //     dispatch(successMessage({ successess: '' }))
    //     dispatch(loadingStatus({ loadingStatus: false }))
    // };

    
    useEffect(() => {
        dispatch(getCategoryNameList(token))
        dispatch(getLocationNameList(token))
        dispatch(EventPageListTimeZone(token))
    }, [token])


	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 8000
		})
		if (success) {
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


    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        console.log(file);
        formik.setFieldValue('eventImage', file)
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


const disableDatestwo = (vals) => {
    const contributionDate = new Date(vals);
    contributionDate.setDate(contributionDate.getDate() );
    const yyyy = contributionDate.getFullYear();
    let mm = contributionDate.getMonth() + 1;
    let dd = contributionDate.getDate();
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (dd < 10) {
        dd = '0' + dd;
    }
    return `${yyyy}-${mm}-${dd}`;
    };


    const formik = useFormik({
        initialValues: {
            eventName: '',
            eventCategoryId: '',
            eventLocationId: '',
            eventDateFrom: '',
            eventDateTo: '',
            eventTimeFrom: '',
            eventTimeTo: '',
            timeZone:'',
            description:'',
            eventImage: null,
            status: false
        },
        validate: (values) => {

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
            if (!values.eventDateFrom) {
                errors.eventDateFrom = 'Required';
            }
            if (!values.eventDateTo) {
                errors.eventDateTo = 'Required';
            }
            if (!values.eventTimeFrom) {
                errors.eventTimeFrom = 'Required';
            }
            if (!values.eventTimeTo) {
                errors.eventTimeTo = 'Required';
            }
            if (values.eventTimeFrom && values.eventTimeTo) {
                const eventTimeFrom = new Date(`2000-01-01T${values.eventTimeFrom}`);
                const eventTimeTo = new Date(`2000-01-01T${values.eventTimeTo}`);
          
                if (eventTimeTo <= eventTimeFrom) {
                  errors.eventTimeTo = 'Event Time To must be greater than Event Time From';
                }
              }
            if (!values.timeZone) {
                errors.timeZone = 'Required';
            }
            if (values.eventImage?.size > 1000000) {
                errors.eventImage = 'Image must be less than 1MB';
            }


            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {

            // formik.values.eventDateFrom =   formik.values.eventDateFrom.split("-").reverse().join("/")
            // formik.values.eventDateTo = formik.values.eventDateTo.split("-").reverse().join("/")
            let fromTimeHours = parseInt(formik.values.eventTimeFrom.split(':')[0], 10);
            const fromTimeMinutes = formik.values.eventTimeFrom.split(':')[1];
            let fromTimePeriod = '';

            if (fromTimeHours < 12) {
                fromTimePeriod = 'AM';
            } else {
                fromTimePeriod = 'PM';
                if (fromTimeHours > 12) {
                    fromTimeHours -= 12;
                }
            }

            let toTimeHours = parseInt(formik.values.eventTimeTo.split(':')[0], 10);
            const toTimeMinutes = formik.values.eventTimeTo.split(':')[1];
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

            formik.values.eventTimeFrom = convertedFrom
            formik.values.eventTimeTo = convertedTo

            formik.values.eventDateAndTimeFrom = formik.values.eventDateFrom.concat(" ", convertedFrom)
            formik.values.eventDateAndTimeTo = formik.values.eventDateTo.concat(" ", convertedTo)


            formik.values.eventTimeFrom = ''
            formik.values.eventTimeTo = ''



            const formData = new FormData();
       
            const removeField = ({ eventDateFrom, eventDateTo, eventTimeFrom, eventTimeTo, ...rest }) => rest;
            const dataToSend = removeField(values);

            for (let value in dataToSend) {
                formData.append(value, values[value]);
            }
           
            dispatch(addEvent({ formData, token }))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },
    });



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
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row g-5 mx-3'>
                                <div className="col-lg-6">
                                    <FormGroup id='eventName' label='Event Name' className='text-dark'>
                                        <Input
                                            placeholder='Enter Event Name'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.eventName}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.eventName}
                                            invalidFeedback={formik.errors.eventName}
                                            validFeedback='Looks good!'
                                        />
                                    </FormGroup>
                                    <div className='row mt-3'>
                                        <div className="col-lg-6 col-md-6">
                                            <FormGroup id='eventLocationId' className='locationSelect' label='Event Location Name' >
                                                <Select
                                                    placeholder='--Select Your Location--'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.eventLocationId}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.eventLocationId}
                                                    invalidFeedback={formik.errors.eventLocationId}
                                                    validFeedback='Looks good!'
                                                    ariaLabel='label'
                                                    className=''
                                                >
                                                    {
                                                        LocationNameList?.length > 0 ?
                                                            (
                                                                LocationNameList.map((item, index) => (
                                                                    <Option key={index} value={item?._id}>{item?.eventLocationName}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait...</Option>
                                                            )
                                                    }
                                                </Select>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <FormGroup id='eventCategoryId' className='locationSelect' label='Event Category' >
                                                <Select
                                                    placeholder='--Select Your Category--'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.eventCategoryId}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.eventCategoryId}
                                                    invalidFeedback={formik.errors.eventCategoryId}
                                                    validFeedback='Looks good!'
                                                    ariaLabel='label'
                                                >
                                                    {
                                                        CategoryNameList?.length > 0 ?
                                                            (
                                                                CategoryNameList?.map((item, index) => (
                                                                    <Option key={index} value={item?._id}>{item?.eventCategoryName}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait...</Option>
                                                            )

                                                    }
                                                </Select>

                                            </FormGroup>
                                        </div>
                                    </div>
                                    <FormGroup
                                        id='description'
                                        label='Event Description'
                                        className='px-2 py-2'
                                    >
                                        <Textarea
                                            placeholder='Event Description'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.description}
                                            invalidFeedback={formik.errors.description}
                                            validFeedback='Looks good!'
                                            rows={4}
                                        />
                                    </FormGroup>
                                    <div className='my-3'>
                                        <Label>Event Date</Label>
                                        <div className='d-flex justify-content-between'>
                                            <FormGroup id='eventDateFrom' label='From' >
                                                <Input
                                                    type='date'
                                                    placeholder='Enter Event Title'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.eventDateFrom}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.eventDateFrom}
                                                    invalidFeedback={formik.errors.eventDateFrom}
                                                    validFeedback='Looks good!'
                                                    min={disablePastDates()}
                                                />
                                            </FormGroup>
                                            <FormGroup id='eventDateTo' label='To' >
                                                <Input
                                                    type='date'
                                                    placeholder='Enter Event Title'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.eventDateTo}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.eventDateTo}
                                                    invalidFeedback={formik.errors.eventDateTo}
                                                    validFeedback='Looks good!'
                                                    min={formik.values.eventDateFrom} 
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <Label >Event Time</Label>
                                        <Row className='d-flex justify-content-between'>
                                        <Col lg={4}>
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
                                        </Col>
                                        <Col lg={4}>
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
                                        </Col>
                                        <Col lg={4}>
                                        <FormGroup id='timeZone' className='locationSelect' label='Zone' >
                                                <Select
                                                    placeholder='--Select Your Time Zone--'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.timeZone}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.timeZone}
                                                    invalidFeedback={formik.errors.timeZone}
                                                    validFeedback='Looks good!'
                                                    ariaLabel='label'
                                                >
                                                        {
                                                            ListTimeZone.length > 0 && (
                                                                ListTimeZone?.map((item) => (
                                                                    <>
                                                                        <Option value={item?._id}  >{item?.timeZone}</Option>
                                                                    </>
                                                                ))
                                                            )
                                                        }
                                                </Select>

                                            </FormGroup>
                                        </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                   
                                    <FormGroup id='eventImage' label='Event Image' >
                                        <Input
                                            type='file'
                                            placeholder='Upload image'
                                            onChange={(e) => handleChangeFile(e)}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.eventImage}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.eventImage}
                                            invalidFeedback={formik.errors.eventImage}
                                            validFeedback='Looks good!'
                                            accept='image/*'
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-12">
                                    <Button
                                        className='w-20 py-3 px-3 my-3'
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

                        </form>

                    </CardBody>

                </Card>
            </Page>
        </PageWrapper>
    )
}

export default NewEvent


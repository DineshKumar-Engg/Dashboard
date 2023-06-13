import React, { useState, useEffect } from 'react';
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
import { addCategoryList, addEvent, getCategoryList, getLocationList } from '../../../../redux/Slice';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
// import { useHistory } from 'react-router-dom';


const NewEvent = () => {


    const { themeStatus } = useDarkMode();
    const {CategoryList,LocationList, error, Loading, success,token } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,

        );
        if (success) {
            navigate('../events/event-details')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))

    };




    useEffect(() => {
        dispatch(getCategoryList())
        dispatch(getLocationList())
    }, [dispatch])


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

    const handleChange = (e)=>{
        const file = e.currentTarget.files[0]
        formik.setFieldValue('eventImg',file)
    }

    

    const formik = useFormik({
        initialValues: {
            eventName: '',
            eventCategoryId:'',
            eventLocationId:'',
            eventDateFrom:'',
            eventDateTo:'',
            eventTimeFrom:'',
            eventTimeTo:'',
            eventImg:'',
            seoTitle:'',
            seoDescription: '',
            status: false
        },
        validate: (values) => {

            const errors = {}

            if (!values.eventName) {
                errors.eventName = 'Required';
            } else if (values.eventName.length < 3) {
                errors.eventName = 'Must be 3 characters or more';
            } else if (values.eventName.length > 20) {
                errors.eventName = 'Must be 20 characters or less';
            }

             if (!values.eventCategoryId) {
                errors.eventCategoryId = 'Required';
            }
            if (!values.eventLocationId) {
                errors.eventLocationId = 'Required';
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
            if (!values.eventImg) {
                errors.eventImg = 'Required';
            }
            else if(values.eventImg?.size > 100000){
                errors.eventImg = 'Image must be less than 1MB';
            }

            if (!values.seoTitle) {
                errors.seoTitle = 'Required';
            } else if (values.seoTitle.length < 3) {
                errors.seoTitle = 'Must be 3 characters or more';
            } else if (values.seoTitle.length < 60) {
                errors.seoTitle = 'Must be 60 characters or more';
            }

            if (!values.seoDescription) {
                errors.seoDescription = 'Required';
            } else if (values.seoDescription.length < 3) {
                errors.seoDescription = 'Must be 3 characters or more';
            }
            else if (values.seoDescription.length < 160) {
                errors.seoDescription = 'Must be 160 characters or more';
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

            formik.values.eventDateAndTimeFrom = formik.values.eventDateFrom.concat(" ",convertedFrom)
            formik.values.eventDateAndTimeTo =formik.values.eventDateTo.concat(" ",convertedTo)


            formik.values.eventTimeFrom=''
            formik.values.eventTimeTo=''


            
            const formData = new FormData();
            
            for (let value in values) {
              formData.append(value, values[value]);
            }

            dispatch(addEvent({formData,token}))

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
                                    <FormGroup id='eventLocationId' className='locationSelect' label='Event Location' >
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
                                                            LocationList?.length>0 ?
                                                            (
                                                                LocationList.map((item, index) => (
                                                                    <Option key={index} value={item?._id}>{item?.locationName}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait,Server Busy...</Option>
                                                            )
                                                         
                                                        }
                                                    </Select>
                                    </FormGroup>
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
                                                            CategoryList?.length>0 ?
                                                            (
                                                                CategoryList.map((item, index) => (
                                                                    <Option key={index} value={item?._id}>{item?.categoryName}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait,Server Busy...</Option>
                                                            )
                                                         
                                                        }
                                                    </Select>

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
                                        />
                                        </FormGroup>
                                       </div>
                                    </div>
                                    <div className='mt-3'>
                                        <Label >Event Time</Label>
                                        <div className='d-flex justify-content-between'>
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

                                    <FormGroup id='eventImg' label='Event Image' >
                                    <Input
                                            type='file'
                                            placeholder='Upload image'
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.eventImg}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.eventImg}
                                            invalidFeedback={formik.errors.eventImg}
                                            validFeedback='Looks good!'
                                            accept='image/*'
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-lg-6">
                                <FormGroup
                                id='seoTitle'
                                label='SEO Title'
                                >
                                <Input
                                            placeholder='Enter SEO Title'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.seoTitle}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.seoTitle}
                                            invalidFeedback={formik.errors.seoTitle}
                                            validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                            <FormGroup
											id='seoDescription'
											label='SEO Description'
											className='px-2 py-2'
											>
											<Textarea
												placeholder='SEO Description'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.seoDescription}
												isValid={formik.isValid}
												isTouched={formik.touched.seoDescription}
												invalidFeedback={formik.errors.seoDescription}
												validFeedback='Looks good!'
												rows={5}
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
                                            navigate('../events/event-details')
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

{/* <div className='col-lg-6'>
<FormGroup id='categoryName' label='Category Name' >
    <Input
        placeholder='Category Name'
        autoComplete='categoryName'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.categoryName}
        isValid={formik.isValid}
        isTouched={formik.touched.categoryName}
        invalidFeedback={formik.errors.categoryName}
        validFeedback='Looks good!'
    />
</FormGroup>
</div>
<div className='col-lg-6 col-md-12'>
<FormGroup id='seoTitle' label='SEO Title' >
    <Input
        placeholder='SEO Title'
        autoComplete='seoTitle'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.seoTitle}
        isValid={formik.isValid}
        isTouched={formik.touched.seoTitle}
        invalidFeedback={formik.errors.seoTitle}
        validFeedback='Looks good!'
    />
</FormGroup>
</div>
<div className='col-lg-6 col-12'>
<FormGroup
    id='seoDescription'
    label='SEO Description'
    className='px-2 py-2'
>
    <Textarea
        placeholder='SEO Description'
        autoComplete='seoDescription'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.seoDescription}
        isValid={formik.isValid}
        isTouched={formik.touched.seoDescription}
        invalidFeedback={formik.errors.seoDescription}
        validFeedback='Looks good!'
        rows={5}
    />
</FormGroup>
</div> */}
import React, { useState } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Input from '../../../../../components/bootstrap/forms/Input'
import Button from '../../../../../components/bootstrap/Button'
import Label from '../../../../../components/bootstrap/forms/Label'
import Select from '../../../../../components/bootstrap/forms/Select'
import { useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Checks from '../../../../../components/bootstrap/forms/Checks'
import Textarea from '../../../../../components/bootstrap/forms/Textarea'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { useFormik } from 'formik'


const Redemption = () => {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            categoryName: '',
            seoTitle: '',
            seoDescription: '',
            status: true,
            unlimited: false,
            limited: false,
        },
        validate: (values) => {

            const errors = {}

            if (!values.categoryName) {
                errors.categoryName = 'Required';
            } else if (values.categoryName.length < 3) {
                errors.categoryName = 'Must be 3 characters or more';
            } else if (values.categoryName.length > 20) {
                errors.categoryName = 'Must be 20 characters or less';
            }

            if (!values.seoTitle) {
                errors.seoTitle = 'Required';
            } else if (values.seoTitle.length < 3) {
                errors.seoTitle = 'Must be 3 characters or more';
            } else if (values.seoTitle.length > 40) {
                errors.seoTitle = 'Must be 40 characters or less';
            }

            if (!values.seoDescription) {
                errors.seoDescription = 'Required';
            } else if (values.seoDescription.length < 3) {
                errors.seoDescription = 'Must be 3 characters or more';
            }
            else if (values.seoDescription.length < 50) {
                errors.seoDescription = 'Must be 50 characters or less';
            }
            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            dispatch(addCategoryList(values))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },

    });


    return (
        <Card>
            <CardBody>
                <div className="row">
                    <div className="col-lg-6">
                    <strong className='fw-blod fs-5 text-danger'><u>Scannable Date & Time</u></strong>

                        <div className="col-lg-8">
                            <div className='d-flex justify-content-between  flex-column g-2 mt-4'>
                                <Label>Redeem Date</Label>
                                <div className='d-flex justify-content-between mt-2'>
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
                    </div>

                    <div className="col-lg-4">
                        <strong className='fw-blod fs-5 text-danger'><u>Redemption Limit Rules</u></strong>
                        <div className='w-50 mt-4'>
                            <FormGroup label='Scan Limit' className='fw-blod fs-5 locationSelect '>
                                <Select
                                    placeholder='--Select Your Limits--'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.eventCategoryId}
                                    isValid={formik.isValid}
                                    isTouched={formik.touched.eventCategoryId}
                                    invalidFeedback={formik.errors.eventCategoryId}
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

                    </div>
                    <div className='mt-4'>
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
            </CardBody>
        </Card>
    )
}

export default Redemption
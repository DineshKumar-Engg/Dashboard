import React, { useState } from 'react'
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
import { useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Checks from '../../../../../components/bootstrap/forms/Checks'
import Textarea from '../../../../../components/bootstrap/forms/Textarea'
import Spinner from '../../../../../components/bootstrap/Spinner'

const General = () => {
    const { CategoryList, LocationList, error, Loading, success } = useSelector((state) => state.festiv)

	const [isLoading, setIsLoading] = useState(false);

    const { darkModeStatus } = useDarkMode();
    const [state, setState] = useState({
        selection: {
            startDate: dayjs().toDate(),
            endDate: dayjs().toDate(),
            key: 'selection',
        },
    });

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
    const datePicker = (
        <DateRangePicker
            onChange={(item) => setState({ ...state, ...item })}
            // showSelectionPreview
            moveRangeOnFirstSelection={false}
            retainEndDateOnFirstSelection={false}
            months={2}
            ranges={[state.selection]}
            direction='horizontal'
            rangeColors={[
                String(process.env.REACT_APP_PRIMARY_COLOR),
            ]}
        />
    );

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
                            value={formik.values.categoryName}
                            isValid={formik.isValid}
                            isTouched={formik.touched.categoryName}
                            invalidFeedback={formik.errors.categoryName}
                            validFeedback='Looks good!'
                        />
                    </FormGroup>
                    <div className='d-block my-2'>
                        <Label className='fw-blod fs-5'>Sellable Date</Label>
                        <div className='d-flex justify-content-between g-2'>
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
                    <div className='d-block my-2'>
                        <Label className='fw-blod fs-5'>Sellable Time</Label>
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
                            <FormGroup id='eventCategoryId' label='Ticket Category' className='locationSelect fw-blod fs-5'  >
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
                                        CategoryList?.length > 0 ?
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
                            </div>
                       
                    </div>
                    <div className='row'>
                        <Label className='fw-blod fs-5' >Ticket Limits </Label>
                          <div className="col-lg-6">
                          <FormGroup className='mt-4 fw-blod fs-5'>
                                    <Checks
                                        type='radio'
                                        id='unlimited'
                                        label='Un-limited Tickets'
                                        name='limitTicket'
                                        onChange={formik.handleChange}
                                        checked={formik.values.unlimited}
                                        value={formik.values.unlimited}
                                    />

                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                          <FormGroup className='mt-4 fw-blod fs-5' >
                            <Checks
                                        id='limited'
                                        type='radio'
                                        label='Limited Tickets'
                                        checked={formik.values.limited}
                                        onChange={formik.handleChange}
                                        value={formik.values.unlimited}
                                    />
                            </FormGroup>
                          </div>
                        </div>
                    <div className='mt-4'>
                        <FormGroup
                            id='Description'
                            label='Description'
                            className='fw-blod fs-5'
                        >
                            <Textarea
                                placeholder='Description'
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
                </div>
                <div className="col-lg-3 d-block">
                    <div>
                        <FormGroup id='ticketquality' className='fw-blod fs-5' label='Total Ticket Quantity'>
                            <Input
                                placeholder='Enter Ticket Quantity'
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
                    <div>
                        <FormGroup id='purchasequantity' className='fw-blod fs-5' label='Purchase Quantity'>
                            <Input
                                placeholder='Enter Purchase Quantity'
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
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
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup'






const FeeStructure = () => {

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
          <div className="col-lg-4 tickettable">
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'>Ticket Type</th>
                  <th scope='col' className='text-center'>Ticket Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>General</td>
                  <td>
                    <FormGroup>
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
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Adult'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.unlimited}
                      value={formik.values.unlimited}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        placeholder='Enter Adult Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                        isValid={formik.isValid}
                        isTouched={formik.touched.categoryName}
                        invalidFeedback={formik.errors.categoryName}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Child'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.unlimited}
                      value={formik.values.unlimited}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        placeholder='Enter Child Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                        isValid={formik.isValid}
                        isTouched={formik.touched.categoryName}
                        invalidFeedback={formik.errors.categoryName}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Staff/Volunteer'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.unlimited}
                      value={formik.values.unlimited}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        placeholder='Enter Staff/Volunteer Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                        isValid={formik.isValid}
                        isTouched={formik.touched.categoryName}
                        invalidFeedback={formik.errors.categoryName}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Student'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.unlimited}
                      value={formik.values.unlimited}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        placeholder='Enter Student Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                        isValid={formik.isValid}
                        isTouched={formik.touched.categoryName}
                        invalidFeedback={formik.errors.categoryName}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Senior Citizen'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.unlimited}
                      value={formik.values.unlimited}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        placeholder='Enter Senior Citizen Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                        isValid={formik.isValid}
                        isTouched={formik.touched.categoryName}
                        invalidFeedback={formik.errors.categoryName}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <div className='d-flex'>
              <FormGroup label='Credit Card Fees' className='mx-2'>
                <InputGroup>
                  <InputGroupText>
                    <Icon icon='AttachMoney' />
                  </InputGroupText>
                  <Input
                    placeholder='Enter Credit Card Fees'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoryName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.categoryName}
                    invalidFeedback={formik.errors.categoryName}
                    validFeedback='Looks good!'
                  />
                </InputGroup>

              </FormGroup>

              <FormGroup label='Processing Fees' className='mx-2'>
                <InputGroup>
                  <InputGroupText>
                    <Icon icon='AttachMoney' />
                  </InputGroupText>
                  <Input
                    placeholder='Enter Processing Fees'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoryName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.categoryName}
                    invalidFeedback={formik.errors.categoryName}
                    validFeedback='Looks good!'
                  />
                </InputGroup>
              </FormGroup>

            </div>
            <div className='d-flex'>
              <FormGroup label='Other Fees' className='mx-2'>
                <InputGroup>
                  <InputGroupText>
                    <Icon icon='AttachMoney' />
                  </InputGroupText>
                  <Input
                    placeholder='Enter Other Fees'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoryName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.categoryName}
                    invalidFeedback={formik.errors.categoryName}
                    validFeedback='Looks good!'
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup label='Sales Tax' className='mx-2'>
                <InputGroup>
                  <InputGroupText>
                    <Icon icon='AttachMoney' />
                  </InputGroupText>
                  <Input
                    placeholder='Enter Sales Tax'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoryName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.categoryName}
                    invalidFeedback={formik.errors.categoryName}
                    validFeedback='Looks good!'
                  />
                </InputGroup>
              </FormGroup>
            </div>
          </div>
          <div className="col-lg-4 border-start-1">
            <table className='table'>
              <thead>
               <tr>
               <th scope='col' className='text-start'>Total Price</th>
               </tr>
              </thead>
              <tbody className='tableBody'>
                <tr>
                  <td>
                    Total Ticket Price
                  </td>
                  <td>
                    $ 100
                  </td>
                </tr>
                <tr>
                  <td>
                  Sales Tax % 10
                  </td>
                  <td>
                  $10
                  </td>
                </tr>
                <tr>
                 <td>
                 Processing Fees
                 </td>
                 <td>
                 $05
                 </td>
                </tr>
                <tr>
                  <td>
                  Other Fees
                  </td>
                  <td>
                  $ 02
                  </td>
                </tr>
                <tr>
                 <td> Credit Card Fees</td>
                 <td>$ 08</td>
                </tr>
                
              </tbody>
            </table>
            <div className='d-flex justify-content-between'>
             <div>
             <p>Total Ticket Price</p>
             </div>
              <div>
              <h4 className='text-danger'>$125 Dollars</h4>
              </div>
            </div>
            <div>
              <span className='d-flex'>
              <strong className='text-danger'>Note* :</strong>
              <p> This price will be displayed at the Ticket Face</p>
              </span>
              
            </div>
          </div>
        </div>
        <div className="d-flex w-50">
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
      </CardBody>
    </Card>
  )
}

export default FeeStructure
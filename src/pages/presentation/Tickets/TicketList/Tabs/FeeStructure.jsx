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
      ticketGeneral:'',
      adult: false,
      Child: false,
      Staff: false,
      Student: false,
      SeniorCitizen:false,
      AdultValue:'',
      ChildValue:'',
      StaffValue:'',
      StudentValue:'',
      SeniorCitizenValue:'',
      creditfee:'',
      creditfeeValue:'',
      processfee:'',
      processfeeValue:'',
      otherfee:'',
      otherFeeValue:'',
      salesfee:'',
      salesfeeValue:'',
      status: true,
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
     console.log("submit ",values);
      // setIsLoading(true);
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
                  <td className='text-center'>General</td>
                  <td>
                    <FormGroup id='ticketGeneral'>
                      <Input
                        placeholder='Tikcket Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ticketGeneral}
                        isValid={formik.isValid}
                        isTouched={formik.touched.ticketGeneral}
                        invalidFeedback={formik.errors.ticketGeneral}
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
                      id='adult'
                      onChange={formik.handleChange}
                      checked={formik.values.adult}
                      value='true'
                    />
                  </td>
                  <td>
                    <FormGroup id='AdultValue'>
                      <Input
                        placeholder='Enter Adult Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.AdultValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.AdultValue}
                        invalidFeedback={formik.errors.AdultValue}
                        validFeedback='Looks good!'
                        disabled={formik.values.adult}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checks
                      type='checkbox'
                      label='Child'
                      id='Child'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.Child}
                      value={formik.values.Child}
                    />
                  </td>
                  <td>
                    <FormGroup id='ChildValue'>
                      <Input
                        placeholder='Enter Child Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ChildValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.ChildValue}
                        invalidFeedback={formik.errors.ChildValue}
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
                      id='Staff'
                      onChange={formik.handleChange}
                      checked={formik.values.Staff}
                      value={formik.values.Staff}
                    />
                  </td>
                  <td>
                    <FormGroup id='StaffValue'>
                      <Input
                        placeholder='Enter Staff/Volunteer Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.StaffValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.StaffValue}
                        invalidFeedback={formik.errors.StaffValue}
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
                      id='Student'
                      inInline='true'
                      onChange={formik.handleChange}
                      checked={formik.values.Student}
                      value={formik.values.Student}
                    />
                  </td>
                  <td>
                    <FormGroup id='StudentValue'>
                      <Input
                        placeholder='Enter Student Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.StudentValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.StudentValue}
                        invalidFeedback={formik.errors.StudentValue}
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
                      id='SeniorCitizen'
                      onChange={formik.handleChange}
                      checked={formik.values.SeniorCitizen}
                      value={formik.values.SeniorCitizen}
                    />
                  </td>
                  <td>
                    <FormGroup id='SeniorCitizenValue'>
                      <Input
                        placeholder='Enter Senior Citizen Price'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.SeniorCitizenValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.SeniorCitizenValue}
                        invalidFeedback={formik.errors.SeniorCitizenValue}
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
              <div>
                <Label>Credit Card Fees</Label>
                <div className='row '>
                  <div className='col-lg-3 ticketSelect'>
                    <FormGroup className='locationSelect' id='creditfee'>
                      <Select 
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.creditfee}
                      isTouched={formik.touched.creditfee}
                       invalidFeedback={formik.errors.creditfee}
                      >
                        <Option value='USD'>$</Option>
                        <Option value='%'>%</Option>
                      </Select>
                    </FormGroup>
                  </div>
                  <div className='col-lg-7 ticketinput'>
                    <FormGroup className='mx-2 ' id='creditfeeValue'>
                      <Input
                        placeholder='Enter Credit Card Fees'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.creditfeeValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.creditfeeValue}
                        invalidFeedback={formik.errors.creditfeeValue}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>

              <div>
                <Label>Processing Fees</Label>
                <div className="row">
                  <div className="col-lg-3 ticketSelect">
                    <FormGroup className='locationSelect' id='processfee'>
                      <Select
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.processfee}
                      isValid={formik.isValid}
                       isTouched={formik.touched.processfee}
                       invalidFeedback={formik.errors.processfee}
                      >
                        <Option value='USD'>$</Option>
                        <Option value='%'>%</Option>
                      </Select>
                    </FormGroup>
                  </div>
                  <div className="col-lg-7 ticketinput">
                    <FormGroup className='mx-2' id='processfeeValue'>

                      <Input
                        placeholder='Enter Processing Fees'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.processfeeValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.processfeeValue}
                        invalidFeedback={formik.errors.processfeeValue}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <Label>'Other Fees</Label>
                <div className="row">
                  <div className="col-lg-3 ticketSelect">
                    <FormGroup className='locationSelect' id='otherfee'>
                      <Select
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.otherfee}
                       isValid={formik.isValid}
                       isTouched={formik.touched.otherfee}
                       invalidFeedback={formik.errors.otherfee}
                      >
                        <Option value='USD'>$</Option>
                        <Option value='%'>%</Option>
                      </Select>
                    </FormGroup>
                  </div>
                  <div className="col-lg-7 ticketinput">
                    <FormGroup className='mx-2' id='otherFeeValue'>

                      <Input
                        placeholder='Enter Other Fees'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.otherFeeValue}
                        isValid={formik.isValid}
                        isTouched={formik.touched.otherFeeValue}
                        invalidFeedback={formik.errors.otherFeeValue}
                        validFeedback='Looks good!'
                      />
                    </FormGroup>
                  </div>
                </div>

              </div>
              <div>
              <Label>Sales Tax</Label>
              <div className="row">
              <div className="col-lg-3 ticketSelect">
                    <FormGroup className='locationSelect' id='salesfee'>
                      <Select
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.salesfee}
                       isValid={formik.isValid}
                       isTouched={formik.touched.salesfee}
                       invalidFeedback={formik.errors.salesfee}
                      >
                        <Option value='%'>%</Option>
                      </Select>
                    </FormGroup>
                </div>
                <div className="col-lg-7 ticketinput">
                <FormGroup className='mx-2' id='salesfeeValue'>
                 <Input
                   placeholder='Enter Sales Tax'
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.salesfeeValue}
                   isValid={formik.isValid}
                   isTouched={formik.touched.salesfeeValue}
                   invalidFeedback={formik.errors.salesfeeValue}
                   validFeedback='Looks good!'
                 />
             </FormGroup>
                </div>
              </div>
                
              </div>

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
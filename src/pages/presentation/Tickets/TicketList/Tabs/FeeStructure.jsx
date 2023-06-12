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
     		<CardBody className='table-responsive' >
          <table  className='table table-modern table-hover'>
          <thead>
								<tr>
									<th scope='col' className='text-center'>
										Ticket Type
                  </th>
									<th scope='col' className='text-center'>
										Ticket Price
									</th>
									<th scope='col' className='text-center'>
                  Credit Card Fees
									</th>
									<th scope='col' className='text-center'>
                  Processing Fee
									</th>
                  <th scope='col' className='text-center'>
                  Other Fees
									</th>
                  <th scope='col' className='text-center'>
                  Sales Tax
									</th>
                  <th scope='col' className='text-center'>
                  Total Price
									</th>
								</tr>
							</thead>
              <tbody>
                <tr>
                  <td className='fw-bold fs-5'>
                    {/* <Select>
                      <Option value=''>Adult</Option>
                      <Option value='' >Child</Option>
                      <Option value='' >Staff </Option>
                      <Option value='' >Volunteer</Option>
                      <Option value='' >Student</Option>
                      <Option value=''>Senior Citizen</Option>
                    </Select> */}
                    Adult
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Ticket Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Credit Card Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Processing Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Other Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Sales Tax'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Total Ticket Price'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                  disabled='true'
                                                />
                      </FormGroup>                  
                  </td>
                </tr>
                <tr>
                  <td className='fw-bold fs-5'>
                    {/* <Select>
                      <Option value=''>Adult</Option>
                      <Option value='' >Child</Option>
                      <Option value='' >Staff </Option>
                      <Option value='' >Volunteer</Option>
                      <Option value='' >Student</Option>
                      <Option value=''>Senior Citizen</Option>
                    </Select> */}
                    Child
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Ticket Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Credit Card Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Processing Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Other Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Sales Tax'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Total Ticket Price'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                  disabled='true'
                                                />
                      </FormGroup>                  
                  </td>
                </tr>
                <tr>
                  <td className='fw-bold fs-5'>
                    {/* <Select>
                      <Option value=''>Adult</Option>
                      <Option value='' >Child</Option>
                      <Option value='' >Staff </Option>
                      <Option value='' >Volunteer</Option>
                      <Option value='' >Student</Option>
                      <Option value=''>Senior Citizen</Option>
                    </Select> */}
Staff                    
</td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Ticket Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Credit Card Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Processing Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Other Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Sales Tax'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Total Ticket Price'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                  disabled='true'
                                                />
                      </FormGroup>                  
                  </td>
                </tr>
                <tr>
                  <td className='fw-bold fs-5'>
                    {/* <Select>
                      <Option value=''>Adult</Option>
                      <Option value='' >Child</Option>
                      <Option value='' >Staff </Option>
                      <Option value='' >Volunteer</Option>
                      <Option value='' >Student</Option>
                      <Option value=''>Senior Citizen</Option>
                    </Select> */}
Senior Citizen
</td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Ticket Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Credit Card Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Processing Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Other Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Sales Tax'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Total Ticket Price'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                  disabled='true'
                                                />
                      </FormGroup>                  
                  </td>
                </tr>
               
                <tr>
                  <td className='fw-bold fs-5'>
                    {/* <Select>
                      <Option value=''>Adult</Option>
                      <Option value='' >Child</Option>
                      <Option value='' >Staff </Option>
                      <Option value='' >Volunteer</Option>
                      <Option value='' >Student</Option>
                      <Option value=''>Senior Citizen</Option>
                    </Select> */}
Student                  
</td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Ticket Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Credit Card Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Processing Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Other Fees'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Enter Sales Tax'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                      </FormGroup>                  
                  </td>
                  <td>
                  <FormGroup id='credit'>
                                                <Input
                                                    placeholder='Total Ticket Price'
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    // value={formik.values.address}
                                                    // isValid={formik.isValid}
                                                    // isTouched={formik.touched.address}
                                                    // invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                  disabled='true'
                                                />
                      </FormGroup>                  
                  </td>
                </tr>
              </tbody>
          </table>
        <div className="d-flex w-50 text-end">
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
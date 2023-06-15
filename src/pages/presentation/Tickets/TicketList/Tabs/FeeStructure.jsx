import React, { useState, useEffect } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Input from '../../../../../components/bootstrap/forms/Input'
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
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup'
import { TicketTypes, addTicketFeesStructure } from '../../../../../redux/Slice'
import * as Yup from 'yup'
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import showNotification from '../../../../../components/extras/showNotification'
import {  errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import { useNavigate } from 'react-router-dom'





const FeeStructure = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { TicketType, token ,error, Loading, success,} = useSelector((state) => state.festiv)
  const dispatch = useDispatch()
  const navigate= useNavigate()
  useEffect(() => {
    dispatch(TicketTypes({ token }))
  }, [])

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


  const initialValues = {
    ticketId: "648ab264c70e0b5de5315f0b",
    ticket: [
      {
        ticketType: "",
        ticketPrice:{
          price: "",
          currency: "",
        },
        creditCardFees: {
          price: "",
          currency: ""
        },
        processingFees: {
          price: "",
          currency: ""
        },
        otherFees: {
          price: "",
          currency: ""
        },
        salesTax: {
          value: "",
          type: ""
        },
        totalTicketPrice: "",
      }
    ],
    status: false
  };

  const validationSchema = Yup.object({
    // ticketType: Yup.array().of(
    //   Yup.object().shape({
    //     general: Yup.string().required("Ticket Type is required"),
    //     // price: Yup.date().required("To Date is required"),
    //     // FromTime: Yup.string().required("From Time is required"),
    //     // ToTime: Yup.string().required("To Time is required")
    //   })
    // ),
    // ticketScanLimit: Yup.number().required('Scan limit is required')
  });

  const handleCalculate =(values)=>{
    console.log(values);
    for(let i=0;i<values?.ticket?.length;i++){
      const salesTax = values?.ticket[i].ticketPrice.currency == 'USD' ? (values?.ticket[i].ticketPrice.price *82) * values?.ticket[i].salesTax.value/100 :  (values?.ticket[i].ticketPrice.price/100) * values?.ticket[i].salesTax.value/100;

      const totalTicketPrice =  values?.ticket[i].ticketPrice.currency == 'USD' ? values?.ticket[i].ticketPrice.price *82 : values?.ticket[i].ticketPrice.price/100 + 
                                values?.ticket[i].creditCardFees.currency == 'USD' ? values?.ticket[i].creditCardFees.price*82 : values?.ticket[i].creditCardFees.price/100 +
                                values?.ticket[i].processingFees.currency == 'USD' ? values?.ticket[i].processingFees.price*82 : values?.ticket[i].processingFees.price/100 + 
                                values?.ticket[i].otherFees.currency == 'USD' ? values?.ticket[i].otherFees.price*82 : values?.ticket[i].otherFees.price/100+ 
                                salesTax;
      values.ticket[i].totalTicketPrice= totalTicketPrice.toString()                  
    }
  }


  const OnSubmit = (values) => {

    console.log(values);
    console.log("submit");
    dispatch(addTicketFeesStructure({token,values}))
  }




  return (
    <div className='container-fluid'>
      <div className='table-responsive' >
        <Formik initialValues={initialValues} onSubmit={values => { OnSubmit(values) }}  >
          {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <table className='table table-modern'>
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
                  <FieldArray name='ticket'>
                    {({ push, remove }) => (
                      <>
                        {
                          values.ticket.map((_, index) => (
                            <>
                              <tr key={index}>
                                <td className='fw-bold fs-6'>
                                  <FormGroup className='locationSelect '>
                                    <Field
                                      as="select"
                                      name={`ticket.${index}.ticketType`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.ticket[index].ticketType}
                                    >
                                      <Option value=''>Select Ticket Type</Option>
                                      {
                                        TicketType.map((item) => (
                                          <>
                                            <Option value={item?._id}>{item?.ticketType}</Option>
                                          </>
                                        ))
                                      }
                                    </Field>
                                    <ErrorMessage name={`ticket.${index}.ticketType`} component="div" className="error" />
                                  </FormGroup>
                                </td>
                                <td>
                                  <div className='row td-center'>
                                    <div className='col-lg-3 ticketSelect '>
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.ticketPrice.currency`}
                                          onChange={values=>{handleChange(values)}}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].ticketPrice.currency}
                                        >
                                          <Option value='' disabled>&#8744;</Option>
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.ticketPrice.currency`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className='col-lg-9 ticketinput'>
                                      <FormGroup className='mr-2'>
                                        <Field
                                          type='number'
                                          placeholder='Enter Ticket Fees'
                                          name={`ticket.${index}.ticketPrice.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].ticketPrice.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.ticketPrice.price`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="row">
                                    <div className='col-lg-3 ticketSelect'>
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.creditCardFees.currency`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].creditCardFees.currency}

                                        >
                                          <Option value='' disabled>&#8744;</Option>
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.creditCardFees.currency`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className='col-lg-9 ticketinput'>
                                      <FormGroup>
                                        <Field
                                          type='number'
                                          placeholder='Enter Credit Fees'
                                          name={`ticket.${index}.creditCardFees.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].creditCardFees.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.creditCardFees.price`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="row">
                                    <div className="col-lg-3 ticketSelect">
                                      <FormGroup className='locationSelect' >
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.processingFees.currency`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].processingFees.currency}
                                        >
                                          <Option value='' disabled>&#8744;</Option>
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.processingFees.currency`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className="col-lg-9 ticketinput">
                                      <FormGroup  >
                                        <Field
                                          type='number'
                                          placeholder='Enter Credit Fees'
                                          name={`ticket.${index}.processingFees.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].processingFees.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.processingFees.price`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="row">
                                    <div className="col-lg-3 ticketSelect">
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.otherFees.currency`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].otherFees.currency}
                                        >
                                          <Option value='' disabled>&#8744;</Option>
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.otherFees.currency`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className="col-lg-9 ticketinput">
                                      <FormGroup>

                                        <Field
                                          type='number'
                                          placeholder='Enter Credit Fees'
                                          name={`ticket.${index}.otherFees.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].otherFees.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.otherFees.price`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="row">
                                    <div className="col-lg-3 ticketSelect">
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.salesTax.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].salesTax.type}
                                        >
                                          <Option value='' disabled>&#8744;</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.salesTax.type`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className="col-lg-9 ticketinput">
                                      <FormGroup >
                                        <Field
                                          placeholder='Enter Sales Tax'
                                          type='number'
                                          name={`ticket.${index}.salesTax.value`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].salesTax.value}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.salesTax.value`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                 <div className="row">
                                  <div className="col-lg-3 px-4 py-4">
                                      <Button type="submit" color={'info'} icon={'ArrowForwardIos'} isLight onClick={()=>{handleCalculate(values)}}>
                                        
                                      </Button>
                                  </div>
                                  <div className="col-lg-9">
                                  <FormGroup id='credit'>
                                    <Field
                                      placeholder='Total Ticket Price'
                                      name={`ticket.${index}.totalTicketPrice`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={ "$" + " "+values.ticket[index].totalTicketPrice }
                                      className='form-control'
                                      disabled
                                    />
                                    <ErrorMessage name={`ticket.${index}.totalTicketPrice`} component="div" className="error" />
                                  </FormGroup>
                                  </div>
                                 </div>
                                </td>
                              </tr>
                              <tr>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>


                                </td>
                                <td>

                                </td>
                                <td>
                                  {index !== 0 && (
                                    <div className='d-flex justify-content-end'>
                                      <Button type="button" color={'danger'} isLight onClick={() => remove(index)}>
                                        Delete
                                      </Button>
                                    </div>
                                  )}
                                </td>


                              </tr>
                              <tr>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

                                </td>

                                <td>
                                  {index === values.ticket.length - 1 && (
                                    <Button
                                      type="button"
                                      onClick={() => push({
                                        ticketType: "",
                                        ticketPrice:{
                                          price: "",
                                          currency: "",
                                        },
                                        creditCardFees: {
                                          price: "",
                                          currency: ""
                                        },
                                        processingFees: {
                                          price: "",
                                          currency: ""
                                        },
                                        otherFees: {
                                          price: "",
                                          currency: ""
                                        },
                                        salesTax: {
                                          value: "",
                                          type: ""
                                        },
                                        totalTicketPrice: "",
                                      })}
                                      color={'warning'}
                                      className='mt-4 px-4 py-2 fs-5'
                                      icon={'Add'}
                                    >
                                      Add
                                    </Button>
                                  )}
                                </td>
                                <td>

                                </td>
                                <td>
                                </td>

                              </tr>

                            </>
                          ))
                        }

                      </>
                    )}
                  </FieldArray>
                </tbody>
              </table>
              <div className="text-end">
                <Button
                  type="submit"
                  size='lg'
                  className='w-20 '
                  icon={isLoading ? undefined : 'Save'}
                  isLight
                  color={isLoading ? 'success' : 'info'}
                  isDisable={isLoading}
                >
                  {isLoading && <Spinner isSmall inButton />}
                  Save
                </Button>
              </div>
            </form>
          )}

        </Formik>

      </div>
    </div>
  )
}

export default FeeStructure
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
import { EditTicketFees, TicketTypes, addTicketFeesStructure, addTicketRedemption } from '../../../../../redux/Slice'
import * as Yup from 'yup'
import { Formik, FieldArray, Field, ErrorMessage, useFormikContext,useFormik, FormikConsumer } from "formik";
import showNotification from '../../../../../components/extras/showNotification'
import {  errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import { useNavigate, useParams } from 'react-router-dom'





const FeeStructure = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { TicketType, token ,error, Loading, success, TicketFeesData} = useSelector((state) => state.festiv)

  const dispatch = useDispatch()
  const navigate= useNavigate()
  useEffect(() => {
    dispatch(TicketTypes({ token }))
  }, [dispatch])

  const queryParams = new URLSearchParams(location.search);
  const TicketId = queryParams.get('i');


  const handleSave = () => {
    setIsLoading(false);
    if (success == 'TicketFeesStructure created successfully') {
       const params = new URLSearchParams();
            params.append('i', TicketId);
            params.append('p', 'TicketFace');
            params.append('t', 'create');
            navigate(`?${params.toString()}`);
    }
    dispatch(errorMessage({ errors: '' }))
    dispatch(successMessage({ successess: '' }))
    dispatch(loadingStatus({ loadingStatus: false }))
};

useEffect(() => {
  error && handleSave()
  success && handleSave()
  if(Loading)
  {
      setIsLoading(true)
  }
  else{
      setIsLoading(false)
  }
}, [error, success, Loading]);




const [initialValues,setInitialValues]=useState({
  ticketId: '',
  ticket: [
  {
  ticketType:'',
  ticketPrice:{
    price: '',
    type: "USD",
  },
  creditCardFees: {
    price:  '',
    type: "USD"
  },
  processingFees: {
    price: '',
    type: "USD"
  },
  merchandiseFees: {
    price:  '',
    type: "USD"
  },
  otherFees: {
    price: '',
    type: "USD"
  },
  salesTax: {
    price:'',
    type: "Percentage"
  },
  totalTicketPrice: '',
}
],
status: TicketFeesData?.status || false
})

  useEffect(() => {
    setInitialValues((prevState) => ({...prevState,ticket: TicketFeesData?.ticket ,status: TicketFeesData?.status ,ticketId:TicketId }));
  }, [TicketFeesData]);

  const validationSchema = Yup.object().shape({
    ticket: Yup.array().of(
      Yup.object().shape({
        ticketType: Yup.string().required("required**"),
        ticketPrice: Yup.object().shape({
          price: Yup.number().required("required**").test('is-positive', 'Value must be a positive number', (value) => {
            return value >= 0;
          }),
        }),
        creditCardFees: Yup.object().shape({
          price: Yup.number().required("required**").test('is-positive', 'Value must be a positive number', (value) => {
            return value >= 0;
          }),
        }),
        processingFees: Yup.object().shape({
          price: Yup.number().required("required**").test('is-positive', 'Value must be a positive number', (value) => {
            return value >= 0;
          }),
        }),
        merchandiseFees: Yup.object().shape({
          price: Yup.number().required("required**").test('is-positive', 'Value must be a positive number', (value) => {
            return value >= 0;
          }),
        }),
        otherFees: Yup.object().shape({
          price: Yup.number().required("required**").test('is-positive', 'Value must be a positive number', (value) => {
            return value >= 0;
          }),
        }),
        salesTax: Yup.object().shape({
          price: Yup.number().required("required**")
        }),
        totalTicketPrice: Yup.string().required("required**")
      })
    )
  });

const handleCalculate =(values,index,setFieldValue)=>{
    for(let i=0;i<values?.ticket?.length;i++){
      const salesTax = values?.ticket[i].ticketPrice.type == 'USD' ? values?.ticket[i].ticketPrice.price * (values?.ticket[i].salesTax.price/100) :  (values?.ticket[i].ticketPrice.price/100) * values?.ticket[i].salesTax.price/100;
     

      const ticketPrcie = values?.ticket[i].ticketPrice.type == 'USD' ? (values?.ticket[i].ticketPrice.price + salesTax): (salesTax + values?.ticket[i].ticketPrice.price/100)
      const creditfees =  values?.ticket[i].creditCardFees.type == 'USD' ? values?.ticket[i].creditCardFees.price : values?.ticket[i].creditCardFees.price/100 
      const processfees = values?.ticket[i].processingFees.type == 'USD' ? values?.ticket[i].processingFees.price : values?.ticket[i].processingFees.price/100
      const merchandisefees = values?.ticket[i].merchandiseFees.type == 'USD' ? values?.ticket[i].merchandiseFees.price : values?.ticket[i].merchandiseFees.price/100
      const otherfees = values?.ticket[i].otherFees.type == 'USD' ? values?.ticket[i].otherFees.price: values?.ticket[i].otherFees.price/100 


      const totalTicketPrice =  salesTax + ticketPrcie + creditfees + merchandisefees + processfees + otherfees
        setFieldValue(`ticket.${index}.totalTicketPrice`,totalTicketPrice.toFixed(2).toString())
  }
}

  const OnSubmit = (value) => {
    
    const values = {
      ...value,
      ticket: value?.ticket?.map(ticket => {
        const { _id, ...rest } = ticket;
        return rest;
      })
    };
    values.ticketId = TicketId
    dispatch(addTicketFeesStructure({token,values}))
  }

  return (
    <div className='container-fluid '>
      <div className='table-responsive feesStructure'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) =>  OnSubmit(values)} enableReinitialize={true}>
          {({ values, handleChange, handleBlur,handleSubmit, isValid, touched, errors,setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <table className='table  table-modern'>
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
                    Merchandise Fees
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
                          values?.ticket?.map((_, index) => (
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
                                  <div className='row'>
                                    <div className='col-lg-3 ticketSelect '>
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.ticketPrice.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}//values=>{handleChange(values)}
                                          value={values.ticket[index].ticketPrice.type}
                                        >
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.ticketPrice.type`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className='col-lg-9 ticketinput'>
                                      <FormGroup>
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
                                          name={`ticket.${index}.creditCardFees.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].creditCardFees.type}

                                        >
                                          {/* <Option value='' disabled>&#8744;</Option> */}
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.creditCardFees.type`} component="div" className="error" />
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
                                          name={`ticket.${index}.processingFees.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].processingFees.type}
                                        >
                                          {/* <Option value='' disabled>&#8744;</Option> */}
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.processingFees.type`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className="col-lg-9 ticketinput">
                                      <FormGroup  >
                                        <Field
                                          type='number'
                                          placeholder='Enter Processing Fees'
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
                                      <FormGroup className='locationSelect' >
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.merchandiseFees.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].merchandiseFees.type}
                                        >
                                          {/* <Option value='' disabled>&#8744;</Option> */}
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.merchandiseFees.type`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                    <div className="col-lg-9 ticketinput">
                                      <FormGroup  >
                                        <Field
                                          type='number'
                                          placeholder='Enter Merchandise Fees'
                                          name={`ticket.${index}.merchandiseFees.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].merchandiseFees.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.merchandiseFees.price`} component="div" className="error" />
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
                                          name={`ticket.${index}.otherFees.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].otherFees.type}
                                        >
                                          {/* <Option value='' disabled>&#8744;</Option> */}
                                          <Option value='USD'>$</Option>
                                          <Option value='Percentage'>%</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.otherFees.type`} component="div" className="error" />
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
                                          {/* <Option value='' disabled>&#8744;</Option> */}
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
                                          name={`ticket.${index}.salesTax.price`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].salesTax.price}
                                          className='form-control'
                                        />
                                        <ErrorMessage name={`ticket.${index}.salesTax.price`} component="div" className="error" />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                 <div className="row">
                                  <div className="col-lg-3 px-3 py-4">
                                      <Button type="button" color={'info'} icon={'ArrowForwardIos'} isLight onClick={()=>{handleCalculate(values,index,setFieldValue)}}>
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
                                          type: "USD",
                                        },
                                        creditCardFees: {
                                          price: "",
                                          type: "USD"
                                        },
                                        processingFees: {
                                          price: "",
                                          type: "USD"
                                        },
                                        merchandiseFees: {
                                          price: "",
                                          type: "USD"
                                        },
                                        otherFees: {
                                          price: "",
                                          type: "USD"
                                        },
                                        salesTax: {
                                          price: "",
                                          type: "Percentage"
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
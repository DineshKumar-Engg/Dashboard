import React, { useState, useEffect } from 'react'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Button from '../../../../../components/bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { EditTicketFees, TicketTypes } from '../../../../../redux/Slice'
import * as Yup from 'yup'
import { Formik, FieldArray, Field, ErrorMessage, useFormikContext,useFormik, FormikConsumer } from "formik";
import {  errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import { useNavigate, useParams } from 'react-router-dom'





const FeeStructure = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { TicketType, token ,error, Loading, success,TicketId,TicketFeesData} = useSelector((state) => state.festiv)
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const {id}=useParams()

  useEffect(() => {
    dispatch(TicketTypes({ token }))
  }, [])

  const handleSave = () => {
    setIsLoading(false);
    // if (success == 'TicketFeesStructure updated successfully') {
    //   navigate('../ticketPages/ticketLists')
    // }
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
  ticket: [
  {
  ticketType:'',
  ticketPrice:{
    price: 0,
    type: "USD",
  },
  creditCardFees: {
    price:  0,
    type: "USD"
  },
  processingFees: {
    price: 0,
    type: "USD"
  },
  merchandiseFees: {
    price: 0,
    type: "USD"
  },
  otherFees: {
    price: 0,
    type: "USD"
  },
  salesTax: {
    price:0,
    type: "Percentage"
  },
  totalTicketPrice: 0,
  creditCardFeesDollar:0,
  processingFeesDollar:0,
  otherFeesDollar:0,
  merchandiseFeesDollar:0,
  salesTaxDollar:0,
  totalFeesDollar:0
}
],
status: TicketFeesData?.status || false
})

useEffect(() => {
  if(TicketFeesData?.ticket?.length > 0 ){
    setInitialValues((prevState) => ({...prevState,ticket: TicketFeesData?.ticket}));
  }else{
    setInitialValues({
      ticket: [
        {
          ticketType:'',
          ticketPrice:{
            price: 0,
            type: "USD",
          },
          creditCardFees: {
            price:  0,
            type: "USD"
          },
          processingFees: {
            price: 0,
            type: "USD"
          },
          merchandiseFees: {
            price: 0,
            type: "USD"
          },
          otherFees: {
            price: 0,
            type: "USD"
          },
          salesTax: {
            price:0,
            type: "Percentage"
          },
          totalTicketPrice: 0,
          creditCardFeesDollar:0,
          processingFeesDollar:0,
          otherFeesDollar:0,
          merchandiseFeesDollar:0,
          salesTaxDollar:0,
          totalFeesDollar:0
        }
    ],
    status: TicketFeesData?.status || false
    })
  }
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


// const handleCalculate =(values,index,setFieldValue)=>{

//     for(let i=0;i<values?.ticket?.length;i++){
//       console.log("ticketPrice",values);
//       const ticketPrcie = values?.ticket[i].ticketPrice.type == 'USD' ? values?.ticket[i].ticketPrice.price : values?.ticket[i].ticketPrice.price
//       const creditfees =  values?.ticket[i].creditCardFees.type == 'USD' ? values?.ticket[i].creditCardFees.price : values?.ticket[i].ticketPrice.price * (values?.ticket[i].creditCardFees.price / 100) 
//       const processfees = values?.ticket[i].processingFees.type == 'USD' ? values?.ticket[i].processingFees.price : values?.ticket[i].ticketPrice.price * (values?.ticket[i].processingFees.price/100)
//       const merchandisefees = values?.ticket[i].merchandiseFees.type == 'USD' ? values?.ticket[i].merchandiseFees.price : values?.ticket[i].ticketPrice.price * (values?.ticket[i].merchandiseFees.price/100)
//       const otherfees = values?.ticket[i].otherFees.type == 'USD' ? values?.ticket[i].otherFees.price: values?.ticket[i].ticketPrice.price * (values?.ticket[i].otherFees.price/100)
//       const salesTax =  values?.ticket[i].ticketPrice.price * (values?.ticket[i].salesTax.price/100) 
      
//       const totalFees = creditfees + merchandisefees + processfees + otherfees
//       const totalTicketPrice =  salesTax + ticketPrcie + totalFees

//       console.log("ticketPrcie" ,ticketPrcie);
//       console.log("merchandisefees" ,merchandisefees);
//       console.log("creditfees" ,creditfees);
//       console.log("otherfees" ,otherfees);
//       console.log("processfees" ,processfees);
//       console.log("salesTax" ,salesTax);
//       console.log("totalTicketPrice" ,totalTicketPrice);

//         setFieldValue(`ticket.${i}.totalTicketPrice`,parseFloat(totalTicketPrice.toFixed(2)) )
//         setFieldValue(`ticket.${i}.creditCardFeesDollar`,parseFloat(creditfees.toFixed(2)))
//         setFieldValue(`ticket.${i}.processingFeesDollar`,parseFloat(processfees.toFixed(2)))
//         setFieldValue(`ticket.${i}.otherFeesDollar`,parseFloat(otherfees.toFixed(2)))
//         setFieldValue(`ticket.${i}.merchandiseFeesDollar`,parseFloat(merchandisefees.toFixed(2)))
//         setFieldValue(`ticket.${i}.salesTaxDollar`,parseFloat(salesTax.toFixed(2)))
//         setFieldValue(`ticket.${i}.totalFeesDollar`,parseFloat(totalFees.toFixed(2)))

//     }
//   }

  const calculateTicketPrices = (values) => {
    const updatedTickets = values.ticket.map((ticket) => {
      const ticketPrice = parseFloat(ticket.ticketPrice.price);
      const creditCardFees = ticket.creditCardFees.type === 'Percentage'
        ? (ticketPrice * parseFloat(ticket.creditCardFees.price) / 100)
        : parseFloat(ticket.creditCardFees.price);
      const processingFees = ticket.processingFees.type === 'Percentage'
        ? (ticketPrice * parseFloat(ticket.processingFees.price) / 100)
        : parseFloat(ticket.processingFees.price);
      const merchandiseFees = ticket.merchandiseFees.type === 'Percentage'
        ? (ticketPrice * parseFloat(ticket.merchandiseFees.price) / 100)
        : parseFloat(ticket.merchandiseFees.price);
      const otherFees = ticket.otherFees.type === 'Percentage'
        ? (ticketPrice * parseFloat(ticket.otherFees.price) / 100)
        : parseFloat(ticket.otherFees.price);
      const salesTax = ticketPrice * (parseFloat(ticket.salesTax.price) / 100);
      const totalFees = creditCardFees + merchandiseFees + processingFees + otherFees;
      const totalTicketPrice = salesTax + ticketPrice + totalFees;
  
      return {
        ...ticket,
        totalTicketPrice: parseFloat(totalTicketPrice.toFixed(2)),
        creditCardFeesDollar: parseFloat(creditCardFees.toFixed(2)),
        processingFeesDollar: parseFloat(processingFees.toFixed(2)),
        otherFeesDollar: parseFloat(otherFees.toFixed(2)),
        merchandiseFeesDollar: parseFloat(merchandiseFees.toFixed(2)),
        salesTaxDollar: parseFloat(salesTax.toFixed(2)),
        totalFeesDollar: parseFloat(totalFees.toFixed(2)),
      };
    });
  
    return {
      ...values,
      ticket: updatedTickets,
    };
  };

const handleCalculate =(values,setFieldValue)=>{
  const updatedValues = calculateTicketPrices(values);
  setFieldValue('ticket', updatedValues.ticket);
}


  const OnSubmit = (value) => {
    const values = calculateTicketPrices(value);

    const valueData = {
      ...values,
      ticket: values?.ticket?.map(ticket => {
        const { _id, ...rest } = ticket;
        return rest;
      })
    };

    console.log("ONSUBMITVALUE" ,valueData);
    dispatch(EditTicketFees({token,valueData,id}))
    setIsLoading(true);
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
                                          price: 0,
                                          type: "USD",
                                        },
                                        creditCardFees: {
                                          price: 0,
                                          type: "USD"
                                        },
                                        processingFees: {
                                          price: 0,
                                          type: "USD"
                                        },
                                        merchandiseFees: {
                                          price: 0,
                                          type: "USD"
                                        },
                                        otherFees: {
                                          price: 0,
                                          type: "USD"
                                        },
                                        salesTax: {
                                          price: 0,
                                          type: "Percentage"
                                        },
                                        totalTicketPrice: 0,
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
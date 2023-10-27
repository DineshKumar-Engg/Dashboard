import React, { useState, useEffect } from 'react'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Button from '../../../../../components/bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { TicketTypes, addTicketFeesStructure } from '../../../../../redux/Slice'
import * as Yup from 'yup'
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import { errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import { useNavigate } from 'react-router-dom'
import Popovers from '../../../../../components/bootstrap/Popovers'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../../Constant';
import Swal from 'sweetalert2'



const FeeStructure = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { TicketType, token, error, Loading, success } = useSelector((state) => state.festiv)


  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    if (Loading) {
      setIsLoading(true)
    }
    else {
      setIsLoading(false)
    }
  }, [error, success, Loading]);





  const initialValues = {
    ticketId: '',
    ticket: [
      {
        ticketType: "",
        ticketPrice: {
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
        creditCardFeesDollar: 0,
        processingFeesDollar: 0,
        otherFeesDollar: 0,
        merchandiseFeesDollar: 0,
        salesTaxDollar: 0,
        totalFeesDollar: 0
      }
    ],
    status: false
  };




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
        salesTaxDollar: parseFloat(salesTax.toFixed(3)),
        totalFeesDollar: parseFloat(totalFees.toFixed(2)),
      };
    });

    return {
      ...values,
      ticket: updatedTickets,
    };
  };

  const handleCalculate = (values, setFieldValue) => {
    const updatedValues = calculateTicketPrices(values);
    setFieldValue('ticket', updatedValues.ticket);
  }
  const Notification = (val, tit, pos, ico, btn) => {
    Swal.fire({
      position: `${pos}`,
      title: `${tit}`,
      text: `${val}`,
      icon: `${ico}`,
      confirmButtonText: `${btn}`,
    })
  }

  const OnSubmit = (value) => {
    let filteredTickets = [];
    let isValid = true;

    value.ticketId = TicketId

    for (let i = 0; i < value?.ticket?.length; i++) {
      if ((value?.ticket[i].ticketPrice.price > 0 ||
        value?.ticket[i].creditCardFees.price > 0 ||
        value?.ticket[i].processingFees.price > 0 ||
        value?.ticket[i].merchandiseFees.price > 0 ||
        value?.ticket[i].otherFees.price > 0 ||
        value?.ticket[i].salesTax.price > 0) && value?.ticket[i].totalTicketPrice == 0) {

        const filteredTicketType = TicketType.find((item) => item._id === value?.ticket[i].ticketType);
        if (filteredTicketType) {
          filteredTickets.push(filteredTicketType.ticketType);
        }
        isValid = false;

      } else if (value?.ticket[i].totalTicketPrice > 0) {
        isValid = true;
      }
    }
    if (!isValid) {
      var errorMessage = `Please Click Calculate Button to Calculate " ${filteredTickets} " Ticket price`
      Notification(errorMessage, errTitle, poscent, errIcon, BtnCanCel)
    } else {
      const values = calculateTicketPrices(value);
      console.log("submit", values);
      dispatch(addTicketFeesStructure({ token, values }))
      setIsLoading(true);
    }
  }

  return (
    <div className='container-fluid '>
      <div className='table-responsive feesStructure'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => OnSubmit(values)} >
          {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors, setFieldValue }) => (
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
                                  <div className='row'>
                                    <div className='col-lg-3 ticketSelect '>
                                      <FormGroup className='locationSelect'>
                                        <Field
                                          as="select"
                                          name={`ticket.${index}.ticketPrice.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].ticketPrice.type}
                                        >
                                          <Option value='USD'>$</Option>
                                        </Field>
                                        <ErrorMessage name={`ticket.${index}.ticketPrice.type`} component="div" className="error" />
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
                                          name={`ticket.${index}.creditCardFees.type`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.ticket[index].creditCardFees.type}

                                        >

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
                                      <Popovers title='Alert!' trigger='hover' desc='Click button to calculate Ticket Price' >
                                        <Button type="button" color={'info'} icon={'ArrowForwardIos'}  onClick={() => { handleCalculate(values, setFieldValue) }}>
                                        </Button>
                                      </Popovers>
                                    </div>
                                    <div className="col-lg-9">
                                      <FormGroup id='credit'>
                                        <Field
                                          placeholder='Total Ticket Price'
                                          name={`ticket.${index}.totalTicketPrice`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={"$" + " " + values.ticket[index].totalTicketPrice}
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
                                        ticketPrice: {
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
                                    
                                    navigate(-1)
                                }}
                            >
                                Cancel
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


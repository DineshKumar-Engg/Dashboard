import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../../../components/bootstrap/Card'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Button from '../../../../../components/bootstrap/Button'
import Label from '../../../../../components/bootstrap/forms/Label'
import Select from '../../../../../components/bootstrap/forms/Select'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../../../components/bootstrap/Option'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { EventPageListTimeZone, addTicketRedemption } from '../../../../../redux/Slice'
import { useNavigate } from 'react-router-dom'

const Redemption = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { error, Loading, success, token, ListTimeZone } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const queryParams = new URLSearchParams(location.search);
    const TicketId = queryParams.get('i');

    const handleSave = () => {
        setIsLoading(false);

        if (success == "TicketRedemption created successfully") {
            const params = new URLSearchParams();
            params.append('i', TicketId);
            params.append('p', 'FeesStructure');
            params.append('t', 'create');
            navigate(`?${params.toString()}`);
        }

    };

    useEffect(() => {
        dispatch(EventPageListTimeZone(token))
    }, [token])

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


    const disableDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate() - 1;

        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        return `${yyyy}-${mm}-${dd}`;
    };

    const initialValues = {
        redemption: [
            {
                FromDate: "",
                ToDate: "",
                FromTime: "",
                ToTime: ""
            }
        ],
        status: false
    };

    const validationSchema = Yup.object({
        redemption: Yup.array().of(
            Yup.object().shape({
                FromDate: Yup.date().required("From Date is required"),
                ToDate: Yup.date().required("To Date is required"),
                FromTime: Yup.string().required("From Time is required"),
                ToTime: Yup.string()
                    .required("To Time is required")
                    .test('is-greater', 'Redeem To Time must be greater than or equal to From Time', function (toTime) {
                        const fromTime = this.parent.FromTime; // Accessing FromTime from parent object
                        if (fromTime && toTime) {
                            return fromTime <= toTime;
                        }
                        return true;
                    }),
            })
        ),
    });

    const OnSubmit = (values) => {


        for (let i = 0; i < values?.redemption?.length; i++) {
            let fromTimeHours = parseInt(values?.redemption[i].FromTime.split(':')[0], 10);
            const fromTimeMinutes = values?.redemption[i].FromTime.split(':')[1];
            let fromTimePeriod = '';

            if (fromTimeHours < 12) {
                fromTimePeriod = 'AM';
            } else {
                fromTimePeriod = 'PM';
                if (fromTimeHours > 12) {
                    fromTimeHours -= 12;
                }
            }

            let toTimeHours = parseInt(values?.redemption[i].ToTime.split(':')[0], 10);
            const toTimeMinutes = values?.redemption[i].ToTime.split(':')[1];
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


            values.redemption[i].redemDateAndTimeFrom = values.redemption[i].FromDate.concat(" ", convertedFrom)
            values.redemption[i].redemDateAndTimeTo = values.redemption[i].ToDate.concat(" ", convertedTo)


            const removeField = ({ FromTime, ToTime, FromDate, ToDate, ...rest }) => rest;
            values.redemption[i] = removeField(values.redemption[i]);
            values.ticketId = TicketId
        }

        console.log("values", values);
        dispatch(addTicketRedemption({ values, token }))
        setIsLoading(true);
    }



    return (
        <Card>
            <CardHeader borderSize={1}>
                <CardLabel icon='Timelapse' iconColor='warning'>
                    <CardTitle>Ticket Redemption</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => { OnSubmit(values) }}>
                        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <FieldArray name="redemption">
                                                {({ push, remove }) => (
                                                    <div>
                                                        {values.redemption.map((_, index) => (
                                                            <>
                                                                <div key={index} className='row'>
                                                                    <Label className='fs-5 bold mt-3 mb-3'>{index + 1}. {" "}Redemption Date & Time</Label>

                                                                    <div className='col-lg-6  d-flex justify-content-between text-center flex-column g-2 mt-4'>
                                                                        <Label>Redeem Date</Label>
                                                                        <div className='d-flex justify-content-around mt-2'>
                                                                            <FormGroup id='eventDateFrom' label='From' >
                                                                                <Field
                                                                                    type='date'
                                                                                    name={`redemption.${index}.FromDate`}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].FromDate}
                                                                                    className='form-control'
                                                                                    min={disableDates()}
                                                                                />
                                                                                <ErrorMessage name={`redemption.${index}.FromDate`} component="div" className="error" />
                                                                            </FormGroup>
                                                                            <FormGroup id='eventDateTo' label='To' >
                                                                                <Field
                                                                                    type="date"
                                                                                    name={`redemption.${index}.ToDate`}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].ToDate}
                                                                                    className='form-control'
                                                                                    min={values.redemption[index].FromDate}
                                                                                />
                                                                                <ErrorMessage name={`redemption.${index}.ToDate`} component="div" className="error" />
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div>

                                                                    <div className='col-lg-6 d-flex justify-content-between text-center flex-column g-2 mt-4'>
                                                                        <Label>Redeem Time</Label>
                                                                        <div className='d-flex justify-content-around mt-2'>
                                                                            <FormGroup id='eventTimeFrom' label='From' >
                                                                                <Field
                                                                                    type="time"
                                                                                    name={`redemption.${index}.FromTime`}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].FromTime}
                                                                                    className='form-control'
                                                                                />
                                                                                <ErrorMessage name={`redemption.${index}.FromTime`} component="div" className="error" />
                                                                            </FormGroup>
                                                                            <FormGroup id='eventTimeTo' label='To' >
                                                                                <Field
                                                                                    type="time"
                                                                                    name={`redemption.${index}.ToTime`}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].ToTime}
                                                                                    className='form-control'
                                                                                />
                                                                                <ErrorMessage name={`redemption.${index}.ToTime`} component="div" className="error" />
                                                                            </FormGroup>
                                                                        </div>

                                                                    </div>
                                                                    {index !== 0 && (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Button type="button" color={'danger'} isLight onClick={() => remove(index)}>
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {index === values.redemption.length - 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => push({ FromDate: "", ToDate: "", FromTime: "", ToTime: "" })}
                                                                        color={'warning'}
                                                                        className='mt-4 px-4 py-2 fs-5'
                                                                        icon={'Add'}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}

                                                            </>
                                                        ))}
                                                    </div>
                                                )}
                                            </FieldArray>



                                        </div>


                                    </div>

                                </div>
                                <div className='mt-4 text-end'>
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
            </CardBody>
        </Card>
    )
}

export default Redemption



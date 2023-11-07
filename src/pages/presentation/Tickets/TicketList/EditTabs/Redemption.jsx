import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../../../components/bootstrap/Card'
import Button from '../../../../../components/bootstrap/Button'
import Label from '../../../../../components/bootstrap/forms/Label'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../../../components/bootstrap/Spinner'
import { Formik, FieldArray } from "formik";
import { EditTicketRedemption, EventPageListTimeZone } from '../../../../../redux/Slice'
import { errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar } from 'primereact/calendar';
import { today } from '../../../Constant'

const Redemption = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { error, Loading, success, token, TicketRedemptionData } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const handleSave = () => {
        setIsLoading(false);

        // if (success == "TicketRedemption updated successfully") {
        //     navigate('../ticketPages/ticketLists')
        //  }
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


    const [initialValues, setInitialValues] = React.useState({
        redemption: [
            {
                redemDateAndTimeFrom: "",
                redemDateAndTimeTo: "",
            }
        ],
        status: false
    })

    useEffect(() => {
        dispatch(EventPageListTimeZone(token))
    }, [token])


    const extractTimePart = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;
        const timePart = formattedDate.slice(10, 16);
        return [ timePart, formattedDate?.split(' ')[0]];
    }
    const extractTimeSubmit = (timeString) => {
        const eventTime = new Date(timeString);
        const formattedDate = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date;
    };

    useEffect(() => {

      
            
            const separatedData = TicketRedemptionData?.redemption?.map((item) => {
                const fromTime = formatDate(item.redemDateAndTimeFrom);
                const toTime = formatDate(item.redemDateAndTimeTo);
                return {
                    redemDateAndTimeFrom: fromTime,
                    redemDateAndTimeTo: toTime,
                };

            });

            if (TicketRedemptionData?.redemption?.length > 0) {
                setInitialValues((prevState) => ({ ...prevState, redemption: separatedData, status: TicketRedemptionData?.status }))
            } else {
                setInitialValues({
                    redemption: [
                        {
                            redemDateAndTimeFrom: "",
                            redemDateAndTimeTo: "",
                        }
                    ],
                    status: false
                })
            }

    }, [TicketRedemptionData]);



    const validate = (values) => {

        const errors = {}

        values?.redemption?.forEach((value, index) => {
            if (!value.redemDateAndTimeFrom) {
                errors[`redemption[${index}].redemDateAndTimeFrom`] = "Required";
            }
            if (!value.redemDateAndTimeTo) {
                errors[`redemption[${index}].redemDateAndTimeTo`] = "Required";
            }
            if (value.redemDateAndTimeFrom && value.redemDateAndTimeTo) {

                const extractedTimeFrom = extractTimePart(value.redemDateAndTimeFrom);
                const extractedTimeTo = extractTimePart(value.redemDateAndTimeTo);

                if (extractedTimeTo[1] === extractedTimeFrom[1] && extractedTimeTo[0] < extractedTimeFrom[0]) {
                    errors[`redemption[${index}].redemDateAndTimeTo`] = 'Redemption End Time must be greater than Redemption From Time ';
                }
            }
        })


        return errors;
    }




    const OnSubmit = (values) => {

        values?.redemption?.forEach((val, index) => {
            values.redemption[index].redemDateAndTimeFrom = extractTimeSubmit(val?.redemDateAndTimeFrom);
            values.redemption[index].redemDateAndTimeTo = extractTimeSubmit(val?.redemDateAndTimeTo);
        })

        console.log("values", values);

        dispatch(EditTicketRedemption({ values, token, id }))
        setIsLoading(true);
    }



    return (
        <Card>
            <CardHeader>
                <CardLabel icon='Timelapse' iconColor='warning'>
                    <CardTitle>Ticket Redemption</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className="row">
                    <Formik initialValues={initialValues} validate={validate} onSubmit={values => { OnSubmit(values) }} enableReinitialize={true}>
                        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <FieldArray name="redemption">
                                                {({ push, remove }) => (
                                                    <div>
                                                        {values?.redemption?.map((_, index) => (
                                                            <>
                                                                <div key={index} className='row'>
                                                                    <Label className='fs-5 bold mt-3 mb-3'>{index + 1}. {" "}Redemption Date & Time</Label>
                                                                    <div className='col-lg-12  d-flex justify-content-center text-center mt-4'>
                                                                        <div className='row'>
                                                                            <div className="col-lg-6 d-flex flex-column">
                                                                                <Label>Redeem From Date & Time</Label>
                                                                                <Calendar
                                                                                    name={`redemption.${index}.redemDateAndTimeFrom`}
                                                                                    placeholder='Enter From Date & Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].redemDateAndTimeFrom instanceof Date ? values.redemption[index].redemDateAndTimeFrom : null}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                    minDate={today}
                                                                                />

                                                                                <p className='text-danger'>{errors[`redemption[${index}].redemDateAndTimeFrom`]}</p>
                                                                            </div>
                                                                            <div className="col-lg-6 d-flex flex-column">
                                                                                <Label>Redeem To Date & Time</Label>
                                                                                <Calendar
                                                                                    name={`redemption.${index}.redemDateAndTimeTo`}
                                                                                    placeholder='Enter To Date & Time'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.redemption[index].redemDateAndTimeTo instanceof Date ? values.redemption[index].redemDateAndTimeTo : null}
                                                                                    showTime
                                                                                    hourFormat="24"
                                                                                    minDate={today}
                                                                                />
                                                                                <p className='text-danger'>{errors[`redemption[${index}].redemDateAndTimeTo`]}</p>
                                                                            </div>
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
                                                                        onClick={() => push({
                                                                            redemDateAndTimeFrom: "",
                                                                            redemDateAndTimeTo: "",
                                                                        })}
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

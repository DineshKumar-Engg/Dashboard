import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Card, {
    CardActions,
    CardBody,
    CardFooter,
    CardFooterRight,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card';
import Spinner from '../../../components/bootstrap/Spinner';
import { useEffect, useState } from 'react';
import { FormikProvider, FieldArray, Field, ErrorMessage, useFormik, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { AddAndEditAssign, AssignEventName, AssignTicketName,  getAssignSingle } from '../../../redux/Slice';
import Label from '../../../components/bootstrap/forms/Label';
import Option from '../../../components/bootstrap/Option';
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import { useNavigate, useParams } from 'react-router-dom';
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'
import Swal from 'sweetalert2'

const AssignPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, Loading, success, TicketNameList, token, EventNameList,AssignData } = useSelector((state) => state.festiv)
    const { uniqueId } = useParams()
	const { eventId } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(AssignEventName(token))
        dispatch(AssignTicketName(token))
        if(uniqueId && eventId){
            dispatch(getAssignSingle({ token, uniqueId, eventId }))
        }
    }, [token,uniqueId, eventId])


    const filteredTickets = TicketNameList.map(({ _id, ticketName }) => ({
        label: ticketName,
        value: _id,
    }));
    const filteredEvent = EventNameList.map(({ _id, eventName }) => ({
        label: eventName,
        value: _id,
    }));


    const [initialValues, setInitialValues] = useState({
        eventId: [],
        ticketId: []
    })

    useEffect(()=>{

        if(uniqueId && eventId){
    
            const filteredAssign = AssignData[0]?.tickets?.map(({ticketId} ) => (
                ticketId
            ))
    
            const convertedEvent = AssignData[0]?.event?.eventId
              
                console.log(convertedEvent);
                console.log("filteredAssign",filteredAssign);
    
            setInitialValues((prevState) => ({
                ...prevState,
                ticketId: filteredAssign,
                eventId: [convertedEvent]
            }));
        }
    
    },[AssignData])

    const Notification = (val,tit,pos,ico,btn) => {
		setIsLoading(false)
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		if (success) {
			navigate(-1)
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
		Loading ? setIsLoading(true) : setIsLoading(false)
	}, [error, success, Loading]);




    const validate = (values) => {
        const errors = {};
        if (values.eventId.length < 1) {
            errors.eventId = "Select at least one events.";
        } else if (new Set(values.eventId).size !== values?.eventId?.length) {
            errors.eventId = "Do not select the same event multiple times.";
        }
        if (values.ticketId.length < 1 ) {
            errors.ticketId = "Select at least one tickets.";
        } else if (new Set(values.ticketId).size !== values?.ticketId?.length) {
            errors.ticketId = "Do not select the same ticket multiple times.";
        }

        return errors;
    };


    const onSubmit = (values) => {

    
        if(uniqueId && eventId){
            const value = {
                ticketId:values.ticketId
            }
            console.log(value);
            dispatch(AddAndEditAssign({ token, value, uniqueId, eventId }))
        }else{
            dispatch(AddAndEditAssign({ token, values }))
        }
    }


    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader borderSize={1}>
                        <CardLabel icon='ListAlt' iconColor='info'>
                            <CardTitle>Assign Active Events To Active Tickets</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody className='assignList' >
                        <Formik initialValues={initialValues} validate={ eventId && uniqueId ? null : validate} onSubmit={onSubmit} enableReinitialize={true}>
                            {({ values, handleChange, handleBlur, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div>
                                                <Label className='fs-5'>Assign Active Event</Label>
                                                <FieldArray name="eventId">
                                                    {({ push, remove }) => (
                                                        <div>
                                                            {values.eventId?.map((eventId, index) => (
                                                                <div key={index} className='row d-flex align-items-center'>
                                                                    <div className="col-lg-6">
                                                                        <FormGroup className='locationSelect' >
                                                                            <Field as="select" name={`eventId[${index}]`} onBlur={handleBlur} className="select" onChange={handleChange}>
                                                                                <Option value="" label="Select an eventId" />
                                                                                {filteredEvent?.map((eventIdOption) => (
                                                                                    <Option key={eventIdOption.value} value={eventIdOption.value} label={eventIdOption.label} />
                                                                                ))}
                                                                            </Field>
                                                                            <ErrorMessage name='eventId' component="div" className="error" />
                                                                        </FormGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        {index > 0 && (
                                                                            <Button type="button" icon='Delete' size='lg' onClick={() => remove(index)}>

                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {
                                                                eventId && uniqueId ? null : <Button type="button"
                                                                color={'warning'}
                                                                className='mt-4 px-4 py-2 fs-5'
                                                                icon='Add'
                                                                onClick={() => push("")}
                                                                isDisable={values?.eventId?.length >= 10 }
                                                                >
                                                                Add Event
                                                            </Button>
                                                            }
                                                            
                                                        </div>
                                                    )}
                                                </FieldArray>

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div>
                                                <Label className='fs-5'>Assign Active Tickets</Label>
                                                <FieldArray name="ticketId">
                                                    {({ push, remove }) => (
                                                        <div>
                                                            {values.ticketId?.map((ticketId, index) => (
                                                                <div key={index} className='row d-flex align-items-center'>
                                                                    <div className="col-lg-6">
                                                                        <FormGroup className='locationSelect' >
                                                                            <Field as="select" name={`ticketId[${index}]`} className="select" onBlur={handleBlur} onChange={handleChange}>
                                                                                <Option value="" label="Select a ticketId" />
                                                                                {filteredTickets?.map((ticketIdOption) => (
                                                                                    <Option key={ticketIdOption.value} value={ticketIdOption.value} label={ticketIdOption.label} />
                                                                                ))}
                                                                            </Field>
                                                                            <ErrorMessage name='ticketId' component="div" className="error" />
                                                                        </FormGroup>
                                                                    </div>

                                                                    <div className="col-lg-6">
                                                                        { 
                                                                        
                                                                        eventId && uniqueId ?   (
                                                                            <Button type="button" icon='Delete' size='lg' onClick={() => remove(index)}>

                                                                            </Button>
                                                                        )
                                                                        :
                                                                        index > 0 && (
                                                                            <Button type="button" icon='Delete' size='lg' onClick={() => remove(index)}>

                                                                            </Button>
                                                                        )
                                                                    }
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <Button type="button"
                                                                color={'warning'}
                                                                className='mt-4 px-4 py-2 fs-5'
                                                                icon='Add'
                                                                isDisable={values?.ticketId?.length >= 10 }
                                                                onClick={() => push("")}>
                                                                Add Ticket
                                                            </Button>
                                                        </div>
                                                    )}
                                                </FieldArray>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end mx-3'>
                            <Button
                                type="submit"
                                className='w-20 py-3 px-3 my-3'
                                icon={isLoading ? undefined : 'Save'}
                                isLight
                                color={isLoading ? 'success' : 'info'}
                                                                  
                            >
                                {isLoading && <Spinner isSmall inButton />}
                                Save & Close
                            </Button>
                            <Button
                                className='w-20 py-3 px-3 my-3 mx-3'
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
                    </CardBody>
                </Card>
            </Page>

        </PageWrapper>
    )
}

export default AssignPage
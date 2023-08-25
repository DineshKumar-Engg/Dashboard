import React, { useState,useEffect } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import ScrollspyNav from '../../../components/bootstrap/ScrollspyNav';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, addAssign, errorMessage, eventList, getTicketLists, loadingStatus, successMessage } from '../../../redux/Slice';
import { Spinner } from 'react-bootstrap';
import showNotification from '../../../components/extras/showNotification';


const AssignTicketEvent = () => {

	const [Ticket, SetTicket] = useState([])
	const [Event, SetEvent] = useState([])
	const [TicketName, SetTicketName] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [Eventerror,setErrorEvent]=useState('')
	const [Ticketerror,setErrorTicket]=useState('')

	const dispatch = useDispatch()
	const {error,Loading,success,TicketNameList,token,EventNameList}=useSelector((state)=>state.festiv)

	useEffect(()=>{
		dispatch(AssignEventName(token))
		dispatch(AssignTicketName(token))
	},[token])


	const navigate = useNavigate()

	const handleSave = (val) => {
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
			
		);
		if(success){
			navigate('../assignEvents/assignList')
		}
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))
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
	  }, [error,success,Loading]);



	const filteredTickets = TicketNameList.map(({ _id, ticketName }) => ({
		label: ticketName,
		value: _id,
	  }));
	  const filteredEvent = EventNameList.map(({ _id, eventName }) => ({
		label: eventName,
		value: _id,
	  }));  

	  useEffect(()=>{
		if(Event?.value ==  undefined ){
			setErrorEvent('Please Select Events *')
		}
		else if(Event?.value !==  undefined ){
			setErrorEvent('')
		}
		if(Ticket?.length ==  0 ){
			setErrorTicket('Please Select Tickets *')
		}
		else if(Ticket?.length > 0  ){
			setErrorTicket('')
		}
	  },[Ticket,Event])

	  const handleSubmit=()=>{
		
		if(Eventerror == ''&& Ticketerror ==''){
			const values = {
				eventId:Event?.value,
				ticketId:Ticket,
				status: true
			}
				console.log(values);
			dispatch(addAssign({token,values}))
		}
	  }


	  const HandleSelect=(e)=>{
		SetTicket(Array.isArray(e) ? e.map(x => x.value) : []);
		SetTicketName(Array.isArray(e) ? e.map(x => x.label) : []) 
	  }
console.log(Ticket);

	return (
		<PageWrapper title={demoPagesMenu.assignEvents.subMenu.assign.text}>
			<Page>
				<Card>
				<CardHeader borderSize={1}>
					<CardLabel icon='ListAlt' iconColor='info'>
						<CardTitle>Assign Events - Tickets</CardTitle>
					</CardLabel>
					<CardActions>
							<Link to='/assignEvents/assignList'>
								<Button
									color='light'
									hoverShadow='none'
									icon='ArrowLeft'
								>
									Back
								
								</Button>
							</Link>
						</CardActions>
				</CardHeader>
					<CardBody className='assignList'  isScrollable>
						<div className='d-flex flex-column justify-content-between'>
						<div className="row mb-5">
							<div className="col-lg-6">
									<Select
									options={filteredEvent}
									value={Event}
									className="dropdownOption"
									placeholder="Select Event"
									onChange={(option)=>{SetEvent(option);}}
									/>
									{Eventerror && <p className='text-danger'>{Eventerror}</p> }
							</div>
							<div className="col-lg-6">
									<Select
									options={filteredTickets}
									value={filteredTickets.filter(obj => Ticket.includes(obj.value))}
									className="dropdownOption"
									placeholder="Select Tickets"
									onChange={(e) => HandleSelect(e)}
									isMulti
									isClearable
									/>
								{ Ticketerror && <p className='text-danger'>{Ticketerror}</p> }
							</div>
						</div>
						<div className="row">
						<div className="col-lg-6">
							{
								Event?.label?.length > 0 &&  (
									<Card>
								<CardBody>
								<p className='fs-5 px-3 py-2'>{Event?.label}</p>
								</CardBody>
							</Card>
								)
							}
							</div>

							<div className="col-lg-6">
							{
								TicketName?.length >0 && (
									<Card>
									<CardBody >
									{TicketName?.map((item,index)=>(
										<p key={index} className='fs-5 px-3 py-1'>{item}</p>
									))}
									</CardBody>
								</Card>
								)
							}
							
							</div>
						</div>
						</div>
					</CardBody>
					<CardFooterRight>
					<div className='text-end mx-3'>
												<Button
												    size='md'
													className='w-20 mx-3 my-3'
													icon={isLoading ? undefined : 'Save'}
													isDark
													color={isLoading ? 'success' : 'info'}
													isDisable={isLoading}
													onClick={handleSubmit}>
													{isLoading && <Spinner isSmall inButton />}
														Save 
												</Button>
						</div>
					</CardFooterRight>
				</Card>
			</Page>
			
		</PageWrapper>
	);
};
// py-3 px-3
export default AssignTicketEvent;



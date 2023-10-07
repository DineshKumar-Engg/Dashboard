import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
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
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, addAssign, errorMessage, eventList, getTicketLists, loadingStatus, successMessage } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'



const AssignTicketEvent = () => {

	const [Ticket, SetTicket] = useState([])
	const [Event, SetEvent] = useState([])
	const [EventName, SetEventName] = useState([])
	const [TicketName, SetTicketName] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [Eventerror, setErrorEvent] = useState('')
	const [Ticketerror, setErrorTicket] = useState('')

	const dispatch = useDispatch()
	const { error, Loading, success, TicketNameList, token, EventNameList } = useSelector((state) => state.festiv)

	useEffect(() => {
		dispatch(AssignEventName(token))
		dispatch(AssignTicketName(token))
	}, [token])


	const navigate = useNavigate()

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



	const filteredTickets = TicketNameList.map(({ _id, ticketName }) => ({
		label: ticketName,
		value: _id,
	}));
	const filteredEvent = EventNameList.map(({ _id, eventName }) => ({
		label: eventName,
		value: _id,
	}));

	useEffect(() => {
		if (Event?.length == 0) {
			setErrorEvent('Please Select Events *')
		}
		else if (Event?.length > 0) {
			setErrorEvent('')
		}
		if (Ticket?.length == 0) {
			setErrorTicket('Please Select Tickets *')
		}
		else if (Ticket?.length > 0) {
			setErrorTicket('')
		}
	}, [Ticket, Event])

	const handleSubmit = () => {

		if (Eventerror == '' && Ticketerror == '') {
			const values = {
				eventId: Event,
				ticketId: Ticket,
			}
			console.log(values);
			dispatch(addAssign({ token, values }))
		}
	}


	const HandleTicketSelect = (e) => {
		SetTicket(Array.isArray(e) ? e.map(x => x.value) : []);
		SetTicketName(Array.isArray(e) ? e.map(x => x.label) : [])
	}

	const HandleEventSelect = (e) => {


		SetEvent(Array.isArray(e) ? e.map(x => x.value) : []);
		SetEventName(Array.isArray(e) ? e.map(x => x.label) : [])
	}

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
					<CardBody className='assignList' isScrollable>
						<div className='d-flex flex-column justify-content-between'>
							<div className="row mb-5">
								<div className="col-lg-6">
									<Select
										options={filteredEvent}
										value={filteredEvent.filter(obj => Event.includes(obj.value))}
										className="dropdownOption"
										placeholder="Select Event"
										onChange={(e) => { HandleEventSelect(e) }}
										isMulti
										isClearable
									/>
									{Eventerror && <p className='text-danger'>{Eventerror}</p>}
								</div>
								<div className="col-lg-6">
									<Select
										options={filteredTickets}
										value={filteredTickets.filter(obj => Ticket.includes(obj.value))}
										className="dropdownOption"
										placeholder="Select Tickets"
										onChange={(e) => HandleTicketSelect(e)}
										isMulti
										isClearable
									/>
									{Ticketerror && <p className='text-danger'>{Ticketerror}</p>}
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									{
										Event?.length > 0 && (
											<Card>
												<CardBody>
													{
														EventName?.map((item, index) => (
															<p key={index} className='fs-5 px-3 py-1'>{item}</p>
														))
													}
													<p className='fs-5 px-3 py-2'>{Event?.label}</p>
												</CardBody>
											</Card>
										)
									}
								</div>

								<div className="col-lg-6">
									{
										TicketName?.length > 0 && (
											<Card>
												<CardBody >
													{TicketName?.map((item, index) => (
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

								className='w-20 py-3 px-3 my-3'
								icon={isLoading ? undefined : 'Save'}
								isLight
								color={isLoading ? 'success' : 'info'}
								isDisable={isLoading}
								onClick={handleSubmit}>
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
					</CardFooterRight>
				</Card>
			</Page>

		</PageWrapper>
	);
};

export default AssignTicketEvent;



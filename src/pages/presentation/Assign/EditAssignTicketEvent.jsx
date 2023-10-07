import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, EditAssign, addAssign, errorMessage, eventList, getAssignSingle, getTicketLists, loadingStatus, successMessage } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'

const EditAssignTicketEvent = () => {

	const { themeStatus } = useDarkMode();
	const { error, Loading, success, TicketNameList, token, EventNameList, AssignData } = useSelector((state) => state.festiv)

	const filteredAssign = AssignData[0]?.tickets?.map(({ ticketId, ticketname }) => ({
		label: ticketname,
		value: ticketId
	}))


	const convertedEvent = {
		label: AssignData[0]?.event?.eventName,
		value: AssignData[0]?.event?.eventId
	};



	console.log(filteredAssign);

	useEffect(() => {
		SetTicket(filteredAssign)
		SetEvent(convertedEvent)
		SetTicketName(filteredAssign)
	}, [AssignData])


	const [Ticket, SetTicket] = useState()
	const [Event, SetEvent] = useState()
	const [TicketName, SetTicketName] = useState()
	const [isLoading, setIsLoading] = useState(false)


	const dispatch = useDispatch()



	const { uniqueId } = useParams()
	const { eventId } = useParams()

	useEffect(() => {
		dispatch(AssignEventName(token))
		dispatch(AssignTicketName(token))
		dispatch(getAssignSingle({ token, uniqueId, eventId }))
	}, [token, eventId, uniqueId])


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

	const handleSubmit = () => {
		const values = {
			ticketId: Ticket.map((x) => x.value),
		}
		console.log(values);
		dispatch(EditAssign({ token, values, uniqueId, eventId }))
	}

	const handleSelect = (e) => {
		SetTicket(e);
	};

	const generateKey = (label, value) => `${label}-${value}`;

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
								<div className="col-lg-5 col-md-6 mt-3">
									<Select
										options={filteredEvent}
										value={Event}
										className="dropdownOption"
										placeholder="Select Event"
										onChange={(option) => { SetEvent(option) }}
										isDisabled={'true'}
									/>
									{/* {Eventerror && <p className='text-danger'>{Eventerror}</p> } */}
								</div>
								<div className="col-lg-5 col-md-6 mt-3">
									<Select
										options={filteredTickets.map((option) => ({
											...option,
											key: generateKey(option.label, option.value),
										}))}
										value={Ticket}
										className="dropdownOption"
										placeholder="Select Tickets"
										onChange={handleSelect}
										isMulti
										isClearable
									/>
									{/* { Ticketerror && <p className='text-danger'>{Ticketerror}</p> } */}
								</div>
							</div>
							<div className="row">
								<div className="col-lg-5">
									<Card>
										<CardBody>
											<p className='fs-5 px-3 py-2'>{Event?.label}</p>
										</CardBody>
									</Card>
								</div>
								<div className="col-lg-5">
									{
										Ticket?.length > 0 && (
											<Card>
												<CardBody >
													{Ticket?.map((item, index) => (
														<p key={index} className='fs-5 px-3 py-1'>{item?.label}</p>
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

export default EditAssignTicketEvent;



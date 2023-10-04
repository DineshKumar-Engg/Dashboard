import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, EditAssign, addAssign, errorMessage, eventList, getAssignSingle, getTicketLists, loadingStatus, successMessage } from '../../../redux/Slice';
import { Spinner } from 'react-bootstrap';
import showNotification from '../../../components/extras/showNotification';

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

	const handleSave = (val) => {
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,

		);
		if (success) {
			navigate('../assignEvents/assignList')
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))

	};




	useEffect(() => {

		error && handleSave(error)
		success && handleSave(success)
		if (Loading) {
			setIsLoading(true)
		}
		else {
			setIsLoading(false)
		}
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
								className='w-20 mx-3 my-3'
								icon={isLoading ? undefined : 'Save'}
								size='md'
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

export default EditAssignTicketEvent;



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
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { eventList, getTicketLists } from '../../../redux/Slice';

const AssignTicketEvent = () => {
	const [Ticket, SetTicket] = useState([])
	const [Event, SetEvent] = useState([])
	const [TicketName, SetTicketName] = useState([])

	const dispatch = useDispatch()
	const {TicketLists,token,EventList}=useSelector((state)=>state.festiv)

	useEffect(()=>{
		dispatch(eventList(token))
		dispatch(getTicketLists(token))
	},[token])

	const filteredTickets = TicketLists.map(({ _id, ticketName }) => ({
		label: ticketName,
		value: _id,
	  }));
	  const filteredEvent = EventList.map(({ _id, eventName }) => ({
		label: eventName,
		value: _id,
	  }));  
	//   const [selectedOption, setSelectedOption] = React.useState('');
	//    const handleChange = (option) => {
	// 	SetTicket(option);
  	// 	};



	  console.log(Event);

console.log(Ticket);
	return (
		<PageWrapper title={demoPagesMenu.assignEvents.subMenu.assign.text}>
			<Page>
				<Card>
				<CardHeader borderSize={1}>
					<CardLabel icon='ListAlt' iconColor='info'>
						<CardTitle>Assign Events - Tickets</CardTitle>
					</CardLabel>
				</CardHeader>
					<CardBody>
						<div className="row">
							<div className="col-lg-6">
							<Select
									options={filteredEvent}
									value={Event}
									className="dropdownOption"
									placeholder="Select Option"
									onChange={(option)=>{SetEvent(option);}}
									/>
							</div>
							<div className="col-lg-6">
									<Select
									options={filteredTickets}
									value={filteredTickets.filter(obj => Ticket.includes(obj.value))}
									className="dropdownOption"
									placeholder="Select Option"
									onChange={(e) => { SetTicket(Array.isArray(e) ? e.map(x => x.value) : []) }}
									isMulti
									isClearable
									/>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-6">
								{Event?.label}
							</div>
							<div className="col-lg-6">
								{Ticket?.map((item,index)=>(
									<p>{item}</p>
								))}
							</div>
						</div>
					</CardBody>
				</Card>
			</Page>
			
		</PageWrapper>
	);
};

export default AssignTicketEvent;



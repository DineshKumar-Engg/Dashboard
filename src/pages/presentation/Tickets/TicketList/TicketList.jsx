import React, { useEffect, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import { Link, useNavigate } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { AssignTicketName, AssignedTicketCategoryList, EventFilter, TicketCatFilter, errorMessage, getTicketDataLists, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../../components/bootstrap/Spinner';
import CommonTicketListRow from '../../../Common/CommonTicketListRow';
import TicketDetails from './TicketDetails';

import Icon from '../../../../components/icon/Icon';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import ResponsivePagination from 'react-responsive-pagination';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'


export const ModalTicket = ({ isOpen, setIsOpen, ids, status }) => {
	const { token,TicketNameList } = useSelector((state) => state.festiv)

	const dispatch = useDispatch()
	//    const { status } = useSelector((state) => state.festiv)

	useEffect(()=>{
		dispatch(AssignTicketName(token))
	},[])

const navigate = useNavigate()
	
	const [ticketname, SetTicketName] = useState("")

	const handleStatus = () => {
		//  dispatch(TicketstatusChange({statusChanges,ids,token}))
		// setIsOpen(false)
		navigate(`/duplicateTicket/${ticketname}`)
	}



	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' isCentered={true} isAnimation={true}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={ids} >New Ticket</ModalTitle>
				</ModalHeader>
				<ModalBody >
					<Row className='d-flex justify-content-around align-items-center'>
						<Col lg={6} className='mt-4'>
						<Link to='/newTicket'>
						<Button color='light'
								hoverShadow='none'
								icon='Add'>Add New Ticket</Button>
						</Link>
							
						</Col>
						<Col lg={6}>
							<div className='mb-1 fw-bold'>Duplicate Ticket</div>
							<div>
							<Select onChange={(e)=>SetTicketName(e.target.value)} placeholder='Select Ticket'>
							<Option value=""></Option>
								{
									TicketNameList?.map((item)=>(
										<Option value={item?._id}>{item?.ticketName}</Option>
									))
								}
							</Select>
							</div>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button isLight color='dark' icon='Send'
						onClick={handleStatus}
					>
						Confirm
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}

















const TicketList = () => {


	const { TicketLists, canva, Loading, success, totalTicketListPage, error, TicketCategoryId, token, EventFilterId, AssignTicketCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);


	const dispatch = useDispatch()

	const [AssignTicketCategory, setAssignTicketCategoryList] = useState('')
	const [year, setYear] = useState('')
	const [status, SetStatus] = useState('')


	const handleClearFilter = () => {
		dispatch(EventFilter({ EventId: '' }))
		dispatch(TicketCatFilter({ TicketCatFilterId: '' }))
		setAssignTicketCategoryList('')
		setYear('')
		SetStatus('')
		dispatch(getTicketDataLists({ token, currentPage, perPage }))
	}


	useEffect(() => {
		let apiParams = { token };

		if (EventFilterId) {
			apiParams.EventFilterId = EventFilterId;
		}
		else if (TicketCategoryId) {
			apiParams.TicketCategoryId = TicketCategoryId;
		}
		else if (AssignTicketCategory || year || status) {
			apiParams.AssignTicketCategory = AssignTicketCategory;
			apiParams.year = year;
			apiParams.status = status;
		}
		else {
			apiParams = { ...apiParams, currentPage, perPage };
		}
		dispatch(getTicketDataLists(apiParams));
		dispatch(AssignedTicketCategoryList(token));
		dispatch(AssignTicketName(token))
	}, [token, currentPage, perPage, EventFilterId, TicketCategoryId, AssignTicketCategory, year, status]);




	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		if (success) {
			dispatch(getTicketDataLists({ token, currentPage, perPage }))
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

	
	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
	}, [error, success, Loading]);



	const [modalShow, setModalShow] = React.useState(false);

	const handleNewTicket = () => {
		setModalShow(true);
	}


	return (
		<PageWrapper title={demoPagesMenu.ticketPages.subMenu.ticketLists.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='ListAlt' iconColor='info'>
							<CardTitle>Ticket-Details</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex align-item-center justify-content-center'>
								<div className='filterIcon'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div className='mx-4 SelectDesign'>

									<Select placeholder='Filter Category' value={AssignTicketCategory} onChange={(e) => setAssignTicketCategoryList(e.target.value)}>
										{
											AssignTicketCategoryList?.length > 0 ?
												(
													AssignTicketCategoryList.map((item, index) => (
														<Option key={index} value={item?.categoryName}>{item?.ticketCategory}</Option>
													))
												)
												:
												(
													<Option value=''>Please wait,Loading...</Option>
												)

										}
									</Select>
								</div>
								<div className='mx-4 SelectDesign'>
									<Select placeholder='Filter Year' value={year} onChange={(e) => setYear(e.target.value)}>
										<Option value='2023'>2023</Option>
										<Option value='2024'>2024</Option>
										<Option value='2025'>2025</Option>
										<Option value='2026'>2026</Option>
										<Option value='2027'>2027</Option>
									</Select>
								</div>
								<div className='mx-4 SelectDesign'>
									<Select placeholder='Filter Status' value={status} onChange={(e) => SetStatus(e.target.value)}>
										<Option value='true' className='text-success'>Active</Option>
										<Option value='false' className='text-danger'>Inactive</Option>
									</Select>
								</div>
								{
									AssignTicketCategory || year || status || EventFilterId || TicketCategoryId ?
										(
											<div className='cursor-pointer d-flex align-items-center ' onClick={handleClearFilter} >
												<Button
													color='info'
													hoverShadow='none'
													icon='Clear'
													isLight
												>
													Clear filters
												</Button>
											</div>
										)
										:
										null
								}
							</div>
						</CardActions>
						<CardActions>
							{/* <Link to='/newTicket'> */}
							<Button
								color='light'
								hoverShadow='none'
								icon='Add'
								onClick={handleNewTicket}
							>
								New Tickets
							</Button>
							{/* </Link> */}
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='text-center'>
										Tickets Name</th>
									<th scope='col' className='text-center'>
										Created Date
									</th>
									<th scope='col' className='text-center'>
										Ticket Category
									</th>
									<th scope='col' className='text-center'>
										Active status
									</th>
									<th scope='col' className='text-center'>
										Edit
									</th>
									<th scope='col' className='text-center'>
										Delete
									</th>
									<th scope='col' className='text-center'>
										Details
									</th>
								</tr>
							</thead>
							<tbody className='text-center'>
								{
									TicketLists?.length > 0 ?
										(
											TicketLists?.map((i) => (
												<CommonTicketListRow
													key={i._id}
													// {...i}
													item={i}

												/>
											))
										)
										:
										(
											<>

												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td>{Loading ? <Spinner color="dark" size="10" /> :
														<Button
															color='info'
															hoverShadow='none'
															icon='CancelPresentation'
															isDark
														>
															No data presents
														</Button>
													}</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</>

										)
								}
							</tbody>
						</table>
					</CardBody>
					{
						<ModalTicket
							setIsOpen={setModalShow}
							isOpen={modalShow}

						/>
					}
					<CardFooter>
						<CardFooterRight>
							<ResponsivePagination
								total={totalTicketListPage}
								current={currentPage}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</CardFooterRight>
					</CardFooter>
				</Card>

				{canva && <TicketDetails />}

			</Page>
		</PageWrapper>
	)
}

export default TicketList
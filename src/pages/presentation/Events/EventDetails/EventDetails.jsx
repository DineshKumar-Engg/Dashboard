import  { useEffect, useState } from 'react';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { CategoryFilter, EventFilter, LocationFilter, TicketFilter, assignedCategoryNameList, errorMessage, eventList, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonEventRow from '../../../Common/CommonEventRow';
import EventCanva from './EventCanva';
import showNotification from '../../../../components/extras/showNotification';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'



const EventDetails = () => {
	const { EventList, canva, Loading, success, token, TotalEventPage, error, LocationId, CategoryId, TicketFilterId, AssignedCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);


	const [AssignCategoryList, setAssignCategoryList] = useState('')
	const [year, setYear] = useState('')
	const [status, SetStatus] = useState('')

	const dispatch = useDispatch()

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
			dispatch(eventList({ token, currentPage, perPage }))
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
	}, [error, success]);


	useEffect(() => {
		if (TicketFilterId) {
			dispatch(eventList({ token, TicketFilterId }))
		}
		else if (CategoryId) {
			dispatch(eventList({ token, CategoryId }))
		}
		else if (LocationId) {
			dispatch(eventList({ token, LocationId }))
		}
		else {
			dispatch(eventList({ token, currentPage, perPage }))
		}
		dispatch(assignedCategoryNameList(token))
	}, [dispatch, currentPage, perPage])


	useEffect(() => {
		dispatch(eventList({ token, AssignCategoryList, year, status }))
	}, [AssignCategoryList, year, status])


	const handleClearFilter = () => {
		setAssignCategoryList('')
		setYear('')
		SetStatus('')
		dispatch(TicketFilter({ TicketId: "" }))
		dispatch(CategoryFilter({ CategoryFilterId: '' }))
		dispatch(LocationFilter({ LocationFilterId: '' }))
		dispatch(EventFilter({ EventId: '' }))
		dispatch(eventList({ token, currentPage, perPage }))
	}


	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.eventDetails.text}>
			<Page >
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='ListAlt' iconColor='info'>
							<CardTitle>Event-Details</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex align-item-center justify-content-center'>
								<div className='filterIcon'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div className='mx-4 SelectDesign'>

									<Select placeholder='Filter Category' value={AssignCategoryList} onChange={(e) => setAssignCategoryList(e.target.value)} ariaLabel='select category'>
										{
											AssignedCategoryList?.length > 0 ?
												(
													AssignedCategoryList.map((item, index) => (
														<Option key={index} value={item?.categoryName}>{item?.categoryName}</Option>
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
									<Select placeholder='Filter Year' value={year} onChange={(e) => setYear(e.target.value)} ariaLabel='select year'>
										<Option value='2023'>2023</Option>
										<Option value='2024'>2024</Option>
										<Option value='2025'>2025</Option>
										<Option value='2026'>2026</Option>
										<Option value='2027'>2027</Option>
									</Select>
								</div>
								<div className='mx-4 SelectDesign'>
									<Select placeholder='Filter Status' value={status} onChange={(e) => SetStatus(e.target.value)} ariaLabel='select status'>
										<Option value='true' className='text-success'>Active</Option>
										<Option value='false' className='text-danger'>Inactive</Option>
									</Select>
								</div>
								{
									AssignCategoryList || CategoryId || year || status || TicketFilterId || LocationId ? (
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
							<Link to='/newevent'>
								<Button
									color='light'
									hoverShadow='none'
									icon='Add'
								>
									Add New Events
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='text-center'>
										Event Name</th>
									<th scope='col' className='text-center'>
										Created Date
									</th>
									<th scope='col' className='text-center'>
										Event Category
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
							<tbody>
								{
									EventList?.length > 0 ?
										(
											EventList?.map((i) => (
												<CommonEventRow
													key={i._id}
													{...i}
													item={i}
												/>
											))
										)
										:
										(

											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													{Loading ? <Spinner color="dark" size="10" /> :
														<Button
															color='info'
															hoverShadow='none'
															icon='Cancel'
															
														>
															No Event List
														</Button>
													}
												</td>
												<td></td>
												<td></td>
												<td></td>
											</tr>
										)
								}
							</tbody>
						</table>
					</CardBody>
					<CardFooter>
						<CardFooterRight>
							<ResponsivePagination
								total={TotalEventPage}
								current={currentPage}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</CardFooterRight>
					</CardFooter>
				</Card>
				{canva && <EventCanva />}

			</Page>
		</PageWrapper>
	);
};

export default EventDetails;

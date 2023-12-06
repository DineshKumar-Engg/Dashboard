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

import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'
import { MultiSelect } from 'primereact/multiselect';
import Label from '../../../../components/bootstrap/forms/Label';
import { Years } from '../../Constant';

const EventDetails = () => {

	const { EventList, canva, Loading, success, token, TotalEventPage, error, LocationId, CategoryId, TicketFilterId, AssignedCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);


	const [AssignCategoryList, setAssignCategoryList] = useState('')
	const [year, setYear] = useState('')
	const [status, SetStatus] = useState('')

	const dispatch = useDispatch()

	const CategoryOption = AssignedCategoryList?.map(({_id,categoryName})=>({
		label:categoryName,
		value:_id
	}))



	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			
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

	console.log("true",AssignCategoryList.length == 0 );

	useEffect(() => {

		let apiParams = { token };

		if (TicketFilterId) {
			apiParams.TicketFilterId = TicketFilterId;
		}
		else if (CategoryId) {
			apiParams.CategoryId = CategoryId;
		}
		else if (LocationId) {
			apiParams.LocationId = LocationId;
		}
		else if(AssignCategoryList || year || status){
			apiParams.AssignCategoryList = AssignCategoryList;
			apiParams.year = year;
			apiParams.status = status;
		}
		else if(AssignCategoryList.length ==0 || year.length ==0 ){
			handleClearFilter()
		}
		dispatch(eventList(apiParams))
		dispatch(assignedCategoryNameList(token))
	}, [token, AssignCategoryList, year, status,TicketFilterId,CategoryId,LocationId,currentPage, perPage])




	

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.eventDetails.text}>
			<Page >
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='ListAlt' iconColor='info'>
							<CardTitle>Event-Details</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex gap-5  align-item-center justify-content-between'>
								<div className='mt-4'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div className='filterSelect'>
									<Label>Filter Category</Label>
									<MultiSelect value={AssignCategoryList} onChange={(e) => setAssignCategoryList(e.value)} options={CategoryOption} optionLabel="label" display="chip"
										placeholder="Filter Category" className='w-100' />
								</div>
								<div className='mx-2 filterSelect'>
									<Label>Filter Year</Label>
									<MultiSelect value={year} onChange={(e) => setYear(e.value)} options={Years} optionLabel="label" display="chip"
										placeholder="Filter Year" className='w-100' />
								</div>
								<div className='mx-2 SelectDesign'>
									<Label>Filter Status</Label>
									<Select placeholder='Filter Status' value={status} onChange={(e) => SetStatus(e.target.value)} ariaLabel='select status'>
										<Option value='' className='text-primary'>All</Option>
										<Option value='true' className='text-success'>Active</Option>
										<Option value='false' className='text-danger'>Inactive</Option>
									</Select>
								</div>
								<div className='cursor-pointer mt-4 d-flex align-items-center ' onClick={handleClearFilter} >

								{
									AssignCategoryList.length >0  || CategoryId || year.length >0 || status || TicketFilterId || LocationId ? (
											<Button
												color='info'
												hoverShadow='none'
												icon='Clear'
												isLight
											>
												Clear filters
											</Button>
										
									)
									:
									null
										
								}
								</div>
							</div>
						</CardActions>
						<CardActions>
							<Link to='/event'>
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

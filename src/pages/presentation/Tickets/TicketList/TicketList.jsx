import React, { useEffect, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import PaginationButtons, {
	dataPagination,
} from '../../../../components/PaginationButtons';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { AssignedTicketCategoryList, EventFilter, TicketCatFilter, errorMessage, getTicketDataLists, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonTicketListRow from '../../../Common/CommonTicketListRow';
import TicketDetails from './TicketDetails';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';


const TicketList = () => {


	const { TicketLists, canva, Loading, success, error,TicketCategoryId, token,EventFilterId, AssignTicketCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const onCurrentPageItems = dataPagination(TicketLists, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const dispatch = useDispatch()

	const [AssignTicketCategory, setAssignTicketCategoryList] = useState('')
	const [year, setYear] = useState('')
	const [status, SetStatus] = useState('')


	const handleClearFilter=()=>{
		dispatch(EventFilter({EventId:''}))
		dispatch(TicketCatFilter({TicketCatFilterId:''}))
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
	}, [token, currentPage, perPage, EventFilterId, TicketCategoryId, AssignTicketCategory, year, status]);


	const handleSave = (val) => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
		if (success) {
			dispatch(getTicketDataLists({ token, currentPage, perPage }))
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))
	};


	useEffect(() => {
		error && handleSave(error)
		success && handleSave(success)
	}, [success, error])




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
							<Link to='/newTicket'>
								<Button
									color='light'
									hoverShadow='none'
									icon='Add'
								>
									Add New Tickets
								</Button>
							</Link>
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
											onCurrentPageItems?.map((i) => (
												<CommonTicketListRow
													key={i._id}
													// {...i}
													item={i}
													selectName='selectedList'
													selectOnChange={selectTable.handleChange}
													selectChecked={selectTable.values.selectedList.includes(
														// @ts-ignore
														// i.id.toString(),
													)}
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
					<PaginationButtons
						data={TicketLists}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>

				{canva && <TicketDetails />}

			</Page>
		</PageWrapper>
	)
}

export default TicketList
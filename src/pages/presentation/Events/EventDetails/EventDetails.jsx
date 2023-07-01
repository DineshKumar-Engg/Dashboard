import React, { useEffect, useState } from 'react';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Popovers from '../../../../components/bootstrap/Popovers';
import { demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { assignedCategoryNameList, errorMessage, eventList, loadingStatus, successMessage } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from '../Location/TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonEventRow from '../../../Common/CommonEventRow';
import EventCanva from './EventCanva';
import showNotification from '../../../../components/extras/showNotification';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';




const EventDetails = () => {
	const { EventList, canva, Loading, success, token, error, AssignedCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const onCurrentPageItems = dataPagination(EventList, currentPage, perPage);


	const [AssignCategoryList, setAssignCategoryList] = useState('')
	const [year, setYear] = useState('')
	const [status, SetStatus] = useState('')

	const dispatch = useDispatch()

	const handleSave = (val) => {
		// setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
		if (success) {
			dispatch(eventList({ token, currentPage, perPage }))
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))
	};

	useEffect(() => {
		error && handleSave(error)
		success && handleSave(success)
	}, [success, error])

	useEffect(() => {
		dispatch(eventList({ token, currentPage, perPage }))
		dispatch(assignedCategoryNameList(token))
	}, [dispatch, currentPage, perPage])

	console.log(AssignedCategoryList);

	useEffect(() => {
		dispatch(eventList({ token, AssignCategoryList, year, status }))
	}, [AssignCategoryList, year, status])



	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.eventDetails.text}>
			<Page>
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

									<Select placeholder='Filter Category' onChange={(e) => setAssignCategoryList(e.target.value)}>
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
									<Select placeholder='Filter Year' onChange={(e) => setYear(e.target.value)}>
										<Option value='2023'>2023</Option>
										<Option value='2024'>2024</Option>
										<Option value='2025'>2025</Option>
										<Option value='2026'>2026</Option>
										<Option value='2027'>2027</Option>
									</Select>
								</div>
								<div className='mx-4 SelectDesign'>
									<Select placeholder='Filter Status' onChange={(e) => SetStatus(e.target.value)}>
										<Option value='true' className='text-success'>Active</Option>
										<Option value='false' className='text-danger'>Un-Active</Option>
									</Select>
								</div>
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
											onCurrentPageItems?.map((i) => (
												<CommonEventRow
													key={i._id}
													{...i}
													item={i}
													selectName='selectedList'
													selectOnChange={selectTable.handleChange}
													selectChecked={selectTable.values.selectedList.includes(
													)}
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
															icon='CancelPresentation'
															isDark
														>
															No data presents
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
					<PaginationButtons
						data={EventList}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>

				{canva && <EventCanva />}

			</Page>
		</PageWrapper>
	);
};

export default EventDetails;

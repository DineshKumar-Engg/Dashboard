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
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { CategoryFilter, EventFilter, LocationFilter, TicketFilter, assignedCategoryNameList, errorMessage, eventList, loadingStatus, successMessage } from '../../../../redux/Slice';
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
import ResponsivePagination from 'react-responsive-pagination';




const EventDetails = () => {
	const { EventList, canva, Loading, success, token,TotalEventPage, error,LocationId,CategoryId,TicketFilterId, AssignedCategoryList } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	// const onCurrentPageItems = dataPagination(EventList, currentPage, perPage);


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


	console.log(CategoryId);
	console.log(LocationId);


	useEffect(() => {
		if(TicketFilterId){
			dispatch(eventList({ token,TicketFilterId  }))
		}
		else if(CategoryId){
			dispatch(eventList({ token,CategoryId}))
		}
		else if(LocationId){
			dispatch(eventList({ token,LocationId}))
		}
		else{
			dispatch(eventList({ token, currentPage, perPage }))
		}
		dispatch(assignedCategoryNameList(token))
	}, [dispatch, currentPage, perPage])


	useEffect(() => {
		dispatch(eventList({ token, AssignCategoryList, year, status }))
	}, [AssignCategoryList, year, status])

	const handleClearFilter=()=>{
		setAssignCategoryList('')
		setYear('')
		SetStatus('')
		dispatch(TicketFilter({TicketId:""}))
		dispatch(CategoryFilter({CategoryFilterId:''}))
		dispatch(LocationFilter({LocationFilterId:''}))
		dispatch(EventFilter({EventId:''}))
		dispatch(eventList({ token, currentPage, perPage }))
	}

	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

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
													// selectName='selectedList'
													// selectOnChange={selectTable.handleChange}
													// selectChecked={selectTable.values.selectedList.includes(
													// )}
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
					<CardFooter>
						<CardFooterRight>
						<ResponsivePagination
        total={TotalEventPage}
        current={currentPage}
        onPageChange={(page)=>setCurrentPage(page)}
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
{/* <div className="col-lg-12">
                            <Card
                                stretch
                                shadow='sm'
                                className={`bg-l${darkModeStatus ? 'o25' : '25'
                                    }-success rounded-2`}>
                                <CardHeader className='bg-transparent'>
                                    <CardLabel>
                                        <CardTitle tag='h4' className='h5'>
                                            Fees Structure
                                        </CardTitle>
                                    </CardLabel>
                                </CardHeader>
                                <CardBody className='py-0'>
                                    <div className="row py-2">
                                        <div className="col-lg-12">

                                            <div className="row d-flex">
                                                <div className='d-flex mt-3 flex-wrap'>
                                                    {
                                                        TicketDetails?.FeesStructure?.length > 0 ?

                                                            (
                                                                TicketDetails?.FeesStructure[0]?.ticket?.map((item, index) => (
                                                                    <>
                                                                            <div className="col-lg-12">
                                                                            <Label className='fs-5'>Ticket Type</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.ticketType}</p>
                                                                            </div>                                                                        
                                                                            <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Ticket Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.ticketPrice?.type == "USD" ? "$" : "%"}{" "}{item?.ticketPrice?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Credit Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.creditCardFees?.type == "USD" ? "$" : "%"}{" "}{item?.creditCardFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Processing Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.processingFees?.type == "USD" ? "$" : "%"}{" "}{item?.processingFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Merchandise Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.merchandiseFees?.type == "USD" ? "$" : "%"}{" "}{item?.merchandiseFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Other Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.otherFees?.type == "USD" ? "$" : "%"}{" "}{item?.otherFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Sales Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.salesTax?.type == "Percentage" ? "%" : ""}{" "}{item?.salesTax?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 mt-3">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Total Ticket Price </Label>
                                                                                <p className='px-2 my-1 fs-5'>$ {" "}{item?.totalTicketPrice}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))
                                                            ) :
                                                            (
                                                                <h5>No Fees Structure Data </h5>
                                                            )

                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </div> */}
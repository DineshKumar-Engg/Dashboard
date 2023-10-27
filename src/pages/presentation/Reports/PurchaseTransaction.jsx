import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import validate from '../Validator/editPagesValidate';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Input from '../../../components/bootstrap/forms/Input';
import { Col, Container, Row } from 'react-bootstrap';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, FilterList, GetTicketCategoryData, PurchaseReport, TicketTypes, assignedCategoryNameList, getCategoryNameList, getLocationNameList } from '../../../redux/Slice';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import Spinner from '../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import * as XLSX from 'xlsx';
import { MultiSelect } from 'primereact/multiselect';
import Label from '../../../components/bootstrap/forms/Label';

// import {
// 	CategoryOption,
// 	LocationOption,
// 	EventOption,
// 	TicketCategoryOption,
// 	TicketOption,
// 	TicketTypeOption
//   } from '../Constant';


const PurchaseTransaction = () => {

	const {FilterDataList, PurchaseReportList, totalPurchasePage, Loading, success, TicketType, token, CategoryNameList, LocationNameList, TicketCategoryData, EventNameList, TicketNameList, } = useSelector((state) => state.festiv)



	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(50);

	const [CategroyId, SetCategoryId] = useState('')
	const [LocationId, SetLocationId] = useState('')
	const [TicketCategoryId, SetTicketCategoryId] = useState('')
	const [EventNameId, SetEventNameId] = useState('')
	const [TicketNameId, SetTicketNameId] = useState('')
	const [TicketTypeId, SetTicketTypeId] = useState('')
	const [EmailId, SetEmail] = useState('')
	const [OrderId, SetOrderId] = useState('')
	const [dateRange, setDateRange] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection'
		}
	]);
	const [date, setdate] = useState('');



	useEffect(() => {
		let apiParams = {token}
		if (CategroyId || LocationId || TicketCategoryId || EventNameId || TicketNameId ) {
			apiParams = {
				...apiParams,
				CategroyId,
				LocationId,
				TicketCategoryId,
				EventNameId,
				TicketNameId,
			};
		}
		console.log("apiParams",apiParams);
		
		dispatch(FilterList(apiParams))
		dispatch(TicketTypes(token))
	}, [token,CategroyId, LocationId, TicketCategoryId, EventNameId,TicketNameId])



	const CategoryOption = FilterDataList?.eventCategoryDetails?.map(({eventCategoryId,eventCategoryName})=>({
		label:eventCategoryName,
		value:eventCategoryId
	}))

	const LocationOption = FilterDataList?.eventLocationDetails?.map(({eventLocationId,eventLocationName})=>({
		label:eventLocationName,
		value:eventLocationId
	}))

	const EventOption = FilterDataList?.eventDetails?.map(({eventId,eventName})=>({
		label:eventName,
		value:eventId
	}))

	const TicketCategoryOption = FilterDataList?.ticketCategoryDetails?.map(({ticketCategoryId,ticketCategoryName})=>({
		label:ticketCategoryName,
		value:ticketCategoryId
	}))

	const TicketOption = FilterDataList?.ticketDetails?.map(({ticketId,ticketName})=>({
		label:ticketName,
		value:ticketId
	}))

	const TicketTypeOption = TicketType?.map(({_id,ticketType})=>({
		label:ticketType,
		value:_id
	}))





	const handleSelect = (ranges) => {

		setDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setdate(formattedRange);
		}
	};

	



	const handleClearFilter = () => {
		SetCategoryId('')
		SetLocationId('')
		SetTicketCategoryId('')
		SetEventNameId('')
		SetTicketNameId('')
		SetEmail('')
		SetOrderId('')
		setdate('')
		SetTicketTypeId('')
		setDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection'
			}
		])
		dispatch(PurchaseReport({ token, currentPage, perPage }))
	}


	useEffect(() => {

		let apiParams = { token, currentPage, perPage }

		if (CategroyId || LocationId || TicketCategoryId || EventNameId || TicketNameId || EmailId || OrderId || date || TicketTypeId) {
			apiParams = {
				...apiParams,
				CategroyId,
				LocationId,
				TicketCategoryId,
				EventNameId,
				TicketNameId,
				EmailId,
				OrderId,
				date,
				TicketTypeId
			};
		}

		dispatch(PurchaseReport(apiParams))

	}, [currentPage, perPage, CategroyId, LocationId, TicketCategoryId, EventNameId, TicketNameId, EmailId, OrderId, date, TicketTypeId])


	const DownloadExcel = () => {
		const formattedData = PurchaseReportList?.map(item => {

			return {
				"Order Number": item?.orderId,
				"Purchase Date": item?.transanctionDate,
				"Email": item?.email,
				"Event Category": item?.eventCategoryName,
				"Event Name": item?.eventName,
				"Ticket Category": item?.ticketcategoryName,
				"Ticket Name": item?.ticketName,
				"Ticket Type": item?.ticketTypeName,
				"Ticket Price $ Per person": `$ ${item?.ticketPricePerperson.toFixed(2)}` ,
				"Credit Fees $ per ticket":`$ ${item?.creditCardFeesPerTicket.toFixed(2)}`,
				"Processing Fees  $ per ticket":`$ ${item?.processingFeesPerTicket.toFixed(2)}`,
				"Merchandise Fees  $ per ticket":`$ ${item?.merchandiseFeesPerTicket.toFixed(2)}`,
				"Other Fees  $ per ticket":`$ ${item?.otherFeesPerTicket.toFixed(2)}`,
				"Total Fees $ per ticket":`$ ${item?.totalFeesPerTicket.toFixed(2)}`,
				"Sales Tax ( % ) per ticket":`% ${item?.salesTaxPerTicket.toFixed(3)}`,
				"Sales Tax  $ per ticket":`$ ${item?.salesTaxPerTicketDollar.toFixed(3)}`,
				"Gross Amount $ per ticket":`$ ${item?.totalTicketPricePerTicket.toFixed(2)}`,
				"Ticket Quantity": item?.quantity,
				"Ticket Price": `$ ${item?.ticketPrice.toFixed(2)}`,
				"Total Credit Fees": `$ ${item?.creditCardFeesDollar.toFixed(2)}`,
				"Total Processing Fees": `$ ${item?.processingFeesDollar.toFixed(2)}`,
				"Total Merchandise Fees": `$ ${item?.merchandiseFeesDollar.toFixed(2)}`,
				"Total Other Fees": `$ ${item?.otherFeesDollar.toFixed(2)}`,
				"Total Fees ( $ )": `$ ${item?.totalFees.toFixed(2)}`,
				"Total Sales Tax amt": `$ ${item?.salesTaxDollar.toFixed(3)}`,
				"Total Purchase Amount": `$ ${item?.totalTicketPrice.toFixed(2)}`
			}
		})
		const ws = XLSX.utils.json_to_sheet(formattedData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Purchase-Report');
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
		const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'Festiv Spark Purchase Report.xlsx';
		a.click();
		URL.revokeObjectURL(url);
	}

	return (
		<PageWrapper title={demoPagesMenu.reports.subMenu.purchaseTransaction.text}>
			<Page container='fluid'>
				<Card stretch data-tour='list purchasemain'>
					<CardHeader>
						<CardLabel icon='DataExploration' iconColor='warning'>
							<CardTitle>Purchase Transaction</CardTitle>
						</CardLabel>

						<CardActions>
							<Dropdown>
								<DropdownToggle>
									<Button color='info' icon='Compare' isLight>
										Export{' '}
										<strong>
											{Number(dayjs().format('YYYY'))}
										</strong>

									</Button>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd size='sm'>
									<DropdownItem>
										<Button
											icon='MenuBook'
											onClick={DownloadExcel}
										>
											EXCEL
										</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</CardActions>
					</CardHeader>
					<CardHeader>
							<Container fluid >
								<Row className='purchaseFilter'>
										<Col lg={2} md={4} className='py-2'>
											<Label>Event Category</Label>
											<MultiSelect value={CategroyId} onChange={(e) =>SetCategoryId(e.value)} options={CategoryOption} optionLabel="label" display="chip" 
												placeholder="Select Category"  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Event Location</Label>
											<MultiSelect value={LocationId} onChange={(e) =>SetLocationId(e.value)} options={LocationOption} optionLabel="label" display="chip" 
												placeholder="Select Location"  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Event</Label>
											<MultiSelect value={EventNameId} onChange={(e) =>SetEventNameId(e.value)} options={EventOption} optionLabel="label" display="chip" 
												placeholder="Select Event"  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Ticket Category</Label>
											<MultiSelect value={TicketCategoryId} onChange={(e) =>SetTicketCategoryId(e.value)} options={TicketCategoryOption} optionLabel="label" display="chip" 
												placeholder="Select Ticket Catefory"  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Ticket</Label>
											<MultiSelect value={TicketNameId} onChange={(e) =>SetTicketNameId(e.value)} options={TicketOption} optionLabel="label" display="chip" 
												placeholder="Select Ticket"  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Ticket Type</Label>
											<MultiSelect value={TicketTypeId} onChange={(e) =>SetTicketTypeId(e.value)} options={TicketTypeOption} optionLabel="label" display="chip" 
												placeholder="Select Type" maxSelectedLabels={3} className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Purchase Date</Label>
										<div >
											<Dropdown>
												<DropdownToggle>
													<Button icon='DateRange' color='dark' isLight>
														Purchase Date{' '}
														<strong>
															{Number(dayjs().format('YYYY'))}
														</strong>
													</Button>
												</DropdownToggle>
												<DropdownMenu>
													<DateRange
														ranges={dateRange}
														onChange={handleSelect}
													/>
												</DropdownMenu>
											</Dropdown>
										</div>
										</Col>
										<Col lg={3} md={4} className='py-2'>
											<Label>Search Ticket Email</Label>
										<div className='SelectDesign'>
											<Input type={'search'} value={EmailId} className='my-0' placeholder='Search Ticket Email' onChange={(e) => { SetEmail(e.target.value) }}></Input>
										</div>
										</Col>
										<Col lg={3} md={4} className='py-2'>
											<Label>Search Ticket OrderNo</Label>
										<div className='SelectDesign'>
											<Input type={'search'} value={OrderId} className='my-0' placeholder='Search Order Number' onChange={(e) => { SetOrderId(e.target.value) }}></Input>
										</div>
										</Col>
										<Col lg={2} md={4} className='mt-3'>
										{
											CategroyId || LocationId || EventNameId || TicketCategoryId || TicketNameId || EmailId || OrderId || date || TicketTypeId ? (
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
										</Col>
									</Row>
							</Container>
					</CardHeader>
					<CardBody className='table-responsive  purchaseTable' isScrollable >
							<table className='table table-modern  table-hover'>
								<thead>
									<tr>
										<th scope='col' className='text-center'>
											Order No</th>
										<th scope='col' className='text-center'>
											Purchase Date
										</th>
										<th scope='col' className='text-center'>
											Customer Email
										</th>
										<th scope='col' className='text-center'>
											Event Category
										</th>
										<th scope='col' className='text-center'>
											Event Location
										</th>
										<th scope='col' className='text-center'>
											Event Name
										</th>
										<th scope='col' className='text-center'>
											Ticket Category
										</th>
										<th scope='col' className='text-center'>
											Ticket Name
										</th>
										<th scope='col' className='text-center'>
											Ticket Type
										</th>
										<th scope='col' className='text-center'>
											Ticket Quantity
										</th>
										<th scope='col' className='text-center'>
											Ticket Price
										</th>
										<th scope='col' className='text-center'>
											Credit Fees
										</th>
										<th scope='col' className='text-center'>
											Processing Fees
										</th>
										<th scope='col' className='text-center'>
											Merchandise Fees
										</th>
										<th scope='col' className='text-center'>
											Other Fees
										</th>
										<th scope='col' className='text-center'>
											Total Fees
										</th>
										<th scope='col' className='text-center'>
											Ticket Sales Tax
										</th>
										<th scope='col' className='text-center'>
											Gross Amount
										</th>
									</tr>
								</thead>
								<tbody>
									{
										PurchaseReportList?.length > 0 ?
											(
												PurchaseReportList?.map((item, index) => (
													<>
														<tr key={index}>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.orderId}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.transanctionDate}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.email}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventCategoryName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventLocationName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.ticketcategoryName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.ticketName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.ticketTypeName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.quantity}
																</span>
															</td>
															<td scope='col' className='text-center'>
															
																<span className='h6'>
																	$ {item?.ticketPrice.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
															
																<span className='h6'>
																	$ {item?.creditCardFeesDollar.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.processingFeesDollar.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.merchandiseFeesDollar.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.otherFeesDollar.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	$ {item?.totalFees.toFixed(2)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	$ {item?.salesTaxDollar.toFixed(3)}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	$ {item?.totalTicketPrice.toFixed(2)}
																</span>
															</td>
														</tr>
													</>
												))
											)
											:
											(
												<tr className='purchaseLoadingTable'>
													<td></td>
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
																No Purchase Transaction
															</Button>
														}
													</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											)
									}
								</tbody>
							</table>
					</CardBody>
					<CardFooterRight>
						<ResponsivePagination
							total={totalPurchasePage}
							current={currentPage}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</CardFooterRight>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default PurchaseTransaction;

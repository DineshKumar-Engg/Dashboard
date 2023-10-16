import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import Page from '../../../layout/Page/Page';
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
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, FilterList, GetTicketCategoryData, PurchaseReport, TicketSalesList, TicketTypes, assignedCategoryNameList, getCategoryNameList, getLocationNameList } from '../../../redux/Slice';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import Spinner from '../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import * as XLSX from 'xlsx';
import { MultiSelect } from 'primereact/multiselect';
import Label from '../../../components/bootstrap/forms/Label';

const TicketSalesReport = () => {


	const { TicketSalesReportList, totalSalesPage,FilterDataList, Loading, success, TicketType, token, CategoryNameList, LocationNameList, TicketCategoryData, EventNameList, TicketNameList, } = useSelector((state) => state.festiv)


	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [CategroyId, SetCategoryId] = useState('')
	const [LocationId, SetLocationId] = useState('')
	const [TicketCategoryId, SetTicketCategoryId] = useState('')
	const [EventNameId, SetEventNameId] = useState('')
	const [TicketNameId, SetTicketNameId] = useState('')
	const [TicketTypeId, SetTicketTypeId] = useState('')
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



	useEffect(() => {

		let apiParams = { token, currentPage, perPage }

		if (CategroyId || LocationId || TicketCategoryId || EventNameId || TicketNameId || date || TicketTypeId) {
			apiParams = {
				...apiParams,
				CategroyId,
				LocationId,
				TicketCategoryId,
				EventNameId,
				TicketNameId,
				date,
				TicketTypeId
			};
		}

		dispatch(TicketSalesList(apiParams))

	}, [currentPage, perPage, CategroyId, LocationId, TicketCategoryId, EventNameId, TicketNameId, date, TicketTypeId])


	const handleClearFilter = () => {
		SetCategoryId('')
		SetLocationId('')
		SetTicketCategoryId('')
		SetEventNameId('')
		SetTicketNameId('')
		setdate('')
		SetTicketTypeId('')
		setDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection'
			}
		])
		dispatch(TicketSalesList({ token, currentPage, perPage }))
	}

	const handleSelect = (ranges) => {

		setDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setdate(formattedRange);
		}
	};




	const DownloadExcel = () => {
		const formattedData = TicketSalesReportList?.map(item => {

			
			

			return {
				"Purchase Date": item?.transanctionDate,
				"Event Category": item?.eventCategoryName,
				"Event Location": item?.eventLocationName,
				"Event Name": item?.eventName,
				"Ticket Category": item?.ticketcategoryName,
				"Ticket Name": item?.ticketName,
				"Ticket Type": item?.ticketTypeName,
				"Ticket Price $ Per person": `$ ${item?.ticketPricePerperson}`,
				"Credit Fees $ per ticket":`$ ${item?.creditCardFeesPerTicket}`,
				"Processing Fees  $ per ticket":`$ ${item?.processingFeesPerTicket}`,
				"Merchandise Fees  $ per ticket":`$ ${item?.merchandiseFeesPerTicket}`,
				"Other Fees  $ per ticket":`$ ${item?.otherFeesPerTicket}`,
				"Total Fees $ per ticket":`$ ${item?.totalFeesPerTicket}`,
				"Sales Tax ( % ) per ticket":`% ${item?.salesTaxPerTicket}`,
				"Sales Tax  $ per ticket":`$ ${item?.salesTaxPerTicketDollar}`,
				"Gross Amount $ per ticket":`$ ${item?.totalTicketPricePerTicket}`,
				"Ticket Quantity": item?.quantity,
				"Ticket Price": `$ ${item?.ticketPrice}`,
				"Total Credit Fees": `$ ${item?.creditCardFeesDollar}`,
				"Total Processing Fees": `$ ${item?.processingFeesDollar}`,
				"Total Merchandise Fees": `$ ${item?.merchandiseFeesDollar}`,
				"Total Other Fees": `$ ${item?.otherFeesDollar}`,
				"Total Fees ( $ )": `$ ${item?.totalFees}`,
				"Total Sales Tax amt": `$ ${item?.salesTaxDollar}`,
				"Total Purchase Amount": `$ ${item?.totalTicketPrice}`
			}
		})
		const ws = XLSX.utils.json_to_sheet(formattedData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sales-Report');
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
		const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'Festiv Spark Sales Report.xlsx';
		a.click();
		URL.revokeObjectURL(url);
	}




	return (
		<PageWrapper title={demoPagesMenu.reports.subMenu.ticketSalesReport.text}>
			<Page container='fluid'>
				<Card stretch data-tour='list purchasemain'>
					<CardHeader>
						<CardLabel icon='Assessment' iconColor='warning'>
							<CardTitle>Sales Report</CardTitle>
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

						<div>
							<Container fluid>
								<Row>

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
												placeholder="Select "  className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Ticket Type</Label>
											<MultiSelect value={TicketTypeId} onChange={(e) =>SetTicketTypeId(e.value)} options={TicketTypeOption} optionLabel="label" display="chip" 
												placeholder="Select Location" maxSelectedLabels={3} className='w-100' />
										</Col>
									<div className='purchaseFilter'>
										<div className='my-4 '>
											<Dropdown>
												<DropdownToggle>
													<Button icon='DateRange' color='dark' isLight>
														Sales Date{' '}
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
										{
											CategroyId || LocationId || EventNameId || TicketCategoryId || TicketNameId || date || TicketTypeId ? (
												<div className='cursor-pointer d-flex align-items-center mx-2' onClick={handleClearFilter} >
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
								</Row>
							</Container>
						</div>
					</CardHeader>
					<CardBody className='table-responsive purchaseTable' isScrollable >
							<table className='table table-modern  table-hover'>
								<thead>
									<tr>

										<th scope='col' className='text-center'>
											Purchase Date
										</th>

										<th scope='col' className='text-center'>
											Event Categroy
										</th>
										<th scope='col' className='text-center'>
											Event Name
										</th>
										<th scope='col' className='text-center'>
											Event Location
										</th>
										<th scope='col' className='text-center'>
											Ticket Categroy
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
											Credit Card Fees
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
										TicketSalesReportList?.length > 0 ?
											(
												TicketSalesReportList?.map((item,index) => (
													<>
														<tr key={index}>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.transanctionDate}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventCategoryName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventName}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.eventLocationName}
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
																	$ {item?.ticketPrice}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.creditCardFeesDollar}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.processingFeesDollar}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.merchandiseFeesDollar}
																</span>
															</td>
															<td scope='col' className='text-center'>
																
																<span className='h6'>
																	$ {item?.otherFeesDollar}
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
																No Sales Report
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
							total={totalSalesPage}
							current={currentPage}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</CardFooterRight>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TicketSalesReport;

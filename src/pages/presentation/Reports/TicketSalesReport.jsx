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
import { Container, Row } from 'react-bootstrap';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, GetTicketCategoryData, PurchaseReport, TicketSalesList, TicketTypes, assignedCategoryNameList, getCategoryNameList, getLocationNameList } from '../../../redux/Slice';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import Spinner from '../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import * as XLSX from 'xlsx';


const TicketSalesReport = () => {


	const { TicketSalesReportList, totalSalesPage, Loading, success, TicketType, token, CategoryNameList, LocationNameList, TicketCategoryData, EventNameList, TicketNameList, } = useSelector((state) => state.festiv)


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


	const handleSelect = (ranges) => {

		setDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setdate(formattedRange);
		}
	};


	useEffect(() => {
		dispatch(getCategoryNameList(token))
		dispatch(getLocationNameList(token))
		dispatch(GetTicketCategoryData(token))
		dispatch(AssignTicketName(token))
		dispatch(AssignEventName(token))
		dispatch(TicketTypes(token))
	}, [token])

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


	const DownloadExcel = () => {
		const formattedData = TicketSalesReportList?.map(item => {

			
			const creditCardFeesSymbol = item?.creditCardFeesType === "USD" ? "$" : "%";
			 const processingFeesSymbol = item?.processingFeesType === "USD" ? "$" : "%";
			 const merchandiseFeesSymbol = item?.merchandiseFeesType === "USD" ? "$" : "%";
			 const otherFeesSymbol = item?.otherFeesType === "USD" ? "$" : "%";

			return {
				"Purchase Date": item?.transanctionDate,
				"Event Category": item?.eventCategoryName,
				"Event Name": item?.eventName,
				"Event Location": item?.eventLocationName,
				"Ticket Category": item?.ticketcategoryName,
				"Ticket Name": item?.ticketName,
				"Ticket Type": item?.ticketTypeName,
				"Ticket Quantity": item?.quantity,
				"Ticket Price": item?.ticketPrice,
				"Credit Fees":` ${creditCardFeesSymbol} ${item?.creditCardFees}` ,
				"Processing Fees":`${processingFeesSymbol} ${item?.processingFees}`,
				"Merchandise Fees":`${merchandiseFeesSymbol} ${item?.merchandiseFees}`,
				"Other Fees":`${otherFeesSymbol} ${item?.otherFees}`,
				"Total Fees ( $ )": item?.totalFees,
				"Sales Tax ( % )": item?.salesTax,
				"Gross Amount ( $ )": item?.totalTicketPrice,
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

									<div className='purchaseFilter'>
										<div className='filterIcon'>
											<Icon icon='Sort' size='2x' className='h-100'></Icon>
										</div>
										<div className='mx-4 SelectDesign'>
											<Select placeholder='Event Category' value={CategroyId} ariaLabel='select category' onChange={(e) => { SetCategoryId(e.target.value) }}>
												{
													CategoryNameList?.length > 0 ?
														(
															CategoryNameList?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.eventCategoryName}</Option>
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
											<Select placeholder='Event Location' value={LocationId} ariaLabel='select Location' onChange={(e) => { SetLocationId(e.target.value) }}>
												{
													LocationNameList?.length > 0 ?
														(
															LocationNameList?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.eventLocationName}</Option>
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
											<Select placeholder='Event Name' value={EventNameId} ariaLabel='select Location' onChange={(e) => { SetEventNameId(e.target.value) }}>
												{
													EventNameList?.length > 0 ?
														(
															EventNameList?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.eventName}</Option>
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
											<Select placeholder='Ticket Category' value={TicketCategoryId} ariaLabel='select Location' onChange={(e) => { SetTicketCategoryId(e.target.value) }}>
												{
													TicketCategoryData?.length > 0 ?
														(
															TicketCategoryData?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.ticketCategoryName}</Option>
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
											<Select placeholder='Ticket Name' value={TicketNameId} ariaLabel='select Location' onChange={(e) => { SetTicketNameId(e.target.value) }}>
												{
													TicketNameList?.length > 0 ?
														(
															TicketNameList?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.ticketName}</Option>
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
											<Select placeholder='Ticket Type' value={TicketTypeId} ariaLabel='select Type' onChange={(e) => { SetTicketTypeId(e.target.value) }}>
												{
													TicketType?.length > 0 ?
														(
															TicketType?.map((item, index) => (
																<Option key={index} value={item?._id}>{item?.ticketType}</Option>
															))
														)
														:
														(
															<Option value=''>Please wait,Loading...</Option>
														)
												}
											</Select>
										</div>
									</div>
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



								</Row>
							</Container>
						</div>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable >
						<div className="purchaseTable">
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
																	{item?.ticketPriceType == 'USD' ? <span className='h6'>$</span> : <span className='h6'>%</span>}
																</span>
																<span className='h6'>
																	{item?.ticketPrice}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.creditCardFeesType == 'USD' ? <span className='h6'>$</span> : <span className='h6'>%</span>}
																</span>
																<span className='h6'>
																	{item?.creditCardFees}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.processingFeesType == 'USD' ? <span className='h6'>$</span> : <span className='h6'>%</span>}
																</span>
																<span className='h6'>
																	{item?.processingFees}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.merchandiseFeesType == 'USD' ? <span className='h6'>$</span> : <span className='h6'>%</span>}
																</span>
																<span className='h6'>
																	{item?.merchandiseFees}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	{item?.otherFeesType == 'USD' ? <span className='h6'>$</span> : <span className='h6'>%</span>}
																</span>
																<span className='h6'>
																	{item?.otherFees}
																</span>
															</td>
															<td scope='col' className='text-center'>
																<span className='h6'>
																	$ {item?.totalFees.toFixed(2)}
																</span>
															</td>
															

															<td scope='col' className='text-center'>
															<span className='h6'>
																	{item?.salesTaxType == 'Percentage' ? <span className='h6'>%</span> : null}
																</span>
																<span className='h6'>
																	{item?.salesTax.toFixed(2)}
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
						</div>

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

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
import { AssignEventName, AssignTicketName, GetTicketCategoryData, PurchaseReport, TicketTypes, assignedCategoryNameList, getCategoryNameList, getLocationNameList } from '../../../redux/Slice';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from 'date-fns'
import Spinner from '../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import * as XLSX from 'xlsx';





const PurchaseTransaction = () => {

	const { PurchaseReportList,totalPurchasePage, Loading, success,TicketType, token, CategoryNameList, LocationNameList, TicketCategoryData,EventNameList, TicketNameList,} = useSelector((state) => state.festiv)


	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [CategroyId ,SetCategoryId] =useState('')
	const [LocationId ,SetLocationId] =useState('')
	const [TicketCategoryId ,SetTicketCategoryId] =useState('')
	const [EventNameId ,SetEventNameId] =useState('')
	const [TicketNameId ,SetTicketNameId] =useState('')
	const[TicketTypeId,SetTicketTypeId]=useState('')
	const [EmailId ,SetEmail] =useState('')
	const [OrderId,SetOrderId] =useState('')
	const [dateRange, setDateRange] = useState([
		{
		  startDate: new Date(),
		  endDate: new Date(),
		  key:'selection'
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
		dispatch(TicketTypes( token ))
	}, [token])

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
				key:'selection'
			  }
		  ])
		dispatch(PurchaseReport({ token, currentPage, perPage }))
	}


	useEffect(()=>{

		let apiParams = {token, currentPage, perPage}

    if(CategroyId || LocationId  || TicketCategoryId ||  EventNameId || TicketNameId || EmailId  || OrderId || date || TicketTypeId){
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

	},[currentPage, perPage ,CategroyId ,LocationId ,TicketCategoryId,EventNameId ,TicketNameId,EmailId,OrderId,date,TicketTypeId ])


	const DownloadExcel =()=>{
		const formattedData = PurchaseReportList?.map(item => {
			return{
				"Purchase Date":item?.transanctionDate,
				"Order Number":item?.orderId,
				"Email":item?.email,
				"Event Category":item?.eventCategoryName,
				"Event Name":item?.eventName,
				"Ticket Category":item?.ticketcategoryName,
				"Ticket Name":item?.ticketName,
				"Ticket Type":item?.ticketTypeName,
				"Purchased Quantity":item?.quantity,
				"Ticket Price":item?.totalTicketPrice,
				"Ticket Fees":item?.totalFees,
				"Sales Tax":item?.salesTax,
				"Gross Amount":item?.netPrice
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

						<div>
							<Container fluid>
								<Row>

									<div className='purchaseFilter'>
										<div className='filterIcon'>
											<Icon icon='Sort' size='2x' className='h-100'></Icon>
										</div>
										<div className='mx-4 SelectDesign'>
											<Select placeholder='Event Category' value={CategroyId} ariaLabel='select category' onChange={(e)=>{SetCategoryId(e.target.value)}}>
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
											<Select placeholder='Event Location' value={LocationId} ariaLabel='select Location' onChange={(e)=>{SetLocationId(e.target.value)}}>
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
											<Select placeholder='Event Name' value={EventNameId} ariaLabel='select Location' onChange={(e)=>{SetEventNameId(e.target.value)}}>
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
											<Select placeholder='Ticket Category' value={TicketCategoryId} ariaLabel='select Location' onChange={(e)=>{SetTicketCategoryId(e.target.value)}}>
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
											<Select placeholder='Ticket Name' value={TicketNameId} ariaLabel='select Location' onChange={(e)=>{SetTicketNameId(e.target.value)}}>
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
											<Select placeholder='Ticket Type' value={TicketTypeId} ariaLabel='select Type' onChange={(e)=>{SetTicketTypeId(e.target.value)}}>
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
										<div className='mx-4  SelectDesign'>
											<Dropdown>
											<DropdownToggle>
											<Button  icon='DateRange' color='dark' isLight>
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
										<div className='mx-4  SelectDesign'>
											<Input type={'search'} value={EmailId} placeholder='Search Email' onChange={(e)=>{SetEmail(e.target.value)}}></Input>
										</div>
										<div className='mx-4  SelectDesign'>
											<Input type={'search'} value={OrderId} placeholder='Search Order Number' onChange={(e)=>{SetOrderId(e.target.value)}}></Input>
										</div>
										{
										CategroyId || LocationId || EventNameId || TicketCategoryId || TicketNameId || EmailId || OrderId || date || TicketTypeId ? (
										<div className='cursor-pointer d-flex align-items-center '  onClick={handleClearFilter} >
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
											Order No</th>
										<th scope='col' className='text-center'>
											Purchase Date
										</th>
										<th scope='col' className='text-center'>
											Customer Email
										</th>
										<th scope='col' className='text-center'>
											Event Categroy
										</th>
										<th scope='col' className='text-center'>
											Event Name
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
											Total Ticket Price
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
											PurchaseReportList?.map((item,index)=>(
								<>
									<tr key={index}>
										<td scope='col' className='text-center'>
											<span  className='h6'>
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

											</span>
										{item?.quantity}
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.ticketPrice}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.creditCardFees}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.processingFees}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.merchandiseFees}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.otherFees}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											$ {item?.totalFees}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											$ {item?.totalTicketPrice}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											 {item?.salesTax}
											</span>
										</td>
										<td scope='col' className='text-center'>
											<span className='h6'>
											$ {item?.netPrice}
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
						</div>

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

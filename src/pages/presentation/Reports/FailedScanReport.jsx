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
import { AssignEventName, AssignTicketName, FilterList, GetTicketCategoryData, PurchaseReport, RedemptionReportList, TicketFailedScanReportList, TicketSalesList, TicketTypes, assignedCategoryNameList, getCategoryNameList, getLocationNameList } from '../../../redux/Slice';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from 'date-fns'
import Spinner from '../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import * as XLSX from 'xlsx';
import { MultiSelect } from 'primereact/multiselect';
import Label from '../../../components/bootstrap/forms/Label';

const FailedScanReport = () => {
	const { FailedReportList,totalFailedScanPage,FilterDataList, Loading, success,TicketType, token, CategoryNameList, LocationNameList, TicketCategoryData,EventNameList, TicketNameList,} = useSelector((state) => state.festiv)


	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(50);

	const [CategroyId ,SetCategoryId] =useState('')
	const [LocationId ,SetLocationId] =useState('')
	const [TicketCategoryId ,SetTicketCategoryId] =useState('')
	const [EventNameId ,SetEventNameId] =useState('')
	const [TicketNameId ,SetTicketNameId] =useState('')
	const[TicketTypeId,SetTicketTypeId]=useState('')
	const [EmailId ,SetEmail] =useState('')
	const [OrderId,SetOrderId] =useState('')
	const [PurchasedateRange, setPurchaseDateRange] = useState([
		{
		  startDate: new Date(),
		  endDate: new Date(),
		  key:'selection'
		}
	  ]);
	  const [RedeemdateRange, setRedeemDateRange] = useState([
		{
		  startDate: new Date(),
		  endDate: new Date(),
		  key:'selection'
		}
	  ]);
	  const [FaileddateRange, setFailedDateRange] = useState([
		{
		  startDate: new Date(),
		  endDate: new Date(),
		  key:'selection'
		}
	  ]);

	const [Purchasedate, setPurchasedate] = useState('');
	const [Redeemdate, setRedeemdate] = useState('');
	const [Faileddate, setFaileddate] = useState('');

	  const handlePurchaseSelect = (ranges) => {

		setPurchaseDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setPurchasedate(formattedRange);
		}
	  };
	  const handleRedeemSelect = (ranges) => {

		setRedeemDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setRedeemdate(formattedRange);
		}
	  };
	  const handleFailedSelect = (ranges) => {

		setFailedDateRange([ranges.selection]);
		if (ranges?.selection?.startDate && ranges?.selection?.endDate) {
			const formattedStartDate = format(ranges?.selection?.startDate, 'yyyy-MM-dd');
			const formattedEndDate = format(ranges?.selection?.endDate, 'yyyy-MM-dd');
			const formattedRange = `${formattedStartDate}/${formattedEndDate}`;
			setFaileddate(formattedRange);
		}
	  };

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

	const handleClearFilter = () => {
		SetCategoryId('')
		SetLocationId('')
		SetTicketCategoryId('')
		SetEventNameId('')
		SetTicketNameId('')
		setPurchasedate('')
		setRedeemdate('')
		setFaileddate('')
		SetEmail('')
		SetOrderId('')
		SetTicketTypeId('')
		setPurchaseDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key:'selection'
			  }
		  ])
		  setRedeemDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key:'selection'
			  }
		  ])
		  setFailedDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key:'selection'
			  }
		  ])
		dispatch(TicketFailedScanReportList({ token, currentPage, perPage }))
	}


	useEffect(()=>{

		let apiParams = {token, currentPage, perPage}

    if(CategroyId || LocationId  || TicketCategoryId ||  EventNameId || TicketNameId ||  EmailId  || OrderId || Purchasedate || Redeemdate  || Faileddate || TicketTypeId){
		apiParams = {
            ...apiParams,
            CategroyId,
            LocationId,
            TicketCategoryId,
            EventNameId,
            TicketNameId,
			Purchasedate,
			Redeemdate,
			Faileddate,
			TicketTypeId,
			EmailId,
            OrderId,
        };
    }

	dispatch(TicketFailedScanReportList(apiParams))

	},[currentPage, perPage ,CategroyId ,LocationId ,TicketCategoryId,EventNameId ,TicketNameId,EmailId,OrderId,Purchasedate,Redeemdate,Faileddate,TicketTypeId ])


	const DownloadExcel =()=>{
		const formattedData = FailedReportList?.map(item => {

			return{
				"Order No":item?.orderId,
				"Purchase Date": item?.purchaseDate,
				"Redemption Date":item['redemDate'].join(','),
				"Failed Date":item?.failedDate,
				"Failed Reason":item?.reasonForFailed,
				"Customer Email":item?.email,
				"Event Category":item?.eventCategoryName,
				"Event Name":item?.eventName,
				"Event Location":item?.eventLocationName,
				"Ticket Category":item?.ticketcategoryName,
				"Ticket Name":item?.ticketName,
				"Ticket Type":item?.ticketTypeName,
		}
		})
		const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Failed-Scan-Report');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Festiv Spark Failed-Scan-Report.xlsx';
        a.click();
        URL.revokeObjectURL(url);
	}


	

	return (
		<PageWrapper title={demoPagesMenu.reports.subMenu.failedScanReport.text}>
			<Page container='fluid'>
				<Card stretch data-tour='list purchasemain'>
					<CardHeader>
						<CardLabel icon='Assessment' iconColor='warning'>
							<CardTitle>Failed Scan Report</CardTitle>
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
							<Container fluid>
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
												placeholder="Select Ticket Type" maxSelectedLabels={3} className='w-100' />
										</Col>
										<Col lg={2} md={4} className='py-2'>
										<Label>Purchase Date</Label>
												<div className='SelectDesign'>
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
        										ranges={PurchasedateRange}
        										onChange={handlePurchaseSelect}
      										/>
											</DropdownMenu>
											</Dropdown>
												</div>
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Redeem Date</Label>
										<div className='SelectDesign'>
											<Dropdown>
											<DropdownToggle>
											<Button  icon='DateRange' color='dark' isLight>
												Redeem Date{' '}
												<strong>
													{Number(dayjs().format('YYYY'))}
												</strong>
											</Button>
											</DropdownToggle>
											<DropdownMenu>
											<DateRange
        										ranges={RedeemdateRange}
        										onChange={handleRedeemSelect}
      										/>
											</DropdownMenu>
											</Dropdown>
										</div>
										</Col>
										<Col lg={2} md={4} className='py-2'>
											<Label>Failed Date</Label>
										<div className='SelectDesign'>
											<Dropdown>
											<DropdownToggle>
											<Button  icon='DateRange' color='dark' isLight>
												Failed Date{' '}
												<strong>
													{Number(dayjs().format('YYYY'))}
												</strong>
											</Button>
											</DropdownToggle>
											<DropdownMenu>
											<DateRange
        										ranges={FaileddateRange}
        										onChange={handleFailedSelect}
      										/>
											</DropdownMenu>
											</Dropdown>
										</div>
										</Col>
										<Col lg={3} md={4} className='py-2'>
										<Label>Search Ticket Email</Label>
										<div className='SelectDesign'>
											<Input type={'search'} value={EmailId} className='my-0' placeholder='Search Email' onChange={(e)=>{SetEmail(e.target.value)}}></Input>
										</div>
										</Col>
										<Col lg={3} md={4} className='py-2'>
											<Label>Search Ticket OrderNo</Label>
										<div className='SelectDesign'>
											<Input type={'search'} value={OrderId} className='my-0' placeholder='Search Order Number' onChange={(e)=>{SetOrderId(e.target.value)}}></Input>
										</div>
										</Col>
										<Col lg={2} md={4} className='py-2'>
										{
										CategroyId || LocationId || EventNameId || TicketCategoryId || TicketNameId || EmailId || OrderId || Purchasedate || Redeemdate || Faileddate || TicketTypeId ? (
											
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
										</Col>
										
										
								</Row>
							</Container>
					</CardHeader>
					<CardBody className='table-responsive purchaseTable' isScrollable >
							<table className='table table-modern  table-hover'>
								<thead>
									<tr>
									<th scope='col' className='text-center purchaseTableth'>
											Ticket QR
									</th>
										<th scope='col' className='text-center purchaseTableth'>
											Order No</th>
										<th scope='col' className='text-center purchaseTableth'>
											Purchase Date
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Redemption Date
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Failed Date
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Failed Reason
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Customer Email
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Event Category
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Event Name
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Event Location
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Ticket Category
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Ticket Name
										</th>
										<th scope='col' className='text-center purchaseTableth'>
											Ticket Type
										</th>
										
									</tr>
								</thead>
								<tbody>
									{
										FailedReportList?.length > 0 ? 
										(
											FailedReportList?.map((item,index)=>(
												<>
												<tr key={index}>
													<td scope='col' className='text-center purchaseTabletd'>
										{
										 <img src={item?.qrCode}  width={40} height={40}/>
										}
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
										<span className='h6'>
                                        {item?.orderId}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
										<span className='h6'>
										{item?.purchaseDate}
											</span>
										</td>
										<td scope='col'>
											{item['redemDate'].join(' / ')}
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
										<span className='h6'>
											{item?.failedDate}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.reasonForFailed}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.email}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.eventCategoryName}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.eventName}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.eventLocationName}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.ticketcategoryName}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.ticketName}
										</span>
										</td>
										<td scope='col' className='text-center purchaseTabletd'>
											<span className='h6'>
											{item?.ticketTypeName}
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
                            No Failed Scan Report
                          </Button>
                        }
												
												</td>
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
              total={totalFailedScanPage}
              current={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
					</CardFooterRight>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default FailedScanReport;

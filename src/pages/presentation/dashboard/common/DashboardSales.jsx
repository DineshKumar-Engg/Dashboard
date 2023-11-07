import React, { useEffect, useState } from 'react';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../../components/bootstrap/Card';
import useDarkMode from '../../../../hooks/useDarkMode';
import classNames from 'classnames';
import Icon from '../../../../components/icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, TopTicketSales } from '../../../../redux/Slice';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import Button from '../../../../components/bootstrap/Button';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import Input from '../../../../components/bootstrap/forms/Input';
import Chart from '../../../../components/extras/Chart';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import dayjs, { Dayjs } from 'dayjs';
import { MultiSelect } from 'primereact/multiselect';

const DashboardSales = () => {

    const { darkModeStatus } = useDarkMode();
    const dispatch = useDispatch()
    const { token, TopTicketList, Loading, EventNameList } = useSelector((state) => state.festiv)
    const [Searchdate, setSearchdate] = useState('');
    const [SearchEvent, setSearchEvent] = useState('');

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

    const EventOption = EventNameList?.map(({ _id, eventName }) => ({
        label: eventName,
        value: _id
    }))
    useEffect(() => {
        dispatch(AssignEventName(token))
    }, [token])

    useEffect(() => {
        let apiParams = { token }
        if (date || SearchEvent) {
            apiParams = {
                ...apiParams,
                date,
                SearchEvent
            };
        }
        dispatch(TopTicketSales(apiParams))
    }, [token, date, SearchEvent])


    const handleClearFilter = () => {
        setdate('')
        setSearchEvent('')
        setDateRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection'
			}
		])
        dispatch(TopTicketSales({ token }))
    }


    const chartOptionsReedem = {
        chart: {
            type: 'donut',
            height: 350,
        },
        stroke: {
            width: 0,
        },
        labels: ['Redeem %', 'Pending %'],
        dataLabels: {
            enabled: false,

        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '24px',
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            offsetY: 0,
                            formatter(val) {
                                return val;
                            },
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            offsetY: 16,
                            formatter(val) {
                                return val;
                            },
                        },
                    },
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '18px',
            fontFamily: 'Poppins',
        },
    };




    const stateRedem = {
        series: [parseFloat(TopTicketList?.pieChartRedeemedPercentage), parseFloat(TopTicketList?.pieChartPendingRedeemedPercentage)],
        options: chartOptionsReedem,
    }


    return (
        <div>
            <Card>
                <CardHeader>
                    
                    <div className='row w-100 d-flex align-items-center justify-content-center'>
                            <div className='col-lg-2 d-flex'>
                            <Icon icon='Analytics' size={'2x'} color='success'></Icon>
                                <h4>  Sales Summary</h4>
                            </div>
                            <div  className='col-lg-2'>
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
                            <div  className='col-lg-2'>
                                <MultiSelect value={SearchEvent} onChange={(e) => setSearchEvent(e.value)} options={EventOption} optionLabel="label" display="chip"
                                    placeholder="Select Event" className='w-100' />
                            </div>
                            
                                {
                                    date || SearchEvent ? (
                                        <div className='col-lg-2'>
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
                                        </div>
                                    )
                                        :
                                        null
                                }
                           
                    </div>
                </CardHeader>
                <CardBody className='d-flex'>
                    <Card stretch>
                        <CardBody className='d-flex gap-3 flex-wrap justify-content-center'>
                            <div className='col-xxl-12 col-xl-5 col-lg-12 col-md-12 col-sm-12'>
                                <div className='row g-3 d-flex flex-wrap justify-content-center'>
                                    <div className='col-lg-6'>
                                        <Card
                                            className={classNames('transition-base rounded-2 mb-0 text-dark', {
                                                'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
                                                'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
                                            })}
                                            stretch
                                            shadow='sm'>
                                            <CardBody>
                                                <div className='d-flex justify-content-between'>
                                                    <div>
                                                        <h3># Sales</h3>
                                                    </div>
                                                    <div>
                                                        <h4> {TopTicketList?.sales}</h4>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center py-2'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='AttachMoney' size='3x' color='warning' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3 g-2'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Net Sales Amount</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.netSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Fees</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.totalFees}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Sales Tax</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.totalSalesTax}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Gross Sales Amount</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.grossSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className='col-lg-6'>
                                        <Card
                                            className={classNames('transition-base rounded-2 mb-0 text-dark', {
                                                'text-dark': darkModeStatus,
                                                'bg-lo50-success bg-l10-success-hover': darkModeStatus,
                                                'bg-l25-success bg-l10-success-hover': !darkModeStatus,
                                            })}
                                            shadow='sm'
                                            stretch
                                            >
                                            <CardBody>
                                                <div className='d-flex align-items-center  py-2'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='Cancel' size='3x' color='danger' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h3>Failed Purchase Transation</h3>
                                                            </div>
                                                            <div>
                                                                <h5>{TopTicketList?.failedTransaction}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className='col-lg-6'>
                                        <Card
                                            className={classNames('transition-base rounded-2 mb-0 text-dark', {
                                                'bg-l25-primary bg-l10-primary-hover': !darkModeStatus,
                                                'bg-lo50-primary bg-lo25-primary-hover': darkModeStatus,
                                            })}
                                            shadow='sm'>
                                            <CardBody>
                                                <div>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <h3># Redeemed</h3>
                                                        </div>
                                                        <div>
                                                            <h4>{TopTicketList?.redeemedCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center  py-2'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='ConfirmationNumber' size='3x' color='primary' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3 g-2'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Redeem Net Sales Amount</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.redeemedNetSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Fees Redemeed</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.redeemedTotalFees}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Sales Tax Redeemed</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.redeemedTotalSalesTax}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h5>Redeem Gross Sales Amount</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.redeemedGrossSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className='col-lg-6'>
                                        <Card
                                            className={classNames('transition-base rounded-2  text-dark', {
                                                'bg-l25-secondary bg-l10-secondary-hover': !darkModeStatus,
                                                'bg-lo50-secondary bg-lo25-secondary-hover': darkModeStatus,
                                            })}
                                            shadow='sm'
                                            >
                                            <CardBody>
                                                <div>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <h3># Pending Redeemed</h3>
                                                        </div>
                                                        <div>
                                                            <h4>{TopTicketList?.pendingRedeemedCount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center  py-2'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='ConfirmationNumber' size='3x' color='primary' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3 g-2'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Pending Redeemed Net Sales Amount </h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.pendingRedeemedNetSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Fees Pending Redemeed</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.pendingRedeemedTotalFees}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <h5>Total Sales Tax Pending Redeemed</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.pendingRedeemedTotalSalesTax}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h5>Gross Sales Amount Pending Redeemed</h5>
                                                            </div>
                                                            <div>
                                                                <h5>$ {TopTicketList?.pendingRedeemedGrossSalesAmount}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='col-xxl-10 col-xl-6 col-lg-6 col-md-12 col-sm-12 h-100'>
                                <div className="row d-flex justify-content-center">
                                    <div className="col-lg-12">
                                        <Chart
                                            series={stateRedem.series}
                                            options={stateRedem.options}
                                            type={stateRedem.options.chart?.type}
                                            height={stateRedem.options.chart?.height}
                                        />
                                    </div>
                                    {/* <div className="col-lg-6">
                                        <Chart
                                            series={stateTicket.series}
                                            options={stateTicket.options}
                                            type={stateTicket.options.chart?.type}
                                            height={stateTicket.options.chart?.height}
                                        />
                                    </div> */}
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </div>
    )
}

export default DashboardSales
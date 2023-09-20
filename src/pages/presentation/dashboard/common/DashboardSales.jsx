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
import { TopTicketSales } from '../../../../redux/Slice';
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



const DashboardSales = () => {

    const { darkModeStatus } = useDarkMode();
    const dispatch = useDispatch()
    const { token, TopTicketList, Loading } = useSelector((state) => state.festiv)
    const [Searchdate, setSearchdate] = useState('');


    useEffect(() => {
        let apiParams = { token }
        if (Searchdate) {
            apiParams = {
                ...apiParams,
                Searchdate,
            };
        }
        dispatch(TopTicketSales(apiParams))
    }, [token, Searchdate])


    const handleClearFilter = () => {
        setSearchdate('')
        dispatch(TopTicketSales({ token }))
    }

	const salesByStoreOptions = {
		chart: {
			height: 400,
			type: 'line',
			stacked: false,
			toolbar: { show: false },
		},
		colors: [
			process.env.REACT_APP_INFO_COLOR,
			process.env.REACT_APP_SUCCESS_COLOR,
			process.env.REACT_APP_WARNING_COLOR,
		],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [1, 1, 4],
			curve: 'smooth',
		},
		plotOptions: {
			bar: {
				borderRadius: 5,
				columnWidth: '20px',
			},
		},
		xaxis: {
			categories: TopTicketList?.last7DaysDates,
		},
		yaxis: [
			{
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_INFO_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_INFO_COLOR,
					},
				},
				title: {
					text: 'Ticket Price',
					style: {
						color: process.env.REACT_APP_INFO_COLOR,
					},
				},
				tooltip: {
					enabled: true,
				},
				forceNiceScale: false, 
    			decimalsInFloat: false, 
			},
            {
				seriesName: 'Quantity',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_SUCCESS_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
				title: {
					text: 'Ticket Qantity',
					style: {
						color: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
                forceNiceScale: false, 
    			decimalsInFloat: false, 
			},
		],
	};

    const salesByStoreSeries1 = [
		{
			// @ts-ignore
			name: 'Ticket Price $',
			type: 'column',
			data: TopTicketList?.last7DaysTotalTicketPrice,
		},
		{
			// @ts-ignore
			name: 'Ticket Quantity',
			type: 'line',
			data: TopTicketList?.last7DaysTickeySaleQuantity,
		},
	];


    return (
        <div>
            <Card>
                <CardHeader className='d-flex justify-content-center '>
                    <CardLabel icon='Analytics' iconColor='info'>
                        <CardTitle className='d-flex align-items-center justify-content-center gap-3'>
                            <div>
                                <h4>  Sales Summary</h4>
                            </div>
                            <div >
                                <Button color='dark' isLight>
                                    <Input
                                        value={Searchdate}
                                        type='date'
                                        onChange={(e) => setSearchdate(e.target.value)}
                                        validFeedback='Looks good!'
                                    />
                                </Button>
                            </div>
                            <div>
                                {
                                    Searchdate ? (
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
                        </CardTitle>
                    </CardLabel>
                </CardHeader>
                <CardBody className='d-flex'>
                    <Card stretch>
                        <CardBody className='d-flex gap-3 flex-wrap justify-content-center'>
                            <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-12 col-sm-12'>
                                <div className='row g-3'>
                                    <div className='col-lg-12'>
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
                                    <div className='col-lg-12'>
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
                                                                <h6>$ {TopTicketList?.redeemedNetSalesAmount}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h5>Redeem Gross Sales Amount</h5>
                                                            </div>
                                                            <div>
                                                                <h6>$ {TopTicketList?.redeemedGrossSalesAmount}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className='col-lg-12'>
                                        <Card
                                            className={classNames('transition-base rounded-2  text-dark', {
                                                'bg-l25-secondary bg-l10-secondary-hover': !darkModeStatus,
                                                'bg-lo50-secondary bg-lo25-secondary-hover': darkModeStatus,
                                            })}
                                            shadow='sm'>
                                            <CardBody>
                                                <div className='d-flex align-items-center  py-2'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon icon='Cancel' size='3x' color='danger' />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h5>Failed Purchase Transation</h5>
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
                                </div>
                            </div>
                            <div className='col-xxl-7 col-xl-6 col-lg-6 col-md-12 col-sm-12 h-100'>
                            <Chart
							// @ts-ignore
							series={
								salesByStoreSeries1
							}
							options={salesByStoreOptions}
							type={salesByStoreOptions.chart?.type}
							height={salesByStoreOptions.chart?.height}
						    />
                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </div>
    )
}

export default DashboardSales
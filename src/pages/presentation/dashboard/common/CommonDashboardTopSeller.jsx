import React, { useEffect, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import Button from '../../../../components/bootstrap/Button';
import dayjs from 'dayjs';
import Icon from '../../../../components/icon/Icon';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import data from '../../../../common/data/dummyProductData';
import useSortableData from '../../../../hooks/useSortableData';
import { ApexOptions } from 'apexcharts';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Link } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';
import classNames from 'classnames';
import Chart from '../../../../components/extras/Chart';
import Badge from '../../../../components/bootstrap/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { TopTicketSales } from '../../../../redux/Slice';


const CommonDashboardTopSeller = () => {
	const dispatch = useDispatch()
	const {  token,TopTicketList,Loading } = useSelector((state) => state.festiv)

	useEffect(()=>{
		dispatch(TopTicketSales(token))
	},[])

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='Storefront' iconColor='info'>
					<CardTitle tag='h4' className='h5'>
						Top Ticket Sales
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='TopTicketSale table-responsive'>
				<table className='table table-modern table-hover'>
					<thead>
						<tr>
							<th scope='col' className='text-center'>Date</th>
							<th scope='col' className='text-center'>Event Name</th>
							<th scope='col' className='text-center'>Event Location</th>
							<th scope='col' className='text-center'>Ticket Name</th>
							<th scope='col' className='text-center'>Ticket Type</th>
							<th scope='col' className='text-center'>Total Revenue</th>
						</tr>
					</thead>
					<tbody>
					{
										TopTicketList?.length > 0 ? 
										(
											TopTicketList?.map((item,index)=>(
												<>
												<tr key={index}>
										
												<td scope='col' className='text-center'>
											<span className='h6'>
											{item?.transanctionDate}
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
											{item?.totalRevenue}
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
												<td>
													
												{/* {Loading ? <Spinner color="dark" size="10" /> : 
                          						<Button
                            					color='info'
                            					hoverShadow='none'
                            					icon='Cancel'
                          						>
                            					No Ticket Report
                          						</Button>
                        					}
												 */}
												</td>
												<td></td>
											</tr>
										)
									}
					</tbody>
				</table>
			</CardBody>
			
		</Card>
	);
};

export default CommonDashboardTopSeller;

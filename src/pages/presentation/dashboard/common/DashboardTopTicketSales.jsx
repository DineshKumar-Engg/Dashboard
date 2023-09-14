import React, { useEffect, useState } from 'react';
import Card, {
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


const DashboardTopTicketSales = () => {
	const dispatch = useDispatch()
	const { token, TopTicketList, Loading } = useSelector((state) => state.festiv)

	useEffect(() => {
		dispatch(TopTicketSales(token))
	}, [])

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
							<th scope='col' className='text-center'>Ticket Quantity</th>
							<th scope='col' className='text-center'>Total Ticket Price</th>
							<th scope='col' className='text-center'>Total Fees</th>
							<th scope='col' className='text-center'>Total Sales</th>
							<th scope='col' className='text-center'>Total Gross Amount</th>
						</tr>
					</thead>
					<tbody>
						{
							TopTicketList?.findData?.length > 0 ?
								(
									TopTicketList?.findData?.map((item, index) => (
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
														{item?.quantity}
													</span>
												</td>
												<td scope='col' className='text-center'>
													<span className='h6'>
														${item?.ticketPrice?.toFixed(2)}
													</span>
												</td>
												<td scope='col' className='text-center'>
													<span className='h6'>
														${item?.totalFees}
													</span>
												</td>
												<td scope='col' className='text-center'>
													<span className='h6'>
														{item?.salesTax}
													</span>
												</td>
												<td scope='col' className='text-center'>
													<span className='h6'>
														${item?.totalTicketPrice?.toFixed(2)}
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

export default DashboardTopTicketSales;

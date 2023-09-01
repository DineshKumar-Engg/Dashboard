import React from 'react'

const PurchaseReportRow = ({item}) => {
  return (
    <>
    <tr>
										<td scope='col' className='text-center'>
											{item?.orderId}
										</td>
										<td scope='col' className='text-center'>
                                        {item?.transanctionDate}
										</td>
										<td scope='col' className='text-center'>
                                        {item?.email}
										</td>
										<td scope='col' className='text-center'>
                                        {item?.ticketcategoryName}
										</td>
										<td scope='col' className='text-center'>
                                        {item?.ticketName}
										</td>
										<td scope='col' className='text-center'>
                                        {item?.ticketTypeName}
										</td>
										<td scope='col' className='text-center'>
										{item?.eventCategoryName}
										</td>
										<td scope='col' className='text-center'>
										{item?.eventName}
										</td>
										<td scope='col' className='text-center'>
										{item?.quantity}
										</td>
										<td scope='col' className='text-center'>
										$ {item?.salesTax}
										</td>
										<td scope='col' className='text-center'>
										$ {item?.totalFees}
										</td>
										<td scope='col' className='text-center'>
										$ {item?.totalTicketPrice}
										</td>
										<td scope='col' className='text-center'>
										$ {item?.netPrice}
										</td>
									</tr>
    </>
  )
}

export default PurchaseReportRow
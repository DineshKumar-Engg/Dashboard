import React from 'react'

const CommonTicketRow = ({item}) => {
  return (
    <tr>
			<td className='text-center'>
				<span className='h6'>{item?.ticketCategory?.charAt(0).toUpperCase()+item?.ticketCategory?.slice(1)}</span>
			</td>
			<td className='text-center'>
				<span className='h6'>
					{item?.NoOfEvents}
				</span>
			</td>
		</tr>
  )
}

export default CommonTicketRow
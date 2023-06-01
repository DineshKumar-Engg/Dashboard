import React from 'react'

const CommonTicketRow = ({item}) => {
  return (
    <tr>
			<td className='text-center'>
				<span className='h6'>{item?.categoryName}</span>
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
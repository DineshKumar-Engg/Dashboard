import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/bootstrap/Button'
import { deleteTicketCategoryList } from '../../redux/Slice'

const CommonTicketRow = ({item}) => {

	const dispatch = useDispatch()
	const { token} = useSelector((state) => state.festiv)



	const handleClick = (id) => {
		dispatch(deleteTicketCategoryList({ token, id }))
	}



  return (
    <tr>
			<td className='text-center'>
				<span className='h6'>{item?.ticketCategory?.charAt(0).toUpperCase()+item?.ticketCategory?.slice(1)}</span>
			</td>
			<td className='text-center'>
				<span className='h6'>
					{item?.numberOfTickets}
				</span>
			</td>
			<td className='text-center'>
				<span className='h6'>
				<Button
						icon='Delete'
						onClick={() => handleClick(item?._id)}
					>
					</Button>
				</span>
			</td>
		</tr>
  )
}

export default CommonTicketRow
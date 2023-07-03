import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/bootstrap/Button'
import { CategoryFilter, EventFilter, LocationFilter, TicketCatFilter, deleteTicketCategoryList } from '../../redux/Slice'
import { useNavigate } from 'react-router-dom'

const CommonTicketRow = ({item}) => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { token} = useSelector((state) => state.festiv)



	const handleClick = (id) => {
		dispatch(deleteTicketCategoryList({ token, id }))
	}

	const handleFilterId=(id)=>{
		dispatch(CategoryFilter({CategoryFilterId:''}))
		dispatch(LocationFilter({LocationFilterId:''}))
		dispatch(EventFilter({EventId:''}))
		dispatch(TicketCatFilter({TicketCatFilterId:id}))
		navigate('/ticketPages/ticketLists')
	}

  return (
    <tr>
			<td className='text-center'>
				<span className='h6'>{item?.ticketCategory?.charAt(0).toUpperCase()+item?.ticketCategory?.slice(1)}</span>
			</td>
			<td className='text-center' onClick={()=>handleFilterId(item?._id)} style={{cursor:"pointer"}}>
				<span className='h6'>
					{item?.numberOfTickets >0 ? <p className='text-success'>{item?.numberOfTickets}{" "}Tickets</p>:<p className='text-danger'>{item?.numberOfTickets}{" "}Ticket</p>}
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
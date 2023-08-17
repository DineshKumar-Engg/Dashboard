import {  useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryFilter, LocationFilter, deleteCategoryList } from '../../redux/Slice';



const CommonTableRow = ({ item }) => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { token} = useSelector((state) => state.festiv)



	const handleClick = (id) => {
		console.log(id);
		dispatch(deleteCategoryList({ token, id }))
	}

	const handleFilterId=(id)=>{
			dispatch(CategoryFilter({CategoryFilterId:id}))
			dispatch(LocationFilter({LocationFilterId:''}))
			navigate('/events/event-details')
	}

	return (
		<tr>
			<td className='text-center'>
				<span className='h6'>{item?.categoryName?.charAt(0).toUpperCase() + item?.categoryName?.slice(1)}</span>
			</td>
			<td className='text-center' onClick={()=>handleFilterId(item?._id)} style={{cursor:"pointer"}}>
				<span className='h6'>
					{item?.numberOfEvents > 0 ? <p className='text-success'>{item?.numberOfEvents}{" "}Events </p> : <p className='text-danger'>{item?.numberOfEvents}{" "}Event</p>}
				</span>
			</td>
			<td className='text-center'>
				<span>
					<Button
						isOutline={!darkModeStatus}
						icon='Delete'
						onClick={() => handleClick(item?._id)}
					>
					</Button>
				</span>
			</td>
		</tr>
	);
};

export default CommonTableRow;



import {  useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';

const CommonAssignRow = ({ item }) => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate()


	return (
		<tr key={item?.uniqueId}>
			<td className='text-center'>
				<span className='h6'>{item?.event?.eventName?.charAt(0)?.toUpperCase() + item?.event?.eventName?.slice(1)}</span>
			</td>
            <td>
            {
                item?.tickets?.map((val,index)=>(
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>	
					<p key={index} style={{margin:'0px'}}>{val?.ticketname}</p>
					<hr width={120} style={{margin:'0px'}} />
					</div>
                ))
            }
            </td>
			<td className='text-center'>
				<span>
					<Button
						isOutline={!darkModeStatus}
						icon='Edit'
						onClick={() => navigate(`/assign/${item?.event?.eventId}/${item?.uniqueId}`)}
					>
					</Button>
				</span>
			</td>
		</tr>
	);
};

export default CommonAssignRow;

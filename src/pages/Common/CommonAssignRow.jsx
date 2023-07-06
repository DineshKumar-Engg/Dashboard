import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Checks from '../../components/bootstrap/forms/Checks';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryList } from '../../redux/Slice';
import showNotification from '../../components/extras/showNotification';
import { errorMessage, loadingStatus, successMessage } from '../../redux/Slice';
import Icon from '../../components/icon/Icon';
import randomColor from 'randomcolor';

const CommonAssignRow = ({ item }) => {
	const { darkModeStatus } = useDarkMode();
	// const dispatch = useDispatch()
	// const { token} = useSelector((state) => state.festiv)



	const handleClick = (UID,EID) => {
		console.log(UID,EID);
		
	}

console.log(item);

//?.charAt(0)?.toUpperCase() + item?.event?.slice(1)
	return (
		<tr>
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
					<Link to={`/editAssign/${item?.event?.eventId}/${item?.uniqueId}`}>
					<Button
						isOutline={!darkModeStatus}
						icon='Edit'
						// onClick={() => handleClick(item?.eventId,item?.uniqueId)}
					>
					</Button>
					</Link>
					
				</span>
			</td>
		</tr>
	);
};

export default CommonAssignRow;

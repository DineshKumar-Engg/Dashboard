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


const CommonAssignRow = ({ item }) => {
	const { darkModeStatus } = useDarkMode();
	// const dispatch = useDispatch()
	// const { token} = useSelector((state) => state.festiv)



	const handleClick = (id) => {
		console.log(id);
		
	}




	return (
		<tr>
			<td className='text-center'>
				<span className='h6'>{item?.event?.charAt(0).toUpperCase() + item?.event?.slice(1)}</span>
			</td>
            <td>
            {
                item?.tickets?.map((val,index)=>(
                    <p key={index}>{val}</p>
                ))
            }
            </td>
			
			<td className='text-center'>
				<span>
					<Button
						isOutline={!darkModeStatus}
						icon='Edit'
						onClick={() => handleClick(item?._id)}
					>
					</Button>
				</span>
			</td>
		</tr>
	);
};

export default CommonAssignRow;

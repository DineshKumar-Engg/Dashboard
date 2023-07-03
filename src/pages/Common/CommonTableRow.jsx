import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Checks from '../../components/bootstrap/forms/Checks';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryFilter, LocationFilter, deleteCategoryList } from '../../redux/Slice';
import showNotification from '../../components/extras/showNotification';
import { errorMessage, loadingStatus, successMessage } from '../../redux/Slice';
import Icon from '../../components/icon/Icon';


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

//CategoryId

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

{/* <th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
			<th scope='row'>{id}</th>
			<td>
				<Link to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}>
					<img src={image} alt={name} width={54} height={54} />
				</Link>
			</td>
			<td>
				<div>
					<Link
						to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}
						className={classNames('fw-bold', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}>
						{name}
					</Link>
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
			<td>
				<Chart
					series={series}
					options={dummyOptions}
					type={dummyOptions.chart?.type}
					height={dummyOptions.chart?.height}
					width={dummyOptions.chart?.width}
				/>
			</td>
			<td>
				<span>{stock}</span>
			</td>
			<td>
				<span>
					{price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</span>
			</td>
			<td className='h5'>
				<Badge
					color={
						(store === 'Company A' && 'danger') ||
						(store === 'Company B' && 'warning') ||
						(store === 'Company C' && 'success') ||
						'info'
					}>
					{store}
				</Badge>
			</td>
			<td className='text-end'>
				<Button
					color='dark'
					isLight
					icon='Edit'
					tag='a'
					to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}
				/>
			</td> */}
import React, { useEffect, useState } from 'react';
import USERS from '../../../../common/data/userDummyData';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../../components/bootstrap/Card';
import { Card, Col } from 'react-bootstrap';
import classNames from 'classnames';
import useDarkMode from '../../../../hooks/useDarkMode';
import Icon from '../../../../components/icon/Icon';
import Report from './Report';
import Timeline, { TimelineItem } from '../../../../components/extras/Timeline';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import socketIOClient from 'socket.io-client';


const ENDPOINT = 'http://52.204.180.82:1337';

const DashboardUserCard = () => {

	const [activeUsers, setActiveUsers] = useState({ desktop: 0, mobile: 0 });

	const { darkModeStatus } = useDarkMode()

	useEffect(() => {

		const socket = socketIOClient(ENDPOINT);

		const deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
			? 'mobile'
			: 'desktop';

		console.log("activeUsers", deviceType);

		socket.emit('deviceInfo', deviceType);

		socket.on('activeUsers', (updatedUsers) => {
			setActiveUsers(updatedUsers);
		});

		return () => {
			socket.disconnect();
		};
	}, []);


	
	console.log("activeUsers", activeUsers.mobile);

	return (

		<div className='row h-100'>

			<Card>
				<CardHeader className='text-center d-flex justify-content-center'>
					<CardLabel icon='LocalPolice'>
						<CardTitle tag='h4' className='h5'>
							Active Users
						</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<div className="row">
						<Col lg={6}>
							<div className='my-2'>
								<Card
									className={classNames('transition-base rounded-2 mb-0 text-dark', {
										'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
										'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
									})}
								>
									<CardHeader className='bg-transparent'>
										<CardLabel>
											<CardTitle tag='h4' className='h5'>
												Desktop
											</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='d-flex align-items-center pb-3'>
											<div className='flex-shrink-0'>
												<Icon icon='Web' size='4x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													<Icon icon='PersonOutline' size='4x' color='primary'></Icon>
													{activeUsers.desktop}
												</div>
												<div
													className={classNames({
														'text-muted': !darkModeStatus,
														'text-light': darkModeStatus,
													})}>

												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</Col>
						<Col lg={6}>
							<div className='my-2'>
								<Card
									className={classNames('transition-base rounded-2 mb-0 text-dark', {
										'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
										'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
									})}
								>
									<CardHeader className='bg-transparent'>
										<CardLabel>
											<CardTitle tag='h4' className='h5'>
												Mobile
											</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='d-flex align-items-center pb-3'>
											<div className='flex-shrink-0'>
												<Icon icon='Web' size='4x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													<Icon icon='PersonOutline' size='4x' color='primary'></Icon>
													{activeUsers.mobile}
												</div>
												<div
													className={classNames({
														'text-muted': !darkModeStatus,
														'text-light': darkModeStatus,
													})}>

												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</Col>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default DashboardUserCard;

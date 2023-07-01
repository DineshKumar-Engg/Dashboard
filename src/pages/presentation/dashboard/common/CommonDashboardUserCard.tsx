import React from 'react';
import USERS from '../../../../common/data/userDummyData';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../../components/bootstrap/Card';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import useDarkMode from '../../../../hooks/useDarkMode';
import Icon from '../../../../components/icon/Icon';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();
	const { darkModeStatus } = useDarkMode();

	return (
		// <UserContact
		// 	name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
		// 	position='Team Lead'
		// 	mail={`${USERS.SAM.username}@site.com`}
		// 	phone='1234567'
		// 	// onChat={() => navigate(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
		// 	src={USERS.SAM.src}
		// 	srcSet={USERS.SAM.srcSet}
		// 	color={USERS.SAM.color}
		// />
		<div className='row'>
			<Card>
				<CardHeader>
				<CardLabel icon='LocalPolice'>
					<CardTitle tag='h4' className='h5'>
						Active Users
					</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
						<div className="row">
						<div className='col-md-6 col-lg-12'>
						<Card
							className={classNames('transition-base rounded-2 mb-0 text-dark', {
								'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
								'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
							})}
							>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
										Website
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
											30
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

						</div>
						<div className='row mt-3'>
						<div className='col-md-6'>
						<Card
							className={classNames('transition-base rounded-2 mb-0 text-dark', {
								'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
								'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
							})}
							>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
										Tablet
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								
								<div className='d-flex align-items-center pb-3'>
									<div className='flex-shrink-0'>
										<Icon icon='TabletMac' size='4x' color='warning' />
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-3 mb-0'>
										<Icon icon='PersonOutline' size='4x' color='primary'></Icon>
											5
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
					<div className='col-md-6'>
						<Card
							className={classNames('transition-base rounded-2 mb-0 text-dark', {
								'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
								'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
							})}
							>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
										Phone
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								
								<div className='d-flex align-items-center pb-3'>
									<div className='flex-shrink-0'>
										<Icon icon='Smartphone' size='4x' color='warning' />
									</div>
									<div className='flex-grow-1 ms-3'>
										<div className='fw-bold fs-3 mb-0'>
											<Icon icon='PersonOutline' size='4x' color='primary'></Icon>
											6
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
						</div>
				</CardBody>
				<CardFooter>

				</CardFooter>
			</Card>
		</div>
	);
};

export default CommonDashboardUserCard;

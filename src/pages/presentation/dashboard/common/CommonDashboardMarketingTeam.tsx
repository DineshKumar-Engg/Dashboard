import React, { useCallback } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../../components/Avatar';
import USERS from '../../../../common/data/userDummyData';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';

const CommonDashboardMarketingTeam = () => {
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	// const handleOnClickToEmployeeListPage = useCallback(
	// 	() => navigate(`../${demoPagesMenu.appointment.subMenu.employeeList.path}`),
	// 	[navigate],
	// );

	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='h4' className='h5'>
						User Visits By Cities
					</CardTitle>
					<CardSubTitle tag='h5' className='h6 text-muted'>
						Last 7 days
					</CardSubTitle>
				</CardLabel>
				{/* <CardActions>
					<Button
						icon='ArrowForwardIos'
						aria-label='Read More'
						hoverShadow='default'
						color={darkModeStatus ? 'dark' : undefined}
						// onClick={handleOnClickToEmployeeListPage}
					/>
				</CardActions> */}
			</CardHeader>
			<CardBody className='table-responsive' isScrollable>
				<table className='table table-modern table-hover text-center'>
					<thead>
						<tr>
							<th>
								City
							</th>
							<th>
								Viewers
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								NewYork
							</td>
							<td>
								23 members
							</td>
						</tr>
						<tr>
							<td>
								New Jersey
							</td>
							<td>
								50 members
							</td>
						</tr>
						<tr>
							<td>
								Vineland
							</td>
							<td>
								10 members
							</td>
						</tr>
						<tr>
							<td>
								North Brunswick
							</td>
							<td>
								30 members
							</td>
						</tr>
						<tr>
							<td>
								Washington 
							</td>
							<td>
								80 members
							</td>
						</tr>
						<tr>
							<td>
								Virgina
							</td>
							<td>
								40 members
							</td>
						</tr>
						<tr>
							<td>
								North Carolina
							</td>
							<td>
								26 members
							</td>
						</tr>
						<tr>
							<td>
								Kentucky
							</td>
							<td>
								63 members
							</td>
						</tr>
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardMarketingTeam;

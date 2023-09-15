import React, { useEffect, useState } from 'react';
import USERS from '../../../../common/data/userDummyData';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';
import { useNavigate } from 'react-router-dom';
import { CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../../components/bootstrap/Card';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import useDarkMode from '../../../../hooks/useDarkMode';
import Icon from '../../../../components/icon/Icon';
import Report from './Report';
import Timeline, { TimelineItem } from '../../../../components/extras/Timeline';


const GOOGLE_OAUTH_CLIENT_ID = '947234227201-a7872f6e1p0e6emteic6s8odda3ut7o2.apps.googleusercontent.com';
const GOOGLE_OAUTH_REDIRECT_URI = 'http://localhost:3000/auth/callback'; // Update with your actual redirect URI
const GOOGLE_ANALYTICS_API_KEY = 'AIzaSyBN21BXnrvxe33ynSyQMVaCLPOekohme4A';
const GOOGLE_ANALYTICS_PROPERTY_ID = '404905998';

const arr = [
	{
		dimensionValues: [{
			value: '/'
		}],
		metricValues: [{
			value: "15"
		}]
	},
	{
		dimensionValues: [{
			value: '/about'
		}],
		metricValues: [{
			value: "10"
		}]
	},
	{
		dimensionValues: [{
			value: '/vendor'
		}],
		metricValues: [{
			value: "13"
		}]
	},
	{
		dimensionValues: [{
			value: '/buyticket'
		}],
		metricValues: [{
			value: "19"
		}]
	},
	{
		dimensionValues: [{
			value: '/event'
		}],
		metricValues: [{
			value: "18"
		}]
	},
	{
		dimensionValues: [{
			value: '/sponsor'
		}],
		metricValues: [{
			value: "1"
		}]
	},
	{
		dimensionValues: [{
			value: "/festivalhours"
		}],
		metricValues: [{
			value: "12"
		}]
	},

]

const DashboardUserCard = () => {

	const { darkModeStatus } = useDarkMode()
	const [accessToken, setAccessToken] = useState(localStorage.getItem('Statistic') || null);
	const [DateValues, setDataValue] = useState([])
	const [pageValues, SetPageValues] = useState([])

	console.log(accessToken);
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		if (code) {
			exchangeCodeForAccessToken(code);
		}
	}, []);

	const handleLoginClick = () => {
		//   Redirect the user to Google OAuth for authorization
		const oauthEndpoint = `https://accounts.google.com/o/oauth2/auth?` +
			`client_id=${GOOGLE_OAUTH_CLIENT_ID}&` +
			`redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}&` +
			`scope=https://www.googleapis.com/auth/analytics.readonly&` +
			`response_type=code`;

		window.location.href = oauthEndpoint;
	};

	const exchangeCodeForAccessToken = async (code) => {
		try {
			const response = await axios.post(
				'https://oauth2.googleapis.com/token',
				{
					code: code,
					client_id: GOOGLE_OAUTH_CLIENT_ID,
					client_secret: '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', // Replace with your actual client secret
					redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
					grant_type: 'authorization_code',
				}
			);
			console.log("acess", response);
			const { access_token, expires_in } = response.data;
			localStorage.setItem('Statistic', access_token)
			localStorage.setItem('expires_in', expires_in);

			// Calculate and store the token's expiration time in milliseconds
			const now = new Date();
			const expirationTime = now.getTime() + expires_in * 1000; // Convert to milliseconds
			localStorage.setItem('expiration_time', expirationTime);
			setAccessToken(access_token);
		} catch (error) {
			console.error('Error exchanging code for access token:', error);
		}
	};

	const fetchAnalyticsData = async () => {
		try {
			await axios.post(
				`https://analyticsdata.googleapis.com/v1beta/properties/${GOOGLE_ANALYTICS_PROPERTY_ID}:runReport?key=${GOOGLE_ANALYTICS_API_KEY}`,
				{
					dimensions: [{ name: 'platformDeviceCategory' }],
					metrics: [{ name: 'active7DayUsers' }],
					dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				}
			).then((response) => {
				console.log('Google Analytics Data:', response.data.rows);
				setDataValue(response.data.rows)
			})

			await axios.post(
				`https://analyticsdata.googleapis.com/v1beta/properties/${GOOGLE_ANALYTICS_PROPERTY_ID}:runReport?key=${GOOGLE_ANALYTICS_API_KEY}`,
				{
					dimensions: [{ name: 'unifiedPagePathScreen' }],
					metrics: [{ name: 'active7DayUsers' }],
					dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				}
			).then((response) => {
				SetPageValues(response.data.rows)
			})


		} catch (error) {
			console.error('Error fetching Google Analytics data:', error);
		}
	};


	useEffect(() => {
		if (accessToken) {
			fetchAnalyticsData()
		}
	}, [accessToken])


	useEffect(() => {
		// Check if the access token has expired
		const expirationTime = localStorage.getItem('expiration_time');
		if (expirationTime && new Date().getTime() >= Number(expirationTime)) {
			// Token has expired; remove it from localStorage
			localStorage.removeItem('Statistic');
			localStorage.removeItem('expires_in');
			localStorage.removeItem('expiration_time');
		}


	}, [])

	console.log(DateValues, "DateValues");

	console.log(pageValues, "PageValues");
	const filteredArr = pageValues.filter(obj => {
		const dimensionValue = obj.dimensionValues[0].value;
		return ['/', '/about', '/vendor', '/sponsor', '/buyticket', '/event', '/festivalhours'].includes(dimensionValue);
	});

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
						<div className='col-md-12 col-lg-12'>
							<div className='row mt-3'>
								{accessToken == null ?
									(
										<div className="row d-flex justify-content-center align-items-center h-100 w-100">
											<div className="col-lg-12 d-flex justify-content-center">
												<button onClick={handleLoginClick} className='googlebtn'>Log in with Google</button>
											</div>
										</div>
									)
									:
									(
										<div className="row d-flex justify-content-center align-items-center h-100">
											<div className='col-md-6'>
												{
													DateValues?.length > 0 ?
														(
															DateValues?.map((item) => (
																<>

																	<Card
																		className={classNames('transition-base rounded-2 mb-0 text-dark', {
																			'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
																			'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
																		})}
																	>
																		<CardHeader className='bg-transparent'>
																			<CardLabel>
																				<CardTitle tag='h4' className='h5'>
																					{item?.dimensionValues[0]?.value?.split('/')[1]}
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
																						{item?.metricValues[0]?.value}
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

																</>
															))
														)
														:
														null
												}
											</div>
											<div className='col-md-12 col-lg-6'>
												{
													filteredArr?.length > 0 ?
														(
															<Card stretch>
																<CardHeader>
																	<CardLabel icon='NotificationsActive' iconColor='warning'>
																		<CardTitle tag='h4' className='h5'>
																			Most Visited Pages
																		</CardTitle>
																		{/* <CardSubTitle>last 2 weeks</CardSubTitle> */}
																	</CardLabel>
																</CardHeader>
																<CardBody>
																	{

															filteredArr?.map((item) => (
																			<div className='d-flex w-100 justify-content-between'>
																				<div>
																					<h5> # {item?.dimensionValues[0]?.value?.split('/')[1].charAt(0).toUpperCase() + item?.dimensionValues[0]?.value?.split('/')[1].slice(1)}</h5>
																				</div>
																				<div>
																					<h5>{item?.metricValues[0].value}</h5>
																				</div>
																			</div>
																		))

																	}
																</CardBody>
															</Card>
														)
														:
														null
												}

											</div>
										</div>
									)
								}

							</div>
						</div>

					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default DashboardUserCard;

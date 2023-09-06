import React, { useEffect } from 'react';
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
	const { darkModeStatus } = useDarkMode();

	useEffect(() => {

		function initGoogleAPI() {
			// Now you can use window.gapi here
			window.gapi.load('client', async () => {
			  // Initialize the API client and continue with your code
			  await window.gapi.client.init({
				apiKey: 'AIzaSyDv30J9KwpQtOWjJ6BTgK4hGAiEu9Gqcwc',
				clientId: '947234227201-ifeb8ce32o9qcrhnuvunhe9kbm3vhflg.apps.googleusercontent.com',
				discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
				scope: 'https://www.googleapis.com/auth/analytics.readonly',
			  });
		
			  // Authenticate and make API requests as shown in the previous example
			  await window.gapi.client.auth.authorize({
				'access_type': 'offline',
			  });
			  
			  // Make a request to Google Analytics API to get device category data
			  const response = await window.gapi.client.analyticsreporting.reports.batchGet({
				"reportRequests": [
				  {
					"viewId": "292184069",
					"dateRanges": [
					  {
						"startDate": "7daysAgo",
						"endDate": "today"
					  }
					],
					"metrics": [
					  {
						"expression": "ga:sessions"
					  }
					],
					"dimensions": [
					  {
						"name": "ga:deviceCategory"
					  }
					]
				  }
				]
			  });
		
			  // Process the response data
			  const report = response.result.reports[0];
			  const rows = report.data.rows;
			  for (const row of rows) {
				const deviceCategory = row.dimensions[0];
				const sessions = row.metrics[0].values[0];
				console.log(`Device Category: ${deviceCategory}, Sessions: ${sessions}`);
			  }
			});
		  }

		   // Check if the Google API library has already loaded
  if (window.gapi) {
    initGoogleAPI();
  } else {
    // If the library hasn't loaded yet, wait for it to load
    window.addEventListener('load', initGoogleAPI);
  }
		// // Load the Google API client library and authenticate
		// window.gapi.load('client', async () => {
		//   await window.gapi.client.init({
		// 	apiKey: 'AIzaSyDv30J9KwpQtOWjJ6BTgK4hGAiEu9Gqcwc',
		// 	clientId: '947234227201-ifeb8ce32o9qcrhnuvunhe9kbm3vhflg.apps.googleusercontent.com',
		// 	discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
		// 	scope: 'https://www.googleapis.com/auth/analytics.readonly',
		//   });
	
		//   // Authenticate with the service account credentials
		 
		// });
	  }, []);



	return (
		
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

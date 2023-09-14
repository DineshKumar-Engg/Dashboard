import React, { useEffect } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Timeline, { TimelineItem } from '../../../../components/extras/Timeline';
import dayjs from 'dayjs';
import Popovers from '../../../../components/bootstrap/Popovers';
import Icon from '../../../../components/icon/Icon';
import axios from 'axios';

const DashboardMostVisitPage = () => {

	const clientId = 'YOUR_CLIENT_ID';
	const clientSecret = 'YOUR_CLIENT_SECRET';
	const redirectUri = 'YOUR_REDIRECT_URI';
	const authorizationCode = 'YOUR_AUTHORIZATION_CODE';
	
	// Step 1: Exchange Authorization Code for Access Token
	const tokenUrl = 'https://oauth2.googleapis.com/token';
	
	const tokenParams = new URLSearchParams();
	tokenParams.append('code', authorizationCode);
	tokenParams.append('client_id', clientId);
	tokenParams.append('client_secret', clientSecret);
	tokenParams.append('redirect_uri', redirectUri);
	tokenParams.append('grant_type', 'authorization_code');
	
	axios
	  .post(tokenUrl, tokenParams)
	  .then((tokenResponse) => {
		const accessToken = tokenResponse.data.access_token;
	
		// Step 2: Make an Authenticated Request to YouTube Data API
		const apiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&mine=true`;
	
		axios
		  .get(apiUrl, {
			headers: {
			  Authorization: `Bearer ${accessToken}`,
			  Accept: 'application/json',
			},
		  })
		  .then((apiResponse) => {
			const channelData = apiResponse.data;
			console.log('Channel Statistics:', channelData);
		  })
		  .catch((apiError) => {
			console.error('YouTube Data API Error:', apiError);
		  });
	  })
	  .catch((tokenError) => {
		console.error('Token Exchange Error:', tokenError);
	  });






	return (
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
				<Timeline>
					<TimelineItem label={new Date().toDateString()} color='primary'>
						Home Page
					</TimelineItem>
					<TimelineItem label={new Date().toDateString()} color='success'>
					 Scheduled page
					</TimelineItem>
				
					<TimelineItem label={new Date().toDateString()} color='info'>
						Ticket Page
					</TimelineItem>
					
					<TimelineItem label={new Date().toDateString()} color='secondary'>
						Transcation page
					</TimelineItem>
					<TimelineItem label={new Date().toDateString()} color='primary'>
						About page
					</TimelineItem>
				</Timeline>
			</CardBody>
		</Card>
	);
};

export default DashboardMostVisitPage;

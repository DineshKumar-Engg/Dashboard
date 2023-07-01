import React from 'react';
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

const CommonDashboardRecentActivities = () => {
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

export default CommonDashboardRecentActivities;

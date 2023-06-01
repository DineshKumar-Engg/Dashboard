import React, { useEffect, useState } from 'react'; 
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Popovers from '../../../../components/bootstrap/Popovers';
import { demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { eventList} from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from '../Location/TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonEventRow from '../../../Common/CommonEventRow';
import EventCanva from './EventCanva';

const EventDetails = () => {


	useEffect(() => {
		dispatch(eventList())
	}, [dispatch])

	const { EventList,canva ,Loading} = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5);

	const onCurrentPageItems = dataPagination(EventList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const dispatch = useDispatch()

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
		<Page>
			<Card stretch data-tour='list'>
				<CardHeader borderSize={1}>
					<CardLabel icon='ListAlt' iconColor='info'>
						<CardTitle>Event-Details</CardTitle>
					</CardLabel>
					<CardActions>
						<Link to='/newevent'>
							<Button
								color='light'
								hoverShadow='none'
								icon='Add'
							>
								Add New Events
							</Button>
						</Link>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th scope='col' className='text-center'>
									Name of the Event</th>
								<th scope='col' className='text-center'>
									Date
								</th>
								<th scope='col' className='text-center'>
									Category
								</th>
								<th scope='col' className='text-center'>
									status
								</th>
								<th scope='col' className='text-center'>
									Edit
								</th>
								<th scope='col' className='text-center'>
									Details
								</th>
							</tr>
						</thead>
						<tbody>
							{
								EventList.length >0 ?
								(
									onCurrentPageItems?.map((i) => (
										<CommonEventRow
											key={i._id}
											{...i}
											item={i}
											selectName='selectedList'
											selectOnChange={selectTable.handleChange}
											selectChecked={selectTable.values.selectedList.includes(
											)}
										/>
									))
								)
								:
								(
									
								Loading && <Spinner color="dark" size="10" /> || <tr className='text-end fs-5'>
									Please Refresh Page...
									<Button onClick={() => window.location.reload(true)}>Refresh</Button>
									</tr>
										
								)
							}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={EventList}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			{canva && <EventCanva/>}

		</Page>
	</PageWrapper>
	);
};

export default EventDetails;

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
import { errorMessage, eventList, loadingStatus, successMessage} from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from '../Location/TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonEventRow from '../../../Common/CommonEventRow';
import EventCanva from './EventCanva';
import showNotification from '../../../../components/extras/showNotification';




const EventDetails = () => {
	const { EventList,canva ,Loading,success,token,error} = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const onCurrentPageItems = dataPagination(EventList, currentPage, perPage);

	const dispatch = useDispatch()

	const handleSave = (val) => {
        // setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
        if(success){
			dispatch(eventList({token,currentPage,perPage}))
		}
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))
    };

	useEffect(()=>{
		error && handleSave(error)
		success && handleSave(success)
	},[success,error])

	useEffect(() => {
		dispatch(eventList({token,currentPage,perPage}))
	}, [dispatch,currentPage,perPage])






	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);


	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.eventDetails.text}>
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
									Event Name</th>
								<th scope='col' className='text-center'>
									Created Date
								</th>
								<th scope='col' className='text-center'>
									Event Category
								</th>
								<th scope='col' className='text-center'>
									Publish status
								</th>
								<th scope='col' className='text-center'>
									Edit
								</th>
								<th scope='col' className='text-center'>
									Delete
								</th>
								<th scope='col' className='text-center'>
									Details
								</th>
							</tr>
						</thead>
						<tbody>
							{
								EventList?.length >0 ?
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
									
									<>

									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td>{Loading && <Spinner color="dark" size="10" />}</td>
										<td></td>
										<td></td>
									</tr>
																		</>
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

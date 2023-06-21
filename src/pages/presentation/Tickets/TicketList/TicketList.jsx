import React, { useEffect, useState } from 'react'; 
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import PaginationButtons, {
	dataPagination,
} from '../../../../components/PaginationButtons';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import {  errorMessage,  getTicketLists, loadingStatus, successMessage} from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonTicketListRow from '../../../Common/CommonTicketListRow';
import TicketDetails from './TicketDetails';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';


const TicketList = () => {


	const { TicketLists,canva ,Loading,success,error,token} = useSelector((state) => state.festiv)
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
			dispatch(getTicketLists(token))
		}
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))
    };



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const onCurrentPageItems = dataPagination(TicketLists, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	





	useEffect(()=>{
		error && handleSave(error)
		success && handleSave(success)
	},[success,error])


	useEffect(() => {
		dispatch(getTicketLists({token,currentPage,perPage}))
	}, [token,currentPage,perPage])


console.log(currentPage);
console.log(perPage);



  return (
    <PageWrapper title={demoPagesMenu.ticketPages.subMenu.ticketLists.text}>
		<Page>
			<Card stretch data-tour='list'>
				<CardHeader borderSize={1}>
					<CardLabel icon='ListAlt' iconColor='info'>
						<CardTitle>Ticket-Details</CardTitle>
					</CardLabel>
					<CardActions>
						<Link to='/newTicket'>
							<Button
								color='light'
								hoverShadow='none'
								icon='Add'
							>
								Add New Tickets
							</Button>
						</Link>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th scope='col' className='text-center'>
									Tickets Name</th>
								<th scope='col' className='text-center'>
									Created Date
								</th>
								<th scope='col' className='text-center'>
									Category Name
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
								TicketLists?.length >0 ?
								(
									onCurrentPageItems?.map((i) => (
										<CommonTicketListRow
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
					data={TicketLists}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			{canva && <TicketDetails/>}

		</Page>
	</PageWrapper>
  )
}

export default TicketList
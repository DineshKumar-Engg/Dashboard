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
import { eventList, getTicketList, getTicketLists} from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import Spinner from '../../../../components/bootstrap/Spinner';
import CommonTicketListRow from '../../../Common/CommonTicketListRow';
import TicketDetails from './TicketDetails';


const TicketList = () => {

    useEffect(() => {
		dispatch(getTicketLists())
	}, [dispatch])

	const { TicketList,canva ,Loading} = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5);

	const onCurrentPageItems = dataPagination(TicketList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const dispatch = useDispatch()


  return (
    <PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
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
									Name of the Tickets</th>
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
								TicketList.length >0 ?
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
					data={TicketList}
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
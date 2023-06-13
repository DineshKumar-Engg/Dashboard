import React, { useEffect, useState } from 'react';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Button from '../../../../components/bootstrap/Button';
import Badge from '../../../../components/bootstrap/Badge';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
	CardActions
} from '../../../../components/bootstrap/Card';
import { demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import PaginationButtons, { dataPagination } from '../../../../components/PaginationButtons';
import { errorMessage, getCategoryList, getTicketCategoryList } from '../../../../redux/Slice';
import CommonTicketRow from '../../../Common/CommonTicketRow';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/bootstrap/Spinner';



const TicketCategoryList = () => {
	const dispatch = useDispatch()
	
	const {error,Loading,TicketCategoryList,token } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5);

	const onCurrentPageItems = dataPagination(TicketCategoryList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	

	
	useEffect(() => {
			dispatch(getTicketCategoryList(token));
	}, [])


	useEffect(() => {
		dispatch(errorMessage({ errors: '' }))
	}, [dispatch])

	return (
		<PageWrapper title={ demoPagesMenu.ticketPages.subMenu.ticketCategory.text}>

		<Page>
				<Card stretch data-tour='list'>
			<CardHeader borderSize={1}>
					<CardLabel icon='Dvr' iconColor='info'>
						<CardTitle>Ticket Category List</CardTitle>
					</CardLabel>
					<CardActions>
						<Link to='/newticketcategory'>
							<Button
								color='light'
								hoverShadow='none'
								icon='Add'
							>
								Add New Ticket Category
							
							</Button>
						</Link>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
						<thead>
							<tr>
								<th scope='col' className='text-center'>Ticket Category</th>
								<th scope='col' className='text-center'>
									Number Of Tickets
								</th>
							</tr>
						</thead>
						<tbody className='text-center'>

							{
								TicketCategoryList.length > 0 ? 
								(
									
										onCurrentPageItems?.map((i) => (
											<CommonTicketRow
												key={i._id}
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
					data={TicketCategoryList}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>
		</Page>
	</PageWrapper>
	);
};

export default TicketCategoryList;

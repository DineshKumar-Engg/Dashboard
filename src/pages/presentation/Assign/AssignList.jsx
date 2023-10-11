import  { useState,useEffect } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import { getAssignedList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import CommonAssignRow from '../../Common/CommonAssignRow';
import { Link } from 'react-router-dom';

const AssignList = () => {


	const dispatch = useDispatch()
	
	const { CategoryList,error,Loading,token,success,AssignLists} = useSelector((state) => state.festiv)
	

	useEffect(()=>{
		dispatch(getAssignedList(token))
	},[])


	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const onCurrentPageItems = dataPagination(AssignLists, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	return (
		<PageWrapper title={demoPagesMenu.assignEvents.subMenu.assignLists.text}>
			<Page>
					<Card stretch>
					<CardHeader borderSize={1}>
						<CardLabel icon='Dvr' iconColor='info'>
							<CardTitle>Assigned Events - Tickets List</CardTitle>
						</CardLabel>
						<CardActions>
						<Link to='/assign'>
								<Button
									color='light'
									hoverShadow='none'
									icon='Add'
								>
									New Assign
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
					<thead>
								<tr>
									<th scope='col' className='text-center'>
										Events Name
									</th>
									<th scope='col' className='text-center'>
									Tickets Name
									</th>
									<th scope='col' className='text-center'>
									Edit
									</th>
								</tr>
							</thead>
							<tbody  className='text-center'>
								{
									AssignLists?.length > 0 ? 
									(
										AssignLists?.map((i,index) => (
											<CommonAssignRow
												key={index}
												item={i}
											/>
										))
									)
									:
									(
										<tr>
											<td>
											</td>
											<td>{Loading ? <Spinner color="dark" size="10" /> : <Link to='/assign'>
														<Button
															color='info'
															hoverShadow='none'
															icon='Add'
														>
															Assign Event-Ticket
														</Button>
													</Link>}</td>
											<td></td>
										</tr>
									)
								}
							</tbody>
					</table>
					</CardBody>
					
					</Card>
			</Page>	
		</PageWrapper>
	);
};

export default AssignList;

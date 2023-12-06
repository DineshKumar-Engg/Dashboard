import  { useState,useEffect } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardActions, CardBody, CardFooter, CardFooterRight, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import { getAssignedList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import CommonAssignRow from '../../Common/CommonAssignRow';
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';


const AssignList = () => {


	const dispatch = useDispatch()
	
	const { CategoryList,error,Loading,token,totalAssignPage,success,AssignLists} = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	useEffect(()=>{
		dispatch(getAssignedList({token, currentPage, perPage}))
	},[currentPage, perPage])


	return (
		<PageWrapper title={demoPagesMenu.assignEvents.text}>
			<Page>
					<Card stretch>
					<CardHeader borderSize={1}>
						<CardLabel icon='Dvr' iconColor='info'>
							<CardTitle>Assign Events - Tickets List</CardTitle>
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
											<td>{Loading ? <Spinner color="dark" size="10" /> : 
														<Button
															color='info'
															hoverShadow='none'
															icon='Cancel'
														>
															No Assign Event-Ticket List
														</Button>
													}</td>
											<td></td>
										</tr>
									)
								}
							</tbody>
					</table>
					</CardBody>
					<CardFooter>
						<CardFooterRight>
							<ResponsivePagination
								total={totalAssignPage}
								current={currentPage}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</CardFooterRight>
					</CardFooter>
					
					</Card>
			</Page>	
		</PageWrapper>
	);
};

export default AssignList;

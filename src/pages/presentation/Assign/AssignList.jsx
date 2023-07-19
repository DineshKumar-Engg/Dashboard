import React, { useState,useEffect } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import ScrollspyNav from '../../../components/bootstrap/ScrollspyNav';
import { useDispatch, useSelector } from 'react-redux';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import { getAssignedList } from '../../../redux/Slice';
import Spinner from '../../../components/bootstrap/Spinner';
import CommonAssignRow from '../../Common/CommonAssignRow';
import { Link } from 'react-router-dom';

const AssignList = () => {

	const { darkModeStatus } = useDarkMode();
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
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
					<thead>
								<tr>
									<th scope='col' className='text-center'>
										Number Of Events
									</th>
									<th scope='col' className='text-center'>
									Number Of Tickets
									</th>
									<th scope='col' className='text-center'>
									Edit
									</th>
								</tr>
							</thead>
							<tbody  className='text-center'>
								{
									AssignLists?.length >0 ? 
									(
										onCurrentPageItems?.map((i) => (
											<CommonAssignRow
												key={i._id}
												item={i}
												selectName='selectedList'
												selectOnChange={selectTable.handleChange}
												selectChecked={selectTable.values.selectedList.includes(
													// @ts-ignore
													// i.id.toString(),
												)}
											/>
										))
									)
									:
									(
										<tr>
											<td>
											</td>
											<td>{Loading ? <Spinner color="dark" size="10" /> : <Link to='/assignEvents/assign'>
														<Button
															color='info'
															hoverShadow='none'
															icon='Add'
															isDark
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
					{/* <PaginationButtons
						// data={CategoryList}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/> */}
					</Card>
			</Page>	
		</PageWrapper>
	);
};

export default AssignList;

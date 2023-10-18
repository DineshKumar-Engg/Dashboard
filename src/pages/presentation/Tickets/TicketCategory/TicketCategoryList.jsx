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
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import PaginationButtons, { dataPagination } from '../../../../components/PaginationButtons';
import { errorMessage, getCategoryList, getTicketCategoryList, loadingStatus, successMessage } from '../../../../redux/Slice';
import CommonTicketRow from '../../../Common/CommonTicketRow';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'

const TicketCategoryList = () => {
	const dispatch = useDispatch()

	const { error, Loading, TicketCategoryList, totalTicketCategoryPage, token, success } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);





	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		if (success) {
			dispatch(getTicketCategoryList({ token, currentPage, perPage }));
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

	
	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
	}, [error, success]);

	
	useEffect(() => {
		dispatch(getTicketCategoryList({ token, currentPage, perPage }));
	}, [token, currentPage, perPage])



	return (
		<PageWrapper title={demoPagesMenu.ticketPages.subMenu.ticketCategory.text}>

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
									<th scope='col' className='text-center'>
										Delete
									</th>
								</tr>
							</thead>
							<tbody className='text-center'>

								{
									TicketCategoryList.length > 0 ?
										(

											TicketCategoryList?.map((i) => (
												<CommonTicketRow
													key={i._id}
													item={i}

												/>
											))
										)
										:
										(
											<>
												<tr>
													<td></td>
													<td>{Loading ? <Spinner color="dark" size="10" /> :
														<Button
															color='info'
															hoverShadow='none'
															icon='Cancel'
														>
															No Ticket Category List
														</Button>
													}</td>
													<td></td>
												</tr>
											</>
										)
								}
							</tbody>
						</table>
					</CardBody>
					<ResponsivePagination
						total={totalTicketCategoryPage}
						current={currentPage}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TicketCategoryList;

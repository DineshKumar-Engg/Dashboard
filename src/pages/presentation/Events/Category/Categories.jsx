import { useEffect, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { demoPagesMenu } from '../../../../menu';
import Icon from '../../../../components/icon/Icon';
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList } from '../../../../redux/Slice';
import CommonTableRow from '../../../Common/CommonTableRow';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/bootstrap/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'


const Category = () => {

	const dispatch = useDispatch()

	const { CategoryList, error, Loading, token, success, totalCategoryPage } = useSelector((state) => state.festiv)

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);



	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
		})
		if (success) {
			dispatch(getCategoryList({ token, currentPage, perPage }));
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
		dispatch(getCategoryList({ token, currentPage, perPage }));
	}, [token, currentPage, perPage])

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.categories.text}>

			<Page>
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='Dvr' iconColor='info'>
							<CardTitle>Event Category List</CardTitle>
						</CardLabel>
						<CardActions>
							<Link to='/newCategory'>
								<Button
									color='light'
									hoverShadow='none'
									icon='Add'
								>
									Add New Category

								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='text-center'>Category Name</th>
									<th scope='col' className='text-center'>
										Number Of Events
									</th>
									<th scope='col' className='text-center'>
										Delete
									</th>
								</tr>
							</thead>
							<tbody className='text-center' >
								{
									CategoryList?.length > 0 ?
										(

											CategoryList?.map((i) => (
												<CommonTableRow
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
															No Event Category List
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

					<CardFooter>
						<CardFooterRight>
							<ResponsivePagination
								total={totalCategoryPage}
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

export default Category;

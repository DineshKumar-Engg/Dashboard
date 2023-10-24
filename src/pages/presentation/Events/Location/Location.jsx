import { useEffect, useState } from 'react';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import { Link } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import { citylist, EventFilter, getLocationList, statelist } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from './TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';
import { eventList } from '../../../../redux/Slice';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'
import { MultiSelect } from 'primereact/multiselect';
import Label from '../../../../components/bootstrap/forms/Label';
import { Col, Row } from 'react-bootstrap';

const ListFluidPage = () => {






	const { LocationList, error, canva, Loading, totalLocationpage, token, success, stateLists, cityLists } = useSelector((state) => state.festiv)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [stateSelect, SetState] = useState('')
	const [citySelect, SetCity] = useState('')

	const handleClearFilter = () => {
		SetState('')
		SetCity('')
		dispatch(EventFilter({ EventId: '' }))
		dispatch(getLocationList({ token, currentPage, perPage }))
	}

	useEffect(() => {

		dispatch(statelist(token))
		dispatch(citylist(stateSelect))
	}, [stateSelect])



	const Notification = (val, tit, pos, ico, btn) => {
		Swal.fire({
			position: `${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
		})
		if (success) {
			dispatch(eventList())
			dispatch(getLocationList({ token, currentPage, perPage }))
		}
		clearErrors();
		clearSuccesses();
		setLoadingStatus(false);
	}



	useEffect(() => {
		error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
		success && Notification(success, scc, posTop, sccIcon, BtnGreat)
	}, [error, success]);


	useEffect(() => {
		let apiParams = { token, currentPage, perPage }

		if(stateSelect || citySelect){
			apiParams = {...apiParams,stateSelect,citySelect}
		}
		dispatch(getLocationList(apiParams));
	
	}, [dispatch, token, currentPage, perPage, stateSelect, citySelect]);



	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='AddLocationAlt' iconColor='info'>
							<CardTitle>Location</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex gap-5 justify-content-center align-items-center'>
								<div  className='mt-4'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div className='filterSelect'>
									<Label>Filter State</Label>
									<MultiSelect value={stateSelect} onChange={(e) => SetState(e.value)} options={stateLists} optionLabel="label" display="chip"
										placeholder="Select State" className='w-100' />
								</div>
								<div className='filterSelect'>
									<Label>Filter City</Label>
									<MultiSelect value={citySelect} onChange={(e) => SetCity(e.value)} options={cityLists} optionLabel="label" display="chip"
										placeholder="Select City" className='w-100' />
								</div>
								<div  className='cursor-pointer mt-4 filterSelect' onClick={handleClearFilter} >
									{stateSelect && (
										<Button
											color='info'
											hoverShadow='none'
											icon='Clear'
										>
											Clear filters
										</Button>
									)
									}

								</div>
							</div>

						</CardActions>
						<CardActions>
							<Link to='/newLocation'>
								<Button
									color='light'
									hoverShadow='none'
									icon='AddLocation'
								>
									Add New Location
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' className='text-center'>
										Location Name</th>
									<th scope='col' className='text-center'>
										Address Name</th>
									<th scope='col' className='text-center'>
										Number Of Events
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
									LocationList?.length > 0 ?
										(
											LocationList?.map((i) => (
												<CommonLocationRow
													key={i._id}
													{...i}
													item={i}
												/>
											))
										)
										:
										<Spinner color="dark" size="10" /> && (
											<>
												<tr>
													<td></td>
													<td></td>
													<td>{Loading ? <Spinner color="dark" size="10" /> :
														<Button
															color='info'
															hoverShadow='none'
															icon='Cancel'
														>
															No Event Location List
														</Button>
													}</td>
													<td></td>
													<td></td>
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
								total={totalLocationpage}
								current={currentPage}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</CardFooterRight>
					</CardFooter>
				</Card>

				{canva && <TableDetails />}

			</Page>
		</PageWrapper>
	);
};

export default ListFluidPage;

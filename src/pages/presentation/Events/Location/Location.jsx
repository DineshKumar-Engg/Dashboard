import React, { useEffect, useState } from 'react'; import dayjs from 'dayjs';
import { Calendar as DatePicker } from 'react-date-range';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
// import CommonUpcomingEvents from '../../_common/CommonUpcomingEvents';
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
import { citylist, getLocationList, statelist } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from './TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import { errorMessage, eventList, loadingStatus, successMessage } from '../../../../redux/Slice';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';

const ListFluidPage = () => {
	const { LocationList, error, canva, Loading, token, success, stateLists, cityLists } = useSelector((state) => state.festiv)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const onCurrentPageItems = dataPagination(LocationList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const [stateSelect,SetState]=useState('')
	const [citySelect,SetCity]=useState('')

	const handleClearFilter=()=>{
		SetState('')
		SetCity('')
		dispatch(getLocationList({ token, currentPage, perPage}))
	}

	useEffect(() => {
        dispatch(statelist(token))
        dispatch(citylist(stateSelect))
    }, [stateSelect])

	const handleSave = (val) => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
		if (success) {
			dispatch(eventList())
			dispatch(getLocationList({ token, currentPage, perPage }))
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))
	};
	useEffect(() => {
		dispatch(getLocationList({ token, currentPage, perPage}))
	}, [token, currentPage, perPage])
	
	useEffect(()=>{
		dispatch(getLocationList({stateSelect,citySelect,token}))
	},[token,stateSelect,citySelect])

	useEffect(() => {
		error && handleSave(error)
		success && handleSave(success)
	}, [success, error])

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='AddLocationAlt' iconColor='info'>
							<CardTitle>Location</CardTitle>
						</CardLabel>
						<CardActions>
							<div className='d-flex align-item-center justify-content-center'>
								<div className='filterIcon'>
									<Icon icon='Sort' size='2x' className='h-100'></Icon>
								</div>
								<div  className='mx-4 SelectDesign'>
								
								<Select placeholder='Filter State' onChange={(e)=>SetState(e.target.value)}>
							{
                                stateLists?.length>0 ?
                                (
                                    stateLists.map((item, index) => (
                                        <Option key={index} value={item?.value}>{item?.label}</Option>
                                    ))
                                )
                                :
                                (
                                    <Option value=''>Please wait,Loading...</Option>
                                )
                                                         
                            }
							</Select>
								</div>
								<div className='mx-4 SelectDesign'>
								<Select placeholder='Filter City' onChange={(e)=>SetCity(e.target.value)}>
							{
                            cityLists?.length > 0 ?
                            (
                                cityLists?.map((items, index) => (
                                    <Option slot='4' key={index} value={items?.value}>{items?.label}</Option>
                                ))
                            )
                            :
                            (
                                <Option value=''>Please Select State...</Option>
                            )
                            }
							</Select>

								</div>
								<div className='cursor-pointer d-flex align-items-center ' onClick={handleClearFilter} >
									<p className='mx-1 mb-0 text-info fw-bold d-flex align-item-center' ><u>Clear filters</u></p>
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
											onCurrentPageItems?.map((i) => (
												<CommonLocationRow
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
													<td>{Loading ? <Spinner color="dark" size="10" /> : 
														<Button
															color='info'
															hoverShadow='none'
															icon='CancelPresentation'
															isDark
														>
															No data presents
														</Button>
													}</td>
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
						data={LocationList}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>

				{canva && <TableDetails />}

			</Page>
		</PageWrapper>
	);
};

export default ListFluidPage;

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
import { getLocationList } from '../../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useSelectTable from '../../../../hooks/useSelectTable';
import CommonLocationRow from '../../../Common/CommonLocationRow';
import TableDetails from './TableDetails';
import Spinner from '../../../../components/bootstrap/Spinner';

const ListFluidPage = () => {
	useEffect(() => {
		dispatch(getLocationList())
	}, [dispatch])

	const { LocationList, error,canva ,Loading} = useSelector((state) => state.festiv)

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(3);

	const onCurrentPageItems = dataPagination(LocationList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const dispatch = useDispatch()


	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader borderSize={1}>
						<CardLabel icon='AddLocationAlt' iconColor='info'>
							<CardTitle>Location</CardTitle>
						</CardLabel>
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
										Name of the location</th>
									<th scope='col' className='text-center'>
										Associated Events
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
									LocationList.length >0 ?
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
										
									Loading && <Spinner color="dark" size="10" /> || <tr className='text-end fs-5'>No Location List</tr>
											
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

				{canva && <TableDetails/>}

			</Page>
		</PageWrapper>
	);
};

export default ListFluidPage;

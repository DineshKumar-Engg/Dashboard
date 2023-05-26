import React, { useEffect, useState } from 'react';import dayjs from 'dayjs';
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

const ListFluidPage = () => {
	useEffect(() => {
		dispatch(getLocationList())
	}, [dispatch])
	// const { themeStatus } = useDarkMode();

	// const [date, setDate] = useState<Date>(new Date());
	const { LocationList,error } = useSelector((state) => state.festiv)

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(3);

	const onCurrentPageItems = dataPagination(LocationList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const dispatch = useDispatch()



	console.log(LocationList);
	console.log(error);

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.location.text}>
				<Page>
				<div className="row">
					<div className="col-lg-6">
						<Button
								className='w-20 py-3 my-3 fs-4'
								hoverShadow='none'
							>
								<Icon icon='AddLocationAlt' size='2x'></Icon>
								Event Location List
							</Button>
					</div>
					<div className='col-lg-6 text-end'>
						<Link to='/newLocation'>
							<Button
								className='w-20 py-3 my-3'
								color='light'
								hoverShadow='none'
								icon='AddLocation'
							>
								Add New Location
							
							</Button>
						</Link>
					</div>
				</div>

				<Card stretch data-tour='list'>
				{/* <CardHeader>
								<CardLabel icon='AddLocationAlt' iconColor='success'>
									<CardTitle>Event Location List</CardTitle>
								</CardLabel>
				</CardHeader> */}
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
									onCurrentPageItems?.map((i) => (
										<CommonLocationRow
											key={i.id}
											{...i}
											item={i}
											selectName='selectedList'
											selectOnChange={selectTable.handleChange}
											selectChecked={selectTable.values.selectedList.includes(
												// @ts-ignore
												// i.id.toString(),
											)}
										/>
									))
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
			</Page>
			
		</PageWrapper>
	);
};

export default ListFluidPage;

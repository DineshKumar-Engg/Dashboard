import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import classNames from 'classnames';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/bootstrap/Button';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Popovers from '../../../../components/bootstrap/Popovers';

import data from '../../../../common/data/dummyProductData';
import { demoPagesMenu } from '../../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import useSortableData from '../../../../hooks/useSortableData';
import Icon from '../../../../components/icon/Icon';
import useSelectTable from '../../../../hooks/useSelectTable';
import useDarkMode from '../../../../hooks/useDarkMode';
import useTourStep from '../../../../hooks/useTourStep';
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList } from '../../../../redux/Slice';
import CommonTableRow from '../../../Common/CommonTableRow';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';
import ResponsivePagination from 'react-responsive-pagination';

const Category = () => {

	const dispatch = useDispatch()

	const { CategoryList, error, Loading, token, success,totalCategoryPage } = useSelector((state) => state.festiv)

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const onCurrentPageItems = dataPagination(CategoryList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const handleSave = (val) => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
		);
		if (success) {
			dispatch(getCategoryList({ token, currentPage, perPage }));
		}
		dispatch(errorMessage({ errors: '' }))
		dispatch(successMessage({ successess: '' }))
		dispatch(loadingStatus({ loadingStatus: false }))
	};

	useEffect(() => {
		error && handleSave(error)
		success && handleSave(success)
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
					<CardBody className='table-responsive'  isScrollable>
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
											<>

												<tr>
													<td></td>
													<td>{Loading ? <Spinner color="dark" size="10" /> : <Link to='/newCategory'>
														<Button
															color='info'
															hoverShadow='none'
															icon='Add'
															isDark
														>
															Add New Category
														</Button>
													</Link>}</td>
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
        onPageChange={(page)=>setCurrentPage(page)}
      />
						</CardFooterRight>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default Category;

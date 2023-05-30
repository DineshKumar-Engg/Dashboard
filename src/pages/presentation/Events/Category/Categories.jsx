import React, { useEffect, useState } from 'react';
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
// import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
// import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../../components/bootstrap/Button';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
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
// import CommonFilterTag from '../../_common/CommonFilterTag';
// import CommonTableRow from '../../_common/CommonTableRow';
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

const Category = () => {

	const dispatch = useDispatch()
	const { CategoryList,error,Loading,success } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(3);

	const onCurrentPageItems = dataPagination(CategoryList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	useEffect(() => {
		dispatch(errorMessage({ errors: '' }))
		dispatch(getCategoryList())
	}, [dispatch])





	console.log(CategoryList)
	console.log(error);

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
									icon='AddLocation'
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
									<th scope='col' className='text-center'>Event Category Name</th>
									<th scope='col' className='text-center'>
										Number Of Events
									</th>
								</tr>
							</thead>
							<tbody className='text-center'>

								{
									CategoryList.length > 0 ? 
									(
										
											onCurrentPageItems?.map((i) => (
												<CommonTableRow
													key={i.id}
													{...i}
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
									Loading && <Spinner color="dark" size="10" /> || <tr className='text-end fs-5'>No Catrgory List</tr>

									)

								}
								
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={CategoryList}
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

export default Category;

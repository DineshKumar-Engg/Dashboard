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

const Category = () => {

	const dispatch = useDispatch()
	const { CategoryList,error } = useSelector((state) => state.festiv)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(3);

	const onCurrentPageItems = dataPagination(CategoryList, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);



	useEffect(() => {
		dispatch(getCategoryList())
	}, [dispatch])

	console.log(CategoryList)
	console.log(error);

	return (
		<PageWrapper title={demoPagesMenu.eventPages.subMenu.categories.text}>

			<Page>
				<div className="row">
					<div className="col-lg-6">
						<h4>Event Category List</h4>
					</div>
					<div className='col-lg-6 text-end'>
						<Link to='/newCategory'>
							<Button
								className='w-20 py-2 my-2'
								color='light'
								// isdark
								hoverShadow='none'
								isLink
								icon='Add'
							>
								Add New Category
								{/* <div className='row d-flex align-items-center'>
					<div className='col-auto'>
						<Icon
							icon={icon}
							forceFamily={forceFamily}
							style={{
								fontSize: 'calc(1vh + 1vw)',
							}}
						/>
					</div>
					<div className='col-auto'>{icon}</div>
				</div> */}
							</Button>
						</Link>
					</div>
				</div>

				<Card stretch data-tour='list'>
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
							<tbody>
								{
									onCurrentPageItems.map((i) => (
										<CommonTableRow
											key={i.id}
											{...i}
											selectName='selectedList'
											selectOnChange={selectTable.handleChange}
											selectChecked={selectTable.values.selectedList.includes(
												// @ts-ignore
												i.id.toString(),
											)}
										/>
									))
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

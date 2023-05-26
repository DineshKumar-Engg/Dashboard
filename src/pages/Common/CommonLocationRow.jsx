import React, { useState, FC } from 'react';
// import dayjs from 'dayjs';
// import { FormikHelpers, useFormik } from 'formik';
import classNames from 'classnames';
// import { Calendar as DatePicker } from 'react-date-range';
// import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
// import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
// import Page from '../../../layout/Page/Page';
// import Card, {
// 	CardActions,
// 	CardBody,
// 	CardHeader,
// 	CardLabel,
// 	CardTitle,
// } from '../../../components/bootstrap/Card';
// import { priceFormat } from '../../../helpers/helpers';
// import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
// import OffCanvas, {
// 	OffCanvasBody,
// 	OffCanvasHeader,
// 	OffCanvasTitle,
// } from '../../../components/bootstrap/OffCanvas';
// import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import Input from '../../../components/bootstrap/forms/Input';
// import Textarea from '../../../components/bootstrap/forms/Textarea';
// import Checks from '../../../components/bootstrap/forms/Checks';
// import Popovers from '../../../components/bootstrap/Popovers';
// import data from '../../../common/data/dummyEventsData';
// import USERS from '../../../common/data/userDummyData';
// import { demoPagesMenu } from '../../../menu';
// import useDarkMode from '../../../hooks/useDarkMode';
import Accordion, { AccordionItem } from '../../components/bootstrap/Accordion';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';
import useOpenController from './ToggleHooks';
import { ExpendableButton } from './ExpandableButton';
import TableDetails from '../presentation/Events/Location/TableDetails';
import { Link } from 'react-router-dom';


const CommonLocationRow = ({ item }) => {

    const { isOpen, toggle } = useOpenController(false);
    const handleUpcomingEdit = () => {
        console.log("click");
    }

    const { darkModeStatus } = useDarkMode();

    


    return (
        <>
            <tr>
                <td>
                    <div className=' td-flex'>
                        {item?.locationName}
                    </div>
                </td>
                <td>
                    <span className='text-nowrap'>

                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Link to={`/editLocation/${item?._id}`}>
                        <Button
                            isOutline={!darkModeStatus}
                            color='dark'
                            isLight={darkModeStatus}
                            className={classNames('text-nowrap', {
                                'border-light': !darkModeStatus,
                            })}
                            icon='Edit'
                            onClick={(item)=>{console.log(item)}}>
                            Edit
                        </Button>
                        </Link>
                    </div>
                </td>
                <td>
                    <div className=' td-flex'>
                        <ExpendableButton isOpen={isOpen} toggle={toggle} />
                    </div>
                </td>
            </tr>
            {isOpen && <TableDetails items={item} />}
        </>
    )
}
// => {
// 	const { darkModeStatus } = useDarkMode();

// 	const dummyOptions: ApexOptions = {
// 		colors: [color],
// 		chart: {
// 			type: 'line',
// 			width: 100,
// 			height: 35,
// 			sparkline: {
// 				enabled: true,
// 			},
// 		},
// 		tooltip: {
// 			theme: 'dark',
// 			fixed: {
// 				enabled: false,
// 			},
// 			x: {
// 				show: false,
// 			},
// 			y: {
// 				title: {
// 					// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 					formatter(seriesName: string) {
// 						return '';
// 					},
// 				},
// 			},
// 		},
// 		stroke: {
// 			curve: 'smooth',
// 			width: 2,
// 		},
// 	};






//   return (
//     <>
// 		 <tr>
//     <td>
//             <div className=' td-flex'>
//             { locationName }
//             </div>
//     </td>
//     <td>
//         <span className='text-nowrap'>

//         </span>
//     </td>
//     <td>
//         <div className=' td-flex'>
//         <Button
//             isOutline={!darkModeStatus}
//             color='dark'
//             isLight={darkModeStatus}
//             className={classNames('text-nowrap', {
//                 'border-light': !darkModeStatus,
//             })}
//             icon='Edit'
//             onClick={handleUpcomingEdit}>
//             Edit
//         </Button>
//         </div>
//     </td>
//     <td>

//     </td>
// </tr>									
//     </>

//   )
// };

export default CommonLocationRow
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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryFilter, LocationFilter, canvaBoolean, canvaData, deleteLocationList } from '../../redux/Slice';
import showNotification from '../../components/extras/showNotification';


const CommonLocationRow = ({ item, indexs }) => {

    // const { isOpen, toggle } = useOpenController(false);
    const { canva, token } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { darkModeStatus } = useDarkMode();

    // const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);

    const handleUpcomingEdit = (i) => {
        // setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
        dispatch(canvaBoolean({ canvas: !canva }))
        dispatch(canvaData({ canvaDatas: i }))
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteLocationList({ token, id }))
    }
    const handleFilterId = (id) => {
        dispatch(LocationFilter({ LocationFilterId: id }))
        dispatch(CategoryFilter({ CategoryFilterId: '' }))
        navigate('/events/event-details')
    }

    const handleSave = (val) => {
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,
        );
    };

    
    const handleEditPage = () => {
        if(item?.numberOfEvents == 0){
            navigate(`/editLocation/${item?._id}`)
        }else{
            handleSave("This location assigned to the event can't allow to edit")
        }
    }




    return (
        <>
            <tr>
                <td>
                    <div className=' td-flex text-center'>
                        {item?.locationName}
                    </div>
                </td>
                <td>
                    <div className=' td-flex text-center'>
                        {item?.address}
                    </div>
                </td>
                <td style={{ cursor: "pointer" }} onClick={() => handleFilterId(item?._id)}>
                    <span className='td-flex text-center'>
                        {item?.numberOfEvents > 0 ? <p className='text-success'>{item?.numberOfEvents}{" "}Events</p> : <p className='text-danger'>{item?.numberOfEvents}{" "}Events</p>}
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                            <Button
                                icon='Edit'
                                onClick={()=>handleEditPage(item?._id)}
                            >
                            </Button>
                    </div>
                </td>
                <td className='text-center'>
                    <span>
                        <Button
                            icon='Delete'
                            onClick={() => handleDeleteClick(item?._id)}
                        >
                        </Button>
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Button
                            icon="ArrowRight"
                            onClick={() => { handleUpcomingEdit(item) }}
                        >
                        </Button>
                    </div>
                </td>
            </tr>
        </>
    )
}


export default CommonLocationRow
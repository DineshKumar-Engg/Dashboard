import React, { useState, FC } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import Accordion, { AccordionItem } from '../../components/bootstrap/Accordion';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';
import useOpenController from './ToggleHooks';
import { ExpendableButton } from './ExpandableButton';
import TableDetails from '../presentation/Events/Location/TableDetails';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryFilter, LocationFilter, canvaBoolean, canvaData, deleteLocationList } from '../../redux/Slice';
import Swal from 'sweetalert2'
import {  poscent, errIcon,BtnCanCel} from '../presentation/Constant';

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

    const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
	}

    
    const handleEditPage = () => {
        if(item?.numberOfEvents == 0){
            navigate(`/editLocation/${item?._id}`)
        }else{
            const errTitle = 'Oops !'
            const message = "Location assigned to the event not allowed to edit"
            Notification(message,errTitle,poscent,errIcon,BtnCanCel)
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
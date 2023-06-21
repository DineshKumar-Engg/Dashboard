import React, { useState, FC, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean, canvaData, deleteEventList, statusChange } from '../../redux/Slice';
import { useFormik } from 'formik';
import Checks from '../../components/bootstrap/forms/Checks';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../components/bootstrap/Modal';
import Popovers from '../../components/bootstrap/Popovers';
import showNotification from '../../components/extras/showNotification';
import { errorMessage, loadingStatus, successMessage } from '../../redux/Slice';
import Spinner from '../../components/bootstrap/Spinner';



export const ModalCheck = ({ isOpen, setIsOpen, ids, status }) => {

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.festiv)

    const statusChanges = !status
    const handleStatus = () => {
        dispatch(statusChange({ statusChanges, ids, token }))
        setIsOpen(false)
    }

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' isCentered={true} isAnimation={true}>
                <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                    <ModalTitle id={ids} >Confirm status</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Please Click Confirm to change event status ?
                </ModalBody>
                <ModalFooter>
                    <Button isLight color='dark' icon='Send'
                        onClick={handleStatus}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}



const CommonEventRow = ({ item }) => {


    const { canva, token } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const { darkModeStatus } = useDarkMode();

    const [editModalStatus, setEditModalStatus] = useState(false);
    const handleUpcomingEdit = (i) => {
        dispatch(canvaBoolean({ canvas: !canva }))
        dispatch(canvaData({ canvaDatas: i }))
    };


    const handleClickEdit = () => {
        setEditModalStatus(true);
    };


    const handleDeleteClick = (id) => {
        dispatch(deleteEventList({ token, id }))
    }

    const handleEditItem =(item)=>{
        console.log(item);
        localStorage.setItem("EditItem",item)
    }





    return (
        <>
            <tr>
                <td>
                    <div className=' td-flex'>
                        {item?.eventName?.charAt(0).toUpperCase() + item?.eventName?.slice(1)}
                    </div>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.createdAt?.substring(0, 10)}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.eventCategoryId}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex toggleSwitch'>
                        <Popovers title='Alert !' trigger='hover' desc='Are you sure, you want to change event status ?' isDisplayInline="true">
                            <Checks
                                type='switch'
                                id='status'
                                name='status'
                                onClick={() => handleClickEdit(item?._id)}
                                checked={item?.status}
                                onChange={() => { item?.status }}
                            />
                        </Popovers>
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Link to={`/editEvent/${item?._id}`}>
                            <Button
                                icon='Edit'
                            >
                            </Button>
                        </Link>
                    </div>
                </td>
                <td className='text-center'>
                    <span>
                        <Button
                            isOutline={!darkModeStatus}
                            icon='Delete'
                            onClick={() => handleDeleteClick(item?._id)}
                        >
                        </Button>
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Button
                            isOutline={!darkModeStatus}
                            icon="ArrowRight"
                            onClick={() => { handleUpcomingEdit(item) }}
                        >
                        </Button>
                    </div>
                </td>

            </tr>
            {
                <ModalCheck
                    setIsOpen={setEditModalStatus}
                    isOpen={editModalStatus}
                    ids={item?._id}
                    status={item?.status}
                />
            }
        </>
    )
}


export default CommonEventRow
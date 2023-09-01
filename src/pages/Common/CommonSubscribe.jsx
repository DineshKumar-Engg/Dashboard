import React, { useState, FC, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventFilter, UpdateSubscribeStatus, canvaBoolean, canvaData, deleteEventList, getEventByTicket, getTicketDataLists, statusChange } from '../../redux/Slice';
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

        console.log( statusChanges, ids, token);
        dispatch(UpdateSubscribeStatus({ statusChanges, ids, token }))
        setIsOpen(false)
    }

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' isCentered={true} isAnimation={true}>
                <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                    <ModalTitle id={ids} >Confirm status</ModalTitle>
                </ModalHeader>
                <ModalBody>
                   <h6> Please Click Confirm to Unsubscribe Email ?</h6>
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



const CommonSubscribe = ({ item }) => {

    const [editModalStatus, setEditModalStatus] = useState(false);

    return (
        <>
            <tr>
                <td className='text-center'>
                    <span className='h6'>
                        <p className='fs-6'>{item?.createdAt.split('T')[0]}</p>
                    </span>
                </td>
                <td className='text-center'>
                    <span className='h6'>
                        <p className='fs-6'>{item?.email} </p>
                    </span>
                </td>
                <td className='text-center'>
                    <span className='text-nowrap  td-flex toggleSwitch'>
                        <Popovers title='Alert !' trigger='hover' desc='Are you sure, you want to change event status ?' isDisplayInline={"true"}>
                            <Checks
                                type='switch'
                                id='status'
                                name='status'
                                onClick={() => setEditModalStatus(true)}
                                checked={item?.status}
                                onChange={() => { item?.status }}
                            />
                        </Popovers>
                    </span>
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


export default CommonSubscribe
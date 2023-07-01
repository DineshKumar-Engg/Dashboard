import React, { useState,useEffect, FC } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TicketstatusChange, canvaBoolean,canvaData,deleteTicketList,getTicketDetails,getTicketLists,statusChange } from '../../redux/Slice';
import { useFormik } from 'formik';
import Checks from '../../components/bootstrap/forms/Checks';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Popovers from '../../components/bootstrap/Popovers';


export const ModalCheck =({isOpen,setIsOpen,ids,status})=>{
    const { token } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
 //    const { status } = useSelector((state) => state.festiv)

     const statusChanges = !status
     const handleStatus = ()=>{
         dispatch(TicketstatusChange({statusChanges,ids,token}))
         setIsOpen(false)
     }
 
     return(
         <>
         <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' isCentered={true}  isAnimation={true}>
                 <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                     <ModalTitle id={ids} >Confirm status</ModalTitle>
                 </ModalHeader>
                 <ModalBody>
                 Please Click Confirm to change ticket status ?
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









const CommonTicketListRow = ({ item }) => {


    const { canva,token } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const { darkModeStatus } = useDarkMode();

    const [editModalStatus, setEditModalStatus] = useState(false);

    const handleUpcomingEdit = (id) => {
        dispatch(canvaBoolean({ canvas: !canva }))
        // dispatch(canvaData({ canvaDatas: i }))
        dispatch(getTicketDetails({token,id}))
    };
    
    const handleClickEdit = () => {
		setEditModalStatus(true);
	};


    const handleDeleteClick = (id) => {
        dispatch(deleteTicketList({ token, id }))
    }


    return (
        <>
            <tr>
                <td>
                    <div>
                        {item?.ticketName}
                        {
                                item?.numberOfEvents > 0 ? 
                                (<p className="text-success" style={{margin:"0px"}}>{item?.numberOfEvents} Events</p>)
                                :
                                (<p className="text-danger"  style={{margin:"0px"}}>0 Events {" "}
                                <Link to={'/assignEvents/assign'}>+ Assign Events</Link>
                                </p>)
                        }
                    </div>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.updatedAt?.substring(0, 10)}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.ticketCategoryId}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex toggleSwitch'>
                    <Popovers title='Alert !' trigger='hover'  desc='Are you sure, you want to change ticket status ?' isDisplayInline="true">
                        <Checks
                            type='switch'
                            id='inlineCheckOne'
                            name='checkOne'
                            onClick={()=>handleClickEdit()}
                            checked={item?.status}
                            onChange={()=>{item?.status}}
                           
                        />
                 </Popovers>

                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Link to={`/editTicket/${item?._id}`}>
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
                            onClick={() => { handleUpcomingEdit(item?._id) }}
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


export default CommonTicketListRow
import React, { useState,useEffect, FC } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryFilter, EventFilter, LocationFilter, TicketFilter, TicketstatusChange, canvaBoolean,canvaData,deleteTicketList,getTicketDetails,getTicketLists,statusChange } from '../../redux/Slice';
import { useFormik } from 'formik';
import Checks from '../../components/bootstrap/forms/Checks';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Popovers from '../../components/bootstrap/Popovers';
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../presentation/Constant';
import Swal from 'sweetalert2'


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
    const navigate = useNavigate()
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
    const handleFilter=(id)=>{
        dispatch(TicketFilter({TicketId:id}))
        dispatch(LocationFilter({LocationFilterId:''}))
        dispatch(CategoryFilter({CategoryFilterId:''}))
        dispatch(EventFilter({EventId:''}))
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
            navigate(`/editTicket/${item?._id}`)
        }else{
            const errTitle = 'Oops !'
            const message = "Event assigned to the ticket not allowed to edit"
            Notification(message,errTitle,poscent,errIcon,BtnCanCel)
        }
    }



    return (
        <>
            <tr>
                <td>
                    <div>
                        {item?.ticketName}
                        {
                                item?.numberOfEvents > 0 ? 
                                (<p className="text-success" style={{margin:"0px",cursor:"pointer"}} onClick={()=>handleFilter(item?._id)}>{item?.numberOfEvents} Events</p>)
                                :
                                (
                                <div
                                    onClick={()=>{
                                        navigate('/assign',{
                                            state:[item?._id,"Ticket"],
                                        })
                                    }}
                                     style={{margin:"0px",cursor:"pointer"}}
                                    >
                                    <span className="text-danger" >0 Events {" "}</span>
                                    <span className='text-primary'>+ Assign</span>
                                </div>
                                )
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
                        {item?.ticketCategoryName}
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
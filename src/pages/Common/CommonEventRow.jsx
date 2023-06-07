import React, { useState, FC, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean, canvaData, statusChange, statusCheckMark } from '../../redux/Slice';
import { useFormik } from 'formik';
import Checks from '../../components/bootstrap/forms/Checks';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Popovers from '../../components/bootstrap/Popovers';


export const ModalCheck =({isOpen,setIsOpen,ids})=>{
    
	const dispatch = useDispatch()

    console.log("id",ids);

    const handleStatus = ()=>{
        dispatch(statusChange(id))
        setIsOpen(false)
    }

    return(
        <>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' isCentered={true}  isAnimation={true}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={ids} >Confirm status</ModalTitle>
				</ModalHeader>
                <ModalBody>
                    Please Click Confirm ,to close status
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



const CommonEventRow = ({ item}) => {


    const { canva } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const { darkModeStatus } = useDarkMode();

    const [editModalStatus, setEditModalStatus] = useState(false);
    const handleUpcomingEdit = (i) => {
        dispatch(canvaBoolean({ canvas: !canva }))
        dispatch(canvaData({ canvaDatas: i }))
    };

    // console.log(status);

    const handleClickEdit = (id) => {
        console.log(id);
		setEditModalStatus(true);
	};







    

    return (
        <>
            <tr>
                <td>
                    <div className=' td-flex'>
                        {item?.eventName}
                    </div>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.createdAt?.substring(0, 10)}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.eventCategoryId?.categoryName}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex toggleSwitch'>
                       <Popovers title='Alert !' trigger='hover'  desc='Are you sure to change switch status ?' isDisplayInline="true">
                       <Checks
                            type='switch'
                            id='status'
                            name='status'
                            onClick={()=>handleClickEdit(item?._id)}
                            checked={item?.status}
                            // onChange={item?.status}
                            // value={item?.status}
                        />
                       </Popovers>
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Link to={`/editEvent/${item?._id}`}>
                            <Button
                                isOutline={!darkModeStatus}
                                color='dark'
                                isLight={darkModeStatus}
                                className={classNames('text-nowrap', {
                                    'border-light': !darkModeStatus,
                                })}
                                icon='Edit'
                            >
                                
                            </Button>
                        </Link>
                    </div>
                </td>
                <td>
                    <div className=' td-flex'>
                        {/* <ExpendableButton isOpen={isOpen}  toggle={toggle}/> */}
                        <Button
                            isOutline={!darkModeStatus}
                            // isLight={darkModeStatus}
                            className={classNames('text-nowrap', {
                                'border-light': !darkModeStatus,
                            })}
                            color='dark'
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
                
                />
            }
        </>
    )
}


export default CommonEventRow
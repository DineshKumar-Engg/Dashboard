import React, { useState, FC } from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean, canvaData } from '../../redux/Slice';
import { useFormik } from 'formik';
import Checks from '../../components/bootstrap/forms/Checks';


const CommonTicketListRow = ({ item }) => {


    const { canva } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const { darkModeStatus } = useDarkMode();


    const handleUpcomingEdit = (i) => {
        dispatch(canvaBoolean({ canvas: !canva }))
        dispatch(canvaData({ canvaDatas: i }))
    };

    const formik = useFormik({
        initialValues: {
            checkOne: true,
        },
      
        onSubmit: () => {
            setIsLoading(true);
            setTimeout(handleSave, 2000);
        },
    });

    console.log(formik.values.checkOne);

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
                        {item?.createdAt.substring(0, 10)}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        {item?.eventCategoryId?.categoryName}
                    </span>
                </td>
                <td>
                    <span className='text-nowrap  td-flex'>
                        <Checks
                            type='switch'
                            id='inlineCheckOne'
                            name='checkOne'
                            onChange={formik.handleChange}
                            checked={formik.values.checkOne}
                            value={item?.status}
                           
                        />
                    </span>
                </td>
                <td>
                    <div className=' td-flex'>
                        <Link to={`/editTicket/${item?._id}`}>
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
        </>
    )
}


export default CommonTicketListRow
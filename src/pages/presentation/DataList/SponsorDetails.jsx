import React, { useState } from 'react'
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../redux/Slice';
import Label from '../../../components/bootstrap/forms/Label';

const SponsorDetails = () => {


    const { canva, canvaList } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()


    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);


    const handleCanvaClose = () => {

        dispatch(canvaBoolean({ canvas: !canva }))
    }


    return (
        <div className='sponsor'>
            <OffCanvas
                setOpen={setUpcomingEventsEditOffcanvas}
                isOpen={upcomingEventsEditOffcanvas}
                titleId='upcomingEdit'
                isBodyScroll
                placement='end'>
                <OffCanvasHeader onClick={handleCanvaClose} setOpen={setUpcomingEventsEditOffcanvas}>
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Sponsor Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row'>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 py-2 px-2 fw-bold'>Name</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.firstname}{" "}{ canvaList?.lastName}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 py-2 px-2 fw-bold'>Organization Name</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.organizationName}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 py-2 px-2 fw-bold'>Address</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.BussinessAddress}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 py-2 px-2 fw-bold'>Location</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.city}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 py-2 px-2 fw-bold'>Zipcode</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.zipcode}</p>
                        </div>
                        <div className="col-lg-8 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2  py-2 px-2 fw-bold'>Email</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.email}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2  py-2 px-2 fw-bold'>Phone Number</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.phoneNumber}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 py-2 px-2 fw-bold'>Event</Label>
                           {
                            canvaList?.event?.map((item)=>(
                                <p className='px-2 fs-5 text-dark'>{item}</p>
                            ))
                           }
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 py-2 px-2 fw-bold'>Message</Label>
                            <p className='px-2 fs-5 text-dark'>{canvaList?.message}</p>
                        </div>
                                           
                       
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </div>
    )
}

export default SponsorDetails



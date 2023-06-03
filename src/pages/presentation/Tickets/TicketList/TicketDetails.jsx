import React, { useState } from 'react'
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../../redux/Slice';
import Label from '../../../../components/bootstrap/forms/Label';

const TicketDetails = () => {


    const { canva, canvaList } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()

    console.log("canvaList", canvaList);

    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);

    console.log("upcomingEventsEditOffcanvas", upcomingEventsEditOffcanvas);

    const handleCanvaClose = () => {

        dispatch(canvaBoolean({ canvas: !canva }))
    }



    return (
        <>
            <OffCanvas
                setOpen={setUpcomingEventsEditOffcanvas}
                isOpen={upcomingEventsEditOffcanvas}
                titleId='upcomingEdit'
                isBodyScroll
                placement='end'>
                <OffCanvasHeader onClick={handleCanvaClose} setOpen={setUpcomingEventsEditOffcanvas}>
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Ticket Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row g-4'>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-5 mt-2 text-dark py-2 px-2'>Event Name</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventName}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-5 mt-2 text-dark py-2 px-2'>Category Name</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventCategoryId?.categoryName}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 text-dark py-2 px-2'>Location Details</Label>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Location</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventLocationId?.locationName}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Address</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventLocationId?.address}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>City</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventLocationId?.city}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>State</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventLocationId?.state}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Postal Code</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventLocationId?.postalCode}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 text-dark py-2 px-2'>Event-Date</Label>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Event Form Date</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventDateFrom}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Event To Date</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventDateTo}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 text-dark py-2 px-2'>Event-Time</Label>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Event Start Time</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventDateFrom}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Event End time</Label>
                            <p className='px-2 text-muted'>{canvaList?.eventDateTo}</p>
                        </div>
                      
                        <div className="col-lg-12 col-sm-12">
                            <img src={canvaList?.eventImage} className='img-fluid rounded mx-auto d-block' alt='...' />
                        </div>
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </>
    )
}

export default TicketDetails



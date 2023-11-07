import React, { useState } from 'react'
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../../redux/Slice';
import Label from '../../../../components/bootstrap/forms/Label';

const EventCanva = () => {


    const { canva, canvaList } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()


    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);


    const handleCanvaClose = () => {

        dispatch(canvaBoolean({ canvas: !canva }))
    }

    console.log(canvaList);

    return (
        <>
            <OffCanvas
                setOpen={setUpcomingEventsEditOffcanvas}
                isOpen={upcomingEventsEditOffcanvas}
                titleId='upcomingEdit'
                isBodyScroll
                placement='end'>
                <OffCanvasHeader onClick={handleCanvaClose} setOpen={setUpcomingEventsEditOffcanvas}>
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Event Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row g-4'>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-6 mt-2 py-2 px-2'>Event Name</Label>
                            <h5 className='px-2'>{canvaList?.eventName}</h5>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-6 mt-2 py-2 px-2'>Category Name</Label>
                            <h5 className='px-2 '>{canvaList?.eventCategoryName}</h5>
                        </div>
                        
                        <div className="col-lg-6 col-sm-12">
                            <Label className=' px-2'>Location Name</Label>
                            <h5 className='px-2'>{canvaList?.eventLocationName}</h5>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className=' px-2'>Location Address</Label>
                            <h5 className='px-2 '>{canvaList?.eventLocationAddress}</h5>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                               <div>
                               <Label className='px-2'>Event Date & Time </Label>
                               </div>
                                {
                                canvaList?.eventSchedule?.map((item)=>(
                                    <div className='my-2'>
                                    <span className='fs-5 px-2'>{item?.eventDateAndTimeFrom} </span>
                                    <span>to</span>
                                    <span className='fs-5 px-2'>{item?.eventDateAndTimeTo}</span>
                                    </div>
                                ))
                                }
                        </div>
                        <div className="col-lg-6">
                            <Label className='px-2'>Event TimeZone </Label>
                            <h5 className='px-2'>{canvaList?.timeZoneName}</h5>
                        </div>
                        <div className="col-lg-6">
                            <Label className='px-2'>Ticket Assigned </Label>
                            <h5 className='px-2'>{canvaList?.numberOfTickets}</h5>
                        </div>
                        <div>
                           {
                            canvaList?.eventImage && (
                                <div className="col-lg-12 col-sm-12">
                                <img src={canvaList?.eventImage} className='img-fluid rounded mx-auto d-block' alt='...' />
                            </div>
                            )
                           }                
                       </div>
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </>
    )
}

export default EventCanva



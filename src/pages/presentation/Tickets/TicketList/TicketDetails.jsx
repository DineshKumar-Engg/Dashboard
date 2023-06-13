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
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Ticket Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row g-4'>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-5 mt-2 text-dark py-2 px-2'>Ticket Name</Label>
                            <p className='px-2 text-muted'>{canvaList?.ticketName}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='fs-5 mt-2 text-dark py-2 px-2'>Category Name</Label>
                            <p className='px-2 text-muted'>{canvaList?.ticketCategoryId}</p>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 text-dark py-2 px-2'>Sellable Date & Time </Label>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <Label className='text-dark px-2'>Sellable From Date And Time</Label>
                            <p className='px-2 text-muted'>{canvaList?.sellableDateAndTimeFrom}</p>
                        </div>
                      
                        <div className="col-lg-12 col-sm-12">
                            <Label className='text-dark px-2'>Sellable To Date And Time</Label>
                            <p className='px-2 text-muted'>{canvaList?.sellableDateAndTimeTo}</p>
                        </div>
                        
                        <div className="col-lg-12 col-sm-12">
                            <Label className='fs-5 mt-2 mt-2 text-dark py-2 px-2'>Ticket-Details</Label>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Ticket Channel</Label>
                            <p className='px-2 text-muted'>{canvaList?.ticketChannel}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Ticket Quantity</Label>
                            <p className='px-2 text-muted'>{canvaList?.totalTicketQuantity}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label className='text-dark px-2'>Purchase Limit</Label>
                            <p className='px-2 text-muted'>{canvaList?.purchaseLimit}</p>
                        </div>               
                        
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </>
    )
}

export default TicketDetails



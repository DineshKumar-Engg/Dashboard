import React, { useState } from 'react'
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../../redux/Slice';
import Label from '../../../../components/bootstrap/forms/Label';
import Card, { CardBody, CardLabel, CardTitle } from '../../../../components/bootstrap/Card';
import classNames from 'classnames';
import useDarkMode from '../../../../hooks/useDarkMode';
import CardHeader from 'react-bootstrap/esm/CardHeader';

const TicketDetails = () => {


    const { canva, TicketDetails } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
	const { darkModeStatus } = useDarkMode();


    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);


    const handleCanvaClose = () => {

        dispatch(canvaBoolean({ canvas: !canva }))
    }

    console.log(TicketDetails);


    return (
        <>
            <OffCanvas
                setOpen={setUpcomingEventsEditOffcanvas}
                isOpen={upcomingEventsEditOffcanvas}
                titleId='upcomingEdit'
                isBodyScroll
                placement='end'
                >
                <OffCanvasHeader onClick={handleCanvaClose} setOpen={setUpcomingEventsEditOffcanvas}>
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Ticket Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row g-4'>
                    <div className="col-lg-12 col-sm-12">
                            <div className='row'>
                                    {/* <div className="col-lg-6">
                                            <h6 className='fs-6 mt-2 text-dark py-2 px-2'>Ticket Name</h6>
                                        <p className='px-2 text-muted'>{TicketDetails?.General[0]?.ticketName}</p>
                                    </div>
                                    <div className="col-lg-6">
                                        
                                    </div> */}
                                    <div className="col-lg-6">
                                    <Card
                                    className={classNames('transition-base rounded-2 mb-4 text-dark', {
                                        'bg-l25-secondary bg-l10-secondary-hover': !darkModeStatus,
                                        'bg-lo50-secondary bg-lo25-secondary-hover': darkModeStatus,
                                    })}
                                    shadow='sm'
                                    >
                                    <CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h4' className='h5'>
                                    Ticket General
									</CardTitle>
								</CardLabel>
							</CardHeader>
                            <CardBody>
                            <div className="col-lg-6">
                                        <p className='px-2 text-muted'>{TicketDetails?.General[0]?.ticketName}</p>
                            </div>
                            </CardBody>
                                    </Card>
                                    </div>
                            </div>
                    </div>
                        
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </>
    )
}

export default TicketDetails


{/* <div className="col-lg-6 col-sm-12">
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
                        </div>                */}
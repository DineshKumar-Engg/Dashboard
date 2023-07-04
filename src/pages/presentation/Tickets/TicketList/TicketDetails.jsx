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
import Icon from '../../../../components/icon/Icon';
import Festiv from '../../../../assets/LogoWhiteBg.svg'
import Qr from '../../../../assets/QR.png'

const TicketDetails = () => {


    const { canva, TicketDetails } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const { darkModeStatus } = useDarkMode();


    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);


    const handleCanvaClose = () => {

        dispatch(canvaBoolean({ canvas: !canva }))
    }

    console.log(TicketDetails?.General?.length);


    return (
        <div className='ticketOffCanva'>
            <OffCanvas
                setOpen={setUpcomingEventsEditOffcanvas}
                isOpen={upcomingEventsEditOffcanvas}
                titleId='upcomingEdit'
                isBodyScroll
                placement='end'
            // isModalStyle
            // isBackdrop={false}
            >
                <OffCanvasHeader onClick={handleCanvaClose} setOpen={setUpcomingEventsEditOffcanvas}>
                    <OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Ticket Details</OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <div className='row'>
                        <div className="col-lg-12">
                            <Card
                                stretch
                                shadow='sm'
                                className={`bg-l${darkModeStatus ? 'o25' : '25'
                                    }-primary bg-l${darkModeStatus ? 'o50' : '10'
                                    }-primary-hover transition-base rounded-2 mb-4`}
                            >

                                <CardHeader className='bg-transparent'>
                                    <CardLabel>
                                        <CardTitle tag='h4' className='h5'>
                                            Ticket General
                                        </CardTitle>
                                    </CardLabel>
                                </CardHeader>
                                <CardBody>
                                    {
                                        TicketDetails?.General?.length > 0 ?
                                            (
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className='d-flex'>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Name</Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.ticketName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Category</Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.ticketCategoryId}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex mt-3'>

                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Selling Date & Time </Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.sellableDateAndTimeFrom}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Closing Date & Time </Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.sellableDateAndTimeTo}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='d-flex mt-3'>
                                                            {
                                                                TicketDetails?.General[0]?.totalTicketQuantity ?
                                                                    (
                                                                        <div className="col-lg-6">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Ticket Quantity</Label>
                                                                                <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.totalTicketQuantity}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    null
                                                            }

                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Purchase Limit</Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.purchaseLimit}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex mt-3'>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <Label className='fs-5'>Ticket Limits</Label>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.ticketType}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            null
                                    }

                                </CardBody>
                            </Card>
                        </div>
                        {
                            TicketDetails?.Redemption?.redemption?.length > 0 ?
                                (
                                    <div className="col-lg-12">
                                        <Card
                                            stretch
                                            shadow='sm'
                                            className={`bg-l${darkModeStatus ? 'o25' : '25'
                                                }-warning bg-l${darkModeStatus ? 'o50' : '10'
                                                }-warning-hover transition-base rounded-2`}>
                                            <CardHeader className='bg-transparent'>
                                                <CardLabel>
                                                    <CardTitle tag='h4' className='h5'>
                                                        Ticket Redemption
                                                    </CardTitle>
                                                </CardLabel>
                                            </CardHeader>
                                            <CardBody className='py-0'>
                                                <div className="row py-2">
                                                    <div className="col-lg-7">
                                                        {
                                                            TicketDetails?.Redemption?.redemption?.map((item, index) => (
                                                                <div className="row d-flex">
                                                                    <div className="d-block mt-2">
                                                                        <Label className='fs-5'>Ticket Redemption Date & Time</Label>
                                                                        <p className='px-2 my-1 fs-5'>{item?.redemDateAndTimeFrom}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    {/* <div className="col-lg-4 mt-2">
                                                <div className="d-block">
                                                    <Label className='fs-5'>Ticket Scan Limit</Label>
                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.Redemption?.ticketScanLimit}</p>
                                                </div>
                                            </div> */}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                                :
                                null
                        }
                    
<div className="col-lg-12">
                            <Card
                                stretch
                                shadow='sm'
                                className={`bg-l${darkModeStatus ? 'o25' : '25'
                                    }-success rounded-2`}>
                                <CardHeader className='bg-transparent'>
                                    <CardLabel>
                                        <CardTitle tag='h4' className='h5'>
                                            Fees Structure
                                        </CardTitle>
                                    </CardLabel>
                                </CardHeader>
                                <CardBody className='py-0'>
                                    <div className="row py-2">
                                        <div className="col-lg-12">

                                            <div className="row d-flex">
                                                <div className='d-flex mt-3 flex-wrap'>
                                                    {
                                                        TicketDetails?.FeesStructure?.length > 0 ?

                                                            (
                                                                TicketDetails?.FeesStructure[0]?.ticket?.map((item, index) => (
                                                                    <>
                                                                            <div className="col-lg-12 pb-3 mt-1">
                                                                            <Label className='fs-5'>Ticket Type</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.ticketType}</p>
                                                                            </div>                                                                        
                                                                            <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Ticket Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.ticketPrice?.type == "USD" ? "$" : "%"}{" "}{item?.ticketPrice?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Credit Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.creditCardFees?.type == "USD" ? "$" : "%"}{" "}{item?.creditCardFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Processing Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.processingFees?.type == "USD" ? "$" : "%"}{" "}{item?.processingFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Merchandise Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.merchandiseFees?.type == "USD" ? "$" : "%"}{" "}{item?.merchandiseFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Other Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.otherFees?.type == "USD" ? "$" : "%"}{" "}{item?.otherFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Sales Fees</Label>
                                                                                <p className='px-2 my-1 fs-5'>{item?.salesTax?.type == "Percentage" ? "%" : ""}{" "}{item?.salesTax?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 mt-3">
                                                                            <div className="d-block">
                                                                                <Label className='fs-5'>Total Ticket Price </Label>
                                                                                <p className='px-2 my-1 fs-5'>$ {" "}{item?.totalTicketPrice}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))
                                                            ) :
                                                            (
                                                                <h5>No Fees Structure Data </h5>
                                                            )

                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        
                        
                        {
                            TicketDetails?.TicketFace?._id !=null? 
                            (
<div>
                            <div className='row'>
                                <div className="container ticketFace">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-12 text-center ">
                                                    <div>
                                                        <img src={Festiv} alt="no image" className='ticketLogo' />
                                                    </div>
                                                    <div className="my-2">
                                                        <img src={Qr} alt="no image" className='ticketQr' />
                                                    </div>
                                                    <div className="pt-4">
                                                        <small><strong className="text-danger">Note: </strong> Redundant alt attribute. Screen-readers al </small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 fs-6 ml-3 mt-3">
                                                    <h5>Ticket Name </h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.ticketName}</small>
                                                    <h5 className="mt-3">Event Name </h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.eventName}</small>
                                                    <h5 className="mt-3">Order Number</h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.orderNumber}</small>

                                                    <h5 className="mt-3">Ticket Category</h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.ticketCategory}</small>

                                                </div>

                                                <div className="col-lg-6 fs-6">

                                                    <h5 className="mt-3">Location</h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.eventlocation}</small>
                                                    <h5 className="mt-3">Event Start Date & Time:</h5>

                                                    <small className='text-white'>{TicketDetails?.TicketFace?.eventDateAndTimeFrom}</small>

                                                    <h5 className="mt-3">Event End Date & Time:</h5>
                                                    <small className='text-white'>{TicketDetails?.TicketFace?.eventDateAndTimeTo}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 pt-2">
                                            <small className="fa-1x">Redundant alt attribute. Screen-readers already announce `img` tags as an image.
                                                You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.
                                                You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )
                            :
                            null
                        }
                        
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </div>
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
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
                            <Card>
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
                                                        <div className='d-block'>
                                                            <div className="col-lg-12">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Name</h6>
                                                                    <p className='px-2 fs-5'>{TicketDetails?.General[0]?.ticketName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 my-1">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Category</h6>
                                                                    <p className='px-2 fs-5'>{TicketDetails?.General[0]?.ticketCategoryId}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-block mt-3 my-1 '>
                                                            <div className="col-lg-12">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Selling Date & Time </h6>
                                                                    <p className='px-2 fs-5'>{TicketDetails?.General[0]?.sellableDateAndTimeFrom}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 my-1 ">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Closing Date & Time </h6>
                                                                    <p className='px-2  fs-5'>{TicketDetails?.General[0]?.sellableDateAndTimeTo}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex mt-3'>
                                                            {
                                                                TicketDetails?.General[0]?.totalTicketQuantity ?
                                                                    (
                                                                        <div className="col-lg-12">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Ticket Quantity</h6>
                                                                                <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.totalTicketQuantity}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                        <div className="col-lg-12">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Purchase Limit</h6>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.purchaseLimit}</p>
                                                                </div>
                                                        </div>
                                                        <div className='d-flex mt-3'>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Limits</h6>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.ticketType}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="d-block">
                                                                    <h6 className='fs-5'>Ticket Scan Limit</h6>
                                                                    <p className='px-2 my-1 fs-5'>{TicketDetails?.General[0]?.ticketScanLimit}</p>
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
                                            >
                                            <CardHeader className='bg-transparent'>
                                                <CardLabel>
                                                    <CardTitle tag='h4' className='h5'>
                                                        Ticket Redemption Date & Time
                                                    </CardTitle>
                                                </CardLabel>
                                            </CardHeader>
                                            <CardBody className='py-0'>
                                                <div className="row py-2">
                                                    <div className="col-lg-12">

                                                        {
                                                            TicketDetails?.Redemption?.redemption?.map((item, index) => (
                                                                <div className="row d-flex">
                                                                    <div className="d-block mt-2">
                                                                        <p className='px-2 my-1 fs-5'>From : {item?.redemDateAndTimeFrom}</p>
                                                                        <p className='px-2 my-1 fs-5'>To : {item?.redemDateAndTimeTo}</p>
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
                               >
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
                                                                    <div className='row'>
                                                                        <div className="col-lg-12 pb-3 mt-1">
                                                                            <h5 className='fw-bold'>Ticket Type</h5>
                                                                            <p className='px-2 my-1 fw-bold fs-5'>{item?.ticketType}</p>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Ticket Price</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.ticketPrice?.type == "USD" ? "$" : "%"}{" "}{item?.ticketPrice?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Credit Fees</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.creditCardFees?.type == "USD" ? "$" : "%"}{" "}{item?.creditCardFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Processing Fees</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.processingFees?.type == "USD" ? "$" : "%"}{" "}{item?.processingFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 mt-2">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Merchandise Fees</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.merchandiseFees?.type == "USD" ? "$" : "%"}{" "}{item?.merchandiseFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Other Fees</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.otherFees?.type == "USD" ? "$" : "%"}{" "}{item?.otherFees?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 mt-2">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Sales Fees</h6>
                                                                                <p className='px-2 my-1 fs-5'>{item?.salesTax?.type == "Percentage" ? "%" : ""}{" "}{item?.salesTax?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 mt-3 mb-3">
                                                                            <div className="d-block">
                                                                                <h6 className='fs-5'>Gross Ticket Price </h6>
                                                                                <p className='px-2 my-1 fs-5'>$ {" "}{item?.totalTicketPrice}</p>
                                                                            </div>
                                                                        </div>
                                                                       <hr style={{height:'3px'}}/>
                                                                    </div>
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
                            TicketDetails?.TicketFace?._id != null ?
                                (
                                    <div>
                                        <div className='row'>
                                            <div className="container ticketFaceDetail">
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
                                                               
                                                            </div>
                                                            <div className="col-lg-12 fs-6 ml-3 mt-3">
                                                                <div className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <h5>Event Name </h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.eventName}</small>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <h5 >Event Location</h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.ticketCategory}</small>
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-lg-6'>
                                                                        <h5 className="mt-3">Ticket Name </h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.ticketName}</small>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <h5 className="mt-3">Ticket Type</h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.orderNumber}</small>
                                                                    </div>

                                                                </div>
                                                                <div className='row'>
                                                                    <div className="col-lg-6">
                                                                        <h5 className="mt-3">Ticket Use Date</h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.orderNumber}</small>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <h5 className="mt-3">Order Number</h5>
                                                                        <small className='text-white'>{TicketDetails?.TicketFace?.orderNumber}</small>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 pt-2">
                                                        <small className="fa-1x"><small className='text-danger'>Note :</small> The code on this ticket allows redemption of the item described on this ticket, and it will be scanned for authenticity. Do not make additional copies of this ticket; duplicates will be rejected. Purchase of this ticket by a third party is not authorized and carries a risk of being fraudulent. Event reserves the right to require photo ID for entry. This ticket is a revocable license to fulfill this item. Management may, without refund, revoke this license and refuse admission or redemption for non-compliance with these terms or for disorderly conduct. Unlawful sale or attempted sale subjects tickets to revocation without refund. Tickets obtained from unauthorized sources may be invalid, lost, stolen or counterfeit and so are void. You voluntarily assume all risks whether occurring prior to, during and after this event. You agree to release the organization, facility, participants and their respective affiliates and representatives from responsibility and related claims. You grant unrestricted license to use your image or likeness in photograph or video by the event and its respective agents. No refunds or exchanges. HAVE A GREAT TIME!.
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
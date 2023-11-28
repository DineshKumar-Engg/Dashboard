import React, { useEffect, useState } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import Select from '../../../../../components/bootstrap/forms/Select'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Option from '../../../../../components/bootstrap/Option'
import Festiv from '../../../../../assets/festivLogoBlack.svg'
import Qr from '../../../../../assets/QR.png'
import Button from '../../../../../components/bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { EditTicketFace} from '../../../../../redux/Slice'
import { useNavigate, useParams } from 'react-router-dom'
import { errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import Spinner from '../../../../../components/bootstrap/Spinner'

const TicketFace = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, TicketFaceData, error, Loading, success } = useSelector((state) => state.festiv)
  const [isLoading, setIsLoading] = useState(false);


  const { id } = useParams()

  const handleSave = () => {
    setIsLoading(false);

    // if (success == 'TicketFace updated successfully') {
    //   navigate('../ticketPages/ticketLists')
    // }
    dispatch(errorMessage({ errors: '' }))
    dispatch(successMessage({ successess: '' }))
    dispatch(loadingStatus({ loadingStatus: false }))
  };

  useEffect(() => {
    error && handleSave()
    success && handleSave()
    if (Loading) {
      setIsLoading(true)
    }
    else {
      setIsLoading(false)
    }
  }, [error, success, Loading]);

  const HandleTicket = () => {
    const values = {
      ticketTemplateId: id || TicketFaceData?.ticketId,
    }
    dispatch(EditTicketFace({ token, values, id }))
  }


  return (
    <Card>
      <CardBody>
        <div className="row d-flex w-50">
          <div className="col-lg-6">
            <FormGroup className='locationSelect'>
              <Select>
                <Option>Festiv Ticket Template</Option>
              </Select>
            </FormGroup>
          </div>
        </div>
        <div className='row'>
        <div className="container ">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 ticketFaceMain">
                <div className="row TicketQR">
                  <img src={Qr} alt="no image" className='ticketQr' />
                </div>
                <div className="row ticketFaceid">
                  <h4>Ticket ID : 65649e0e5b1d56df8dff7e7e</h4>
                </div>
                <div className="row ticketFaceDetail">
                  <div className="col-lg-2">
                    <img src={Festiv} alt="no image" className='ticketLogo' />
                  </div>
                  <div className="col-lg-5">
                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Event Name :</h5>
                      <h6 className='mt-3 px-2' >{TicketFaceData ? TicketFaceData.eventName : "Updated"} </h6>
                    </span>
                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Ticket Name :</h5>
                      <h6 className='mt-3 px-2'  >{TicketFaceData ? TicketFaceData.ticketName : "Updated"}</h6>
                    </span>
                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Ticket Use Date :</h5>
                      <h6 className='mt-3 px-2'  >{TicketFaceData ? TicketFaceData.orderNumber : "Updated"}</h6>
                    </span>
                  </div>
                  <div className="col-lg-5">

                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Event Location : </h5>
                      <h6 className='mt-3 px-2'  >{TicketFaceData ? TicketFaceData.eventlocation : "Updated"}</h6>
                    </span>
                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Ticket Type :</h5>

                      <h6 className='mt-3 px-2'  >{TicketFaceData ? TicketFaceData.eventDateAndTimeFrom : "Updated"}</h6>
                    </span>

                    <span className='d-flex align-items-center'>
                      <h5 className="mt-3">Order Number :</h5>
                      <h6 className='mt-3 px-2' >{TicketFaceData ? TicketFaceData.eventDateAndTimeTo : "Updated"}</h6>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <small className="fa-1x ticketNoteText"><strong className="text-danger">Note: </strong> The code on this ticket allows redemption of the item described on this ticket, and it will be scanned for authenticity. Do not make additional copies of this ticket; duplicates will be rejected. Purchase of this ticket
                    by a third party is not authorized and carries a risk of being fraudulent. Event reserves the right to require photo ID for entry. This ticket is a revocable license to fulfill this item. Management may, without refund,
                    revoke this license and refuse admission or redemption for non-compliance with these terms or for disorderly conduct. Unlawful sale or attempted sale subjects tickets to revocation without refund. Tickets obtained
                    from unauthorized sources may be invalid, lost, stolen or counterfeit and so are void. You voluntarily assume all risks whether occurring prior to, during and after this event. You agree to release the organization,
                    facility, participants and their respective affiliates and representatives from responsibility and related claims. You grant unrestricted license to use your image or likeness in photograph or video by the event and its
                    respective agents. No refunds or exchanges. HAVE A GREAT TIME!.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end">
          <Button
            type="submit"
            size='lg'
            className='w-20 '
            isLight
            color={'info'}
            // isDisable={isLoading}
            onClick={HandleTicket}
          >
            {isLoading && <Spinner isSmall inButton />}
            Update Ticket
          </Button>
          <Button
                                className='w-20 py-3 px-3 my-3 mx-2'
                                color={'danger'}
                                isLight
                                shadow='default'
                                hoverShadow='none'
                                icon='Cancel'
                                onClick={() => {
                                    
                                    navigate(-1)
                                }}
                            >
                                Cancel
                            </Button>
        </div>
      </CardBody>
    </Card>



  )
}

export default TicketFace
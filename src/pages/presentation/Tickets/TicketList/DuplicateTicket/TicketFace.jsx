import React, { useEffect, useState } from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import Select from '../../../../../components/bootstrap/forms/Select'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Option from '../../../../../components/bootstrap/Option'
import Festiv from '../../../../../assets/LogoWhiteBg.svg'
import Qr from '../../../../../assets/QR.png'
import Button from '../../../../../components/bootstrap/Button'
import { use } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditTicketFace, GetTicketFace, TicketIdClear, addTicketFace } from '../../../../../redux/Slice'
import showNotification from '../../../../../components/extras/showNotification'
import { useNavigate, useParams } from 'react-router-dom'
import Icon from '../../../../../components/icon/Icon'
import { errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import Spinner from '../../../../../components/bootstrap/Spinner'

const TicketFace = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, TicketFaceData, error, Loading, success } = useSelector((state) => state.festiv)
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('i');

  useEffect(() => {
    dispatch(GetTicketFace({ token, id }))
  }, [id])



  const handleSave = () => {
    setIsLoading(false);

    if (success == 'TicketFace created successfully') {
      navigate('../ticketPages/ticketLists')
    }
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
      ticketTemplateId: id,
      ticketId: id
    }
    console.log(values);
    dispatch(addTicketFace({ token, values }))
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
          <div className="container ticketFaceMain">
            <div className="row ticketFace">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 text-center ">
                    <div>
                      <img src={Festiv} alt="no image" className='ticketLogo' />
                    </div>
                    <div className="my-2">
                      <img src={Qr} alt="no image" className='ticketQr' />
                    </div>
                    {/* <div className="pt-4">
                      <small><strong className="text-danger">Note: </strong> Redundant alt attribute. Screen-readers al </small>
                    </div> */}
                  </div>
                  <div className="col-lg-4 fs-6 ml-3">
                    <h5>Event Name </h5>
                    <small className='text-white'>{TicketFaceData?.eventName}</small>
                    <h5 className="mt-3">Ticket Name </h5>
                    <small className='text-white'>{TicketFaceData?.ticketName}</small>
                    <h5 className="mt-3">Ticket Use Date</h5>
                    <small className='text-white'>{TicketFaceData?.orderNumber}</small>
                  </div>

                  <div className="col-lg-4 fs-6 ">

                    <h5>Event Location</h5>
                    <small className='text-white'>{TicketFaceData?.eventlocation}</small>
                    <h5 className="mt-3">Ticket Type</h5>

                    <small className='text-white'>{TicketFaceData?.eventDateAndTimeFrom}</small>

                    <h5 className="mt-3">Order Number</h5>
                    <small className='text-white'>{TicketFaceData?.eventDateAndTimeTo}</small>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 pt-2">
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
            Create Ticket
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
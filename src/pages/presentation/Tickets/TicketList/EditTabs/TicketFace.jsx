import React, { useEffect,useState } from 'react'
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
import {  errorMessage, loadingStatus, successMessage } from '../../../../../redux/Slice'
import Spinner from '../../../../../components/bootstrap/Spinner'

const TicketFace = () => {

  const navigate = useNavigate()
const dispatch = useDispatch()
const {token,TicketFaceData,error, Loading, success}=useSelector((state)=>state.festiv)
const [isLoading, setIsLoading] = useState(false);


const {id}=useParams()
const handleSave = () => {
  setIsLoading(false);

  if (success == 'TicketFace updated successfully') {
    navigate('../ticketPages/ticketLists')
  }
  dispatch(errorMessage({ errors: '' }))
  dispatch(successMessage({ successess: '' }))
  dispatch(loadingStatus({ loadingStatus: false }))
};

useEffect(() => {
error && handleSave()
success && handleSave()
if(Loading)
{
    setIsLoading(true)
}
else{
    setIsLoading(false)
}
}, [error, success, Loading]);

const HandleTicket = ()=>{
    const values ={
      ticketTemplateId:id,
      name:TicketFaceData?.name,
      dateAndTimeFrom:TicketFaceData?.dateAndTimeFrom,
      dateAndTimeTo:TicketFaceData?.dateAndTimeTo,
      orderNumber:TicketFaceData?.orderNumber,
      ticketCategory:TicketFaceData?.ticketCategory,
      location:TicketFaceData?.location,
      status: true
    }
    console.log(values);
    dispatch(EditTicketFace({token,values,id}))
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
          <div className="container ticketFace">
            <div className="row">
            <div className="col-lg-12">
          <div className="row">
          <div className="col-lg-4 text-center ">
            <div>
              <img src={Festiv} alt="no image" className='ticketLogo' />
            </div>
            <div className="my-2">
              <img src={Qr} alt="no image" className='ticketQr'/>
            </div>
            <div className="pt-4">
              <small><strong className="text-danger">Note: </strong> Redundant alt attribute. Screen-readers al </small>
            </div>
          </div>
          <div className="col-lg-4 fs-6 ml-3">
            <h5>Ticket Name :</h5>
            <small className='text-white'>{TicketFaceData?.name}</small>

            <h5 className="mt-3">Order Number:</h5>
            <small className='text-white'>{TicketFaceData?.orderNumber}</small>

            <h5 className="mt-3">Ticket Category</h5>
            <small className='text-white'>Light show</small>

            <h5 className="mt-3">Location</h5>
            <small className='text-white'>{TicketFaceData?.location}</small>

          </div>

          <div className="col-lg-4 fs-6 ">

            <h5 className="pt-4">Event Start Date & Time:</h5>
            {
              TicketFaceData?.dateAndTimeFrom?.map((item)=>(
                <small className='text-white'>{item}</small>

              ))
            }
            <h5 className="pt-4">Event End Date & Time:</h5>
            {
              TicketFaceData?.dateAndTimeTo?.map((item)=>(
                <small className='text-white'>{item}</small>

              ))
            }
          </div>
          </div>
          </div>
        
          <div className="col-lg-12 pt-2">
            <small className="fa-1x">Redundant alt attribute. Screen-readers already announce `img` tags as an image.
              You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.
              You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.
              You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.
              You dont need to use the words Redundant alt attribute. Screen-readers already announce `img` tags as an image.</small>
          </div>
            </div>
          </div>
        </div>
        <div className="text-end">
                <Button
                  type="submit"
                  size='lg'
                  className='w-20 '
                  isDark
                  color={'info'}
                  // isDisable={isLoading}
                  onClick={HandleTicket}
                >
                  {isLoading && <Spinner isSmall inButton />}
                 Update Ticket
                </Button>
              </div>
      </CardBody>
    </Card>



  )
}

export default TicketFace
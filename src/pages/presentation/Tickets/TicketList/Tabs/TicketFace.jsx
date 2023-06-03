import React from 'react'
import Card, { CardBody } from '../../../../../components/bootstrap/Card'
import Select from '../../../../../components/bootstrap/forms/Select'
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup'
import Option from '../../../../../components/bootstrap/Option'
import Festiv from '../../../../../assets/LogoWhiteBg.svg'
import Qr from '../../../../../assets/QR.png'

const TicketFace = () => {
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
        <div className='row my-3 p-5'>
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
            <small className='text-white'>$20 unlimetd rides</small>

            <h5 className="mt-3">Order Number:</h5>
            <small className='text-white'> xxxx-45522- 69633</small>

            <h5 className="mt-3">Ticket Category</h5>
            <small className='text-white'>Light show</small>

            <h5 className="mt-3">Location</h5>
            <small className='text-white'>2312,New,Jerey,USA</small>

          </div>

          <div className="col-lg-4 fs-6 ">
            <h5 >No.of Persons:</h5>
            <small className='text-white'>4 Adulte 2 childern</small>

            <h5 className="pt-4">Date & Time:</h5>
            <small className='text-white'>Mar17, 2023-mar30,2023<br />09.00am- 17.00pm</small>

            <h5 className="pt-4">Total Cost :</h5>
            <h4 className="text-danger">$150 Dollers</h4>

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
      </CardBody>
    </Card>



  )
}

export default TicketFace
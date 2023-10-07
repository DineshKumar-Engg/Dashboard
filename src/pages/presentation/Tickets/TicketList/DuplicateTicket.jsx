import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import Page from '../../../../layout/Page/Page'
import General from './DuplicateTicket/General'
import Redemption from './DuplicateTicket/Redemption'
import FeeStructure from './DuplicateTicket/FeeStructure'
import TicketFace from './DuplicateTicket/TicketFace'
import {useParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux'
import {   GetTicketFeesData, GetTicketGeneralData, GetTicketRedemptionData, errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice'
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'

const EditTicket = () => {

  const {error,success,token} = useSelector((state) => state.festiv)

  const [activeTab, setActiveTab] = useState('General');
  const [ids, setId] = useState('')
  const dispatch = useDispatch()
  const {id}=useParams()


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const TicketId = queryParams.get('i');
    const p = queryParams.get('p');
    const t = queryParams.get('t');
    if (TicketId) {
      setActiveTab(p);
      setId(TicketId)
    } else {
      setActiveTab("General");
    }
  }, [activeTab, location.search]);

  useEffect(()=>{
  dispatch(GetTicketGeneralData({token,id}))
  dispatch(GetTicketFeesData({ token, id }))
  dispatch(GetTicketRedemptionData({ token, id }))
  },[dispatch,id])


  const Notification = (val, tit, pos, ico, btn) => {
    Swal.fire({
      position: `${pos}`,
      title: `${tit}`,
      text: `${val}`,
      icon: `${ico}`,
      confirmButtonText: `${btn}`,
      timer: 3000
    })

    clearErrors();
    clearSuccesses();
  }

  useEffect(() => {
    error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
    success && Notification(success, scc, posTop, sccIcon, BtnGreat)
  }, [error, success]);


  return (
    <PageWrapper>
    <Page>
    <div className='container'>
<div className="row newTicket">
            <Tabs
              id="justify-tab-example"
              defaultActiveKey="General"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
              justify
            >
              <Tab eventKey="General" title="General"
                disabled={activeTab === 'Redemption' || 'FeesStructure' && 'TicketFace'}
              >
                <General/>
              </Tab>
              <Tab eventKey="Redemption" title="Redemption"
                disabled={activeTab === 'General' || 'FeesStructure' || 'TicketFace'}
              >
                <Redemption />
              </Tab>
              <Tab eventKey="FeesStructure" title="Fees-Structure"
                disabled={activeTab === 'General' || 'Redemption' || 'TicketFace'}
              >
                <FeeStructure />
              </Tab>
              <Tab eventKey="TicketFace" title="TicketFace"
                disabled={activeTab === 'General' || 'Redemption' || 'FeesStructure'}
              >
                <TicketFace />
              </Tab>
            </Tabs>
</div>
  </div>
    </Page>
  </PageWrapper>
  )
}

export default EditTicket
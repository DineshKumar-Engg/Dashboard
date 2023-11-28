import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import Page from '../../../../layout/Page/Page'
import General from './Tabs/General'
import Redemption from './Tabs/Redemption'
import FeeStructure from './Tabs/FeeStructure'
import TicketFace from './Tabs/TicketFace'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux'
import { GetTicketFace } from '../../../../redux/Slice'
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'


const NewTicket = () => {

  
  const { error, success, token } = useSelector((state) => state.festiv)

  const [activeTab, setActiveTab] = useState('TicketFace');
  const dispatch = useDispatch()
  const [id, setId] = useState('')


  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const TicketId = queryParams.get('i');
    const p = queryParams.get('p');
    const t = queryParams.get('t');
    if (TicketId) {
      setActiveTab(p);
      setId(TicketId)
    } else {
      setActiveTab("TicketFace");
    }
  }, [activeTab, location.search]);

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


  useEffect(() => {
    dispatch(GetTicketFace({ token, id }))
  }, [dispatch])


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
                <General />
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

export default NewTicket

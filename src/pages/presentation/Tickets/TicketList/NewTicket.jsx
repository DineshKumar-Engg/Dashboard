import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import Page from '../../../../layout/Page/Page'
import Card, { CardHeader, CardLabel, CardTabItem, CardTitle } from '../../../../components/bootstrap/Card'
import classNames from 'classnames'
import useDarkMode from '../../../../hooks/useDarkMode';
import Icon from '../../../../components/icon/Icon'
import General from './Tabs/General'
import Redemption from './Tabs/Redemption'
import FeeStructure from './Tabs/FeeStructure'
import TicketFace from './Tabs/TicketFace'
import { useLocation, useNavigate, useParams,useSearchParams  } from 'react-router-dom'
import { Disabled } from '../../../../stories/components/bootstrap/forms/Input.stories'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import showNotification from '../../../../components/extras/showNotification'
import { useDispatch, useSelector } from 'react-redux'
import {  GetTicketFace, errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice'

const NewTicket = () => {
  const {error,success,token} = useSelector((state) => state.festiv)

  const [activeTab, setActiveTab] = useState('General');
  const dispatch = useDispatch()
  const  [id,setId]=useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const TicketId = queryParams.get('i');
    const p = queryParams.get('p');
    const t = queryParams.get('t');

    if (TicketId) {
      setActiveTab(p);
      setId(TicketId)
    }else{
      setActiveTab("General");
    }
  }, [activeTab,location.search]);

  console.log(activeTab);
  console.log(id);
  const handleSave = (val) => {
   
      showNotification(
        <span className='d-flex align-items-center'>
            <Icon icon='Info' size='lg' className='me-1' />
            <span className='fs-6'>{val}</span>
        </span>,

    );
    
    dispatch(errorMessage({ errors: '' }))
    dispatch(successMessage({ successess: '' }))
    dispatch(loadingStatus({ loadingStatus: false }))
};

useEffect(() => {
    error && handleSave(error)
    success && handleSave(success)
}, [error, success]);

useEffect(()=>{
  dispatch(GetTicketFace({token,id}))
},[dispatch])


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
      disabled={activeTab === 'Redemption'|| 'FeesStructure' && 'TicketFace'}
      >
      <General/>
      </Tab>
      <Tab eventKey="Redemption" title="Redemption" 
      disabled={activeTab === 'General' || 'FeesStructure' || 'TicketFace'}
      >
      <Redemption/>
      </Tab>
      <Tab eventKey="FeesStructure" title="Fees-Structure" 
      disabled={activeTab === 'General' || 'Redemption' || 'TicketFace' }
      >
      <FeeStructure/>
      </Tab>
      <Tab eventKey="TicketFace" title="TicketFace" 
      disabled={activeTab === 'General' || 'Redemption' || 'FeesStructure' }
      >
      <TicketFace/>
      </Tab>
    </Tabs>
  </div>
    </div>
      </Page>
    </PageWrapper>
  )
}

export default NewTicket

//disabled={activeTab === 'General' || 'Redemption' || 'FeesStructure' }
//disabled={activeTab === 'General' || 'Redemption' || 'TicketFace' }




{/* <Card hasTab stretch
shadow='sm'>
    
        <CardTabItem id='General' title='General' icon='Contacts' active={activeTab === 'General'} onClick={() => handleTabChange('General')}>
              <General/>
          </CardTabItem>
          <CardTabItem id='Redemption' title='Redemption' icon='HolidayVillage' active={activeTab === 'Redemption'} disabled={activeTab !== 'General'} onClick={() => handleTabChange('Redemption')}>
            {
              activeTab === 'Redemption' ? (<Redemption/>):null
            }
            <Redemption/>
          </CardTabItem>
          <CardTabItem id='FeesStructure' title='Fees Structure' icon='AttachMoney' active={activeTab === 'FeesStructure'} onClick={() => handleTabChange('FeesStructure')}>
            <FeeStructure/>
          </CardTabItem>
          <CardTabItem id='TicketFace' title='Ticket Face' icon='Lock' active={activeTab === 'TicketFace'}  onClick={() => handleTabChange('TicketFace')}>
            <TicketFace/>
          </CardTabItem>
  </Card> */}
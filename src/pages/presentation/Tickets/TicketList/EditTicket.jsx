import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper'
import Page from '../../../../layout/Page/Page'
import Card, { CardHeader, CardLabel, CardTabItem, CardTitle } from '../../../../components/bootstrap/Card'
import classNames from 'classnames'
import useDarkMode from '../../../../hooks/useDarkMode';
import Icon from '../../../../components/icon/Icon'
import General from './EditTabs/General'
import Redemption from './EditTabs/Redemption'
import FeeStructure from './EditTabs/FeeStructure'
import TicketFace from './EditTabs/TicketFace'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Disabled } from '../../../../stories/components/bootstrap/forms/Input.stories'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import showNotification from '../../../../components/extras/showNotification'
import { useDispatch, useSelector } from 'react-redux'
import { GetTicketFace, GetTicketFeesData, GetTicketGeneralData, GetTicketRedemptionData, errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice'
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'


const EditTicket = () => {

  const { error, success, token } = useSelector((state) => state.festiv)

  const [activeTab, setActiveTab] = useState('General');
  const dispatch = useDispatch()
  const { id } = useParams()


  useEffect(() => {
    dispatch(GetTicketGeneralData({ token, id }))
    dispatch(GetTicketFace({ token, id }))
    dispatch(GetTicketFeesData({ token, id }))
    dispatch(GetTicketRedemptionData({ token, id }))
  }, [dispatch, id,success])




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
              <Tab eventKey="General" title="General">
                <General />
              </Tab>
              <Tab eventKey="Redemption" title="Redemption">
                <Redemption />
              </Tab>
              <Tab eventKey="FeesStructure" title="Fees-Structure">
                <FeeStructure />
              </Tab>
              <Tab eventKey="TicketFace" title="TicketFace">
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
import React from 'react'
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


const NewTicket = () => {

  const { darkModeStatus } = useDarkMode();


  return (

    <div className='container-fluid'>
    <Card hasTab stretch
      shadow='sm'>
          
							<CardTabItem id='General' title='General' icon='Contacts'>
								    <General/>
                </CardTabItem>
                <CardTabItem id='Redemption' title='Redemption' icon='HolidayVillage'>
                  <Redemption/>
                </CardTabItem>
                <CardTabItem id='FeesStructure' title='Fees Structure' icon='AttachMoney'>
                  <FeeStructure/>
                </CardTabItem>
                <CardTabItem id='TicketFace' title='Ticket Face' icon='Lock'>
                  <TicketFace/>
                </CardTabItem>
        </Card>
    </div>
  )
}

export default NewTicket
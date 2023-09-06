import React, { useContext, useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { TABS, TTabs } from './common/helper';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';

import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';

import CommonDashboardAlert from './common/CommonDashboardAlert';
import CommonDashboardUserCard from './common/CommonDashboardUserCard';
import CommonDashboardMarketingTeam from './common/CommonDashboardMarketingTeam';
import CommonDashboardDesignTeam from './common/CommonDashboardDesignTeam';
import CommonDashboardIncome from './common/CommonDashboardIncome';
import CommonDashboardRecentActivities from './common/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from './common/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from './common/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from './common/CommonDashboardWaitingAnswer';
// import CommonMyWallet from '../../_common/CommonMyWallet';
import CommonDashboardTopSeller from './common/CommonDashboardTopSeller';
import ThemeContext from '../../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 7000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus } = useDarkMode();
	const navigate=useNavigate()
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);



// title={demoPagesMenu.sales.subMenu.dashboard.text}
	return (
		<PageWrapper  title={dashboardPagesMenu.dashboard.text}>
			<Page>
				<div className='row'>
					<div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardDesignTeam />
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>
					<div className='col-xxl-8'>
						<CommonDashboardTopSeller />
					</div>
					<div className='col-xxl-12'>
						<CommonDashboardSalesByStore />
					</div>

					{/* <div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					
					<div className='col-xxl-6'>
						<CommonDashboardIncome activeTab={activeTab} />
					</div>
					<div className='col-xxl-6'>
						<CommonDashboardSalesByStore />
					</div>
					<div className='col-xxl-4 col-xl-6'>
					<div>
						<CommonDashboardRecentActivities />
					</div>
					<div >
						<CommonDashboardDesignTeam />
					</div>
					</div> */}
				
					
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;

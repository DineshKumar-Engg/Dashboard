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
import DashboardUserCard from './common/DashboardUserCard';
import DashboardSocialMedia from './common/DashboardSocialMedia';
import DashboardMostVisitPage from './common/DashboardMostVisitPage';
import DashboardTopTicketSales from './common/DashboardTopTicketSales';
import ThemeContext from '../../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';
import DashboardSales from './common/DashboardSales';





const DashboardPage = () => {



// title={demoPagesMenu.sales.subMenu.dashboard.text}
	return (
		<PageWrapper  title={dashboardPagesMenu.dashboard.text}>
			<Page>
				<div className='row'>
					<div className='col-xl-12 col-xxl-12'>
						<DashboardUserCard />
					</div>
					{/* <div className='col-xl-4'>
						<DashboardMostVisitPage />
					</div> */}
					{/* <div className='col-xl-4'>
						<DashboardSocialMedia />
					</div> */}
					<div className='col-xxl-12'>
						<DashboardSales/>
					</div>
					<div className='col-xxl-12'>
						<DashboardTopTicketSales/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;

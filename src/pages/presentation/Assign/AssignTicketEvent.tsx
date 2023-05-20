import React, { useState } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import ScrollspyNav from '../../../components/bootstrap/ScrollspyNav';

const AssignTicketEvent = () => {
	const { darkModeStatus } = useDarkMode();
	const [activeElementId, setActiveElementId] = useState<string | null>(null);
	return (
		<PageWrapper title={demoPagesMenu.assignEvents.subMenu.assign.text}>
			<h1>Assign</h1>
			
		</PageWrapper>
	);
};

export default AssignTicketEvent;

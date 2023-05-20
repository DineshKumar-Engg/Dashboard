import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';


const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const TEMPLATE = {
	TEMPLATELIST: lazy(() => import('../pages/presentation/Template/TemplateList')),
	PAGELIST: lazy(() => import('../pages/presentation/Template/PageList')),
	DRAFTS: lazy(() => import('../pages/presentation/Template/Drafts')),
};
const EVENTS = {
	EVENTCATEGORY: lazy(() => import('../pages/presentation/Events/Category/Categories')),
	NEWCATEGORY:lazy(()=>import('../pages/presentation/Events/Category/NewCategory')),
	EVENTLOCATION: lazy(() => import('../pages/presentation/Events/Location')),
	EVENTDETAILS: lazy(() => import('../pages/presentation/Events/Event-Details')),
};
const TICKET = {
	TICKETCATEGORY: lazy(() => import('../pages/presentation/Tickets/TicketCategory')),
	TICKETLIST: lazy(() => import('../pages/presentation/Tickets/TicketList')),
};
const REPORTS = {
	PURCHASETRANSACTION: lazy(() => import('../pages/presentation/Reports/PurchaseTransaction')),
	TICKETSALESREPORT: lazy(() => import('../pages/presentation/Reports/TicketSalesReport')),
	REDEMPTIONREPORTS: lazy(() => import('../pages/presentation/Reports/RedemptionReport')),
	FAILEDSCANREPORT: lazy(() => import('../pages/presentation/Reports/FailedScanReport')),
};
const ASSIGN = {
	ASSIGNTICKETEVENT: lazy(() => import('../pages/presentation/Assign/AssignTicketEvent')),
	ASSIGNLIST:lazy(()=>import('../pages/presentation/Assign/AssignList'))
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};



const presentation: RouteProps[] = [
	/**
	 * Landing
	 */
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},

	{
		path: demoPagesMenu.Template.subMenu.templateList.path,
		element: <TEMPLATE.TEMPLATELIST />,
	},
	{
		path: demoPagesMenu.Template.subMenu.pageList.path,
		element: <TEMPLATE.PAGELIST />,
	},
	{
		path: demoPagesMenu.Template.subMenu.drafts.path,
		element: <TEMPLATE.DRAFTS />,
	},
	/**
	 * Event-Pages
	 */
	{
		path: demoPagesMenu.eventPages.subMenu.categories.path,
		element: <EVENTS.EVENTCATEGORY />,
	},
	{
		path: demoPagesMenu.eventPages.subMenu.location.path,
		element: <EVENTS.EVENTLOCATION />,
	},
	{
		path: demoPagesMenu.eventPages.subMenu.eventDetails.path,
		element: <EVENTS.EVENTDETAILS/>,
	},
	{
		path:'/newCategory',
		element:<EVENTS.NEWCATEGORY/>
	},
	/**
	 * Ticket-Pages
	 */
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketCategory.path,
		element: <TICKET.TICKETCATEGORY />,
	},
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketLists.path,
		element: <TICKET.TICKETLIST />,
	},
	/**
	 * Assign-Events
	 */
	{
		path: demoPagesMenu.assignEvents.subMenu.assign.path,
		element: <ASSIGN.ASSIGNTICKETEVENT />,
	},
	{
		path: demoPagesMenu.assignEvents.subMenu.assignLists.path,
		element: <ASSIGN.ASSIGNLIST />,
	},
	/**
	 * Reports
	 */
	{
		path: demoPagesMenu.reports.subMenu.purchaseTransaction.path,
		element: <REPORTS.PURCHASETRANSACTION />,
	},
	{
		path: demoPagesMenu.reports.subMenu.ticketSalesReport.path,
		element: <REPORTS.TICKETSALESREPORT />,
	},
	{
		path: demoPagesMenu.reports.subMenu.redemptionReport.path,
		element: <REPORTS.REDEMPTIONREPORTS />,
	},
	{
		path: demoPagesMenu.reports.subMenu.failedScanReport.path,
		element: <REPORTS.FAILEDSCANREPORT />,
	},
]
const contents = [...presentation];
export default contents;

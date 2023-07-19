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
	// TEMPLATELIST: lazy(() => import('../pages/presentation/Template/TemplateList')),
	PAGELIST: lazy(() => import('../pages/presentation/Template/PageList')),
	DRAFTS: lazy(() => import('../pages/presentation/Template/Drafts')),
	EVENTPAGE:lazy(()=>import('../pages/presentation/Template/EventPage'))
};
const EVENTS = {
	EVENTCATEGORY: lazy(() => import('../pages/presentation/Events/Category/Categories')),
	NEWCATEGORY:lazy(()=>import('../pages/presentation/Events/Category/NewCategory')),
	EVENTLOCATION: lazy(() => import('../pages/presentation/Events/Location/Location')),
	NEWLOCATION: lazy(()=>import('../pages/presentation/Events/Location/NewLocation')),
	EDITLOCATION:lazy(()=>import('../pages/presentation/Events/Location/EditLocation')),
	EVENTDETAILS: lazy(() => import('../pages/presentation/Events/EventDetails/EventDetails')),
	NEWEVENT:lazy(()=>import('../pages/presentation/Events/EventDetails/NewEvent')),
	EDITEVENR:lazy(()=>import('../pages/presentation/Events/EventDetails/EditEventDetails'))
};

const TICKET = {
	TICKETNEWCATEGORY: lazy(() => import('../pages/presentation/Tickets/TicketCategory/NewTicketCategory')),
	TICKETCATEGORYLIST:lazy(()=>import('../pages/presentation/Tickets/TicketCategory/TicketCategoryList')),
	TICKETLIST: lazy(() => import('../pages/presentation/Tickets/TicketList/TicketList')),
	NEWTICKET: lazy(() => import('../pages/presentation/Tickets/TicketList/NewTicket')),
	TICKETDETAILS: lazy(() => import('../pages/presentation/Tickets/TicketList/TicketDetails')),
	EDITTICKET:lazy(() => import('../pages/presentation/Tickets/TicketList/EditTicket')),
};

const REPORTS = {
	PURCHASETRANSACTION: lazy(() => import('../pages/presentation/Reports/PurchaseTransaction')),
	TICKETSALESREPORT: lazy(() => import('../pages/presentation/Reports/TicketSalesReport')),
	REDEMPTIONREPORTS: lazy(() => import('../pages/presentation/Reports/RedemptionReport')),
	FAILEDSCANREPORT: lazy(() => import('../pages/presentation/Reports/FailedScanReport')),
};
const ASSIGN = {
	ASSIGNTICKETEVENT: lazy(() => import('../pages/presentation/Assign/AssignTicketEvent')),
	ASSIGNLIST:lazy(()=>import('../pages/presentation/Assign/AssignList')),
	EDITASSIGNTICKETEVENT:lazy(()=>import('../pages/presentation/Assign/EditAssignTicketEvent'))
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
		path: demoPagesMenu.Template.subMenu.pageList.path,
		element: <TEMPLATE.PAGELIST />,
	},

	/**
	 * Event-Pages
	 */
	{
		path: demoPagesMenu.eventPages.subMenu.categories.path,
		element: <EVENTS.EVENTCATEGORY />,
	},
	{
		path:'/newCategory',
		element:<EVENTS.NEWCATEGORY/>
	},
	{
		path: demoPagesMenu.eventPages.subMenu.location.path,
		element: <EVENTS.EVENTLOCATION />,
	},
	{
		path: '/newLocation',
		element: <EVENTS.NEWLOCATION/>,
	},
	{
		path:`/editLocation/:id`,
		element: <EVENTS.EDITLOCATION/>,
	},
	{
		path: demoPagesMenu.eventPages.subMenu.eventDetails.path,
		element: <EVENTS.EVENTDETAILS/>,
	},
	{
		path: '/newevent',
		element: <EVENTS.NEWEVENT/>,
	},
	{
		path:'/editEvent/:id',
		element: <EVENTS.EDITEVENR/>,
	},
	
	/**
	 * Ticket-Pages
	 */
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketCategory.path,
		element: <TICKET.TICKETCATEGORYLIST />,
	},
	{
		path: '/newticketcategory',
		element: <TICKET.TICKETNEWCATEGORY />,
	},
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketLists.path,
		element: <TICKET.TICKETLIST />,
	},
	{
		path: '/newticketcategory',
		element: <TICKET.TICKETNEWCATEGORY />,
	},
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketLists.path,
		element: <TICKET.TICKETLIST />,
	},
	{
		path: '/newTicket',
		element: <TICKET.NEWTICKET/>,
	},
	{
		path: '/editTicket/:id',
		element: <TICKET.EDITTICKET />,
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
	{
		path: '/editAssign/:eventId/:uniqueId',
		element: <ASSIGN.EDITASSIGNTICKETEVENT />,
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

	{
		path:'/hometemplate/:id',
		element:<TEMPLATE.DRAFTS/>
	},
	{
		path:'/eventtemplate/:id',
		element:<TEMPLATE.EVENTPAGE/>
	},
	{
		path: '/auth-pages/404',
		element: <AUTH.PAGE_404 />,
	},
	{
		path: '/auth-pages/login',
		element: <Login />,
	},
	
]
const contents = [...presentation];
export default contents;

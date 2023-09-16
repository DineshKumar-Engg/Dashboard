import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';
import Spinner from '../components/bootstrap/Spinner';


const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const TEMPLATE = {
	// TEMPLATELIST: lazy(() => import('../pages/presentation/Template/TemplateList')),
	PAGELIST: lazy(() => import('../pages/presentation/Template/PageList')),
	DRAFTS: lazy(() => import('../pages/presentation/Template/Drafts')),
	EVENTPAGE:lazy(()=>import('../pages/presentation/Template/EventPage')),
	TICKETPAGE:lazy(()=>import('../pages/presentation/Template/TicketPage')),
	SPONSORPAGE:lazy(()=>import('../pages/presentation/Template/SponsorPage')),
	VENDORPAGE:lazy(()=>import('../pages/presentation/Template/VendorPage')),
	ABOUTPAGE:lazy(()=>import('../pages/presentation/Template/AboutPage')),
	FESTIVALHOURS:lazy(()=>import('../pages/presentation/Template/FestivalHours')),
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
	DUPLICATETICKET :lazy(() => import('../pages/presentation/Tickets/TicketList/DuplicateTicket')),
};

const REPORTS = {
	PURCHASETRANSACTION: lazy(() => import('../pages/presentation/Reports/PurchaseTransaction')),
	TICKETSALESREPORT: lazy(() => import('../pages/presentation/Reports/TicketSalesReport')),
	REDEMPTIONREPORTS: lazy(() => import('../pages/presentation/Reports/RedemptionReport')),
	FAILEDSCANREPORT: lazy(() => import('../pages/presentation/Reports/FailedScanReport')),
};

const DATALIST = {
	SUBSCRIPTION: lazy(() => import('../pages/presentation/DataList/Subscription')),
	SPONSOR: lazy(() => import('../pages/presentation/DataList/Sponsor')),
	VENDOR: lazy(() => import('../pages/presentation/DataList/Vendor')),
};



const ASSIGN = {
	ASSIGNTICKETEVENT: lazy(() => import('../pages/presentation/Assign/AssignTicketEvent')),
	ASSIGNLIST:lazy(()=>import('../pages/presentation/Assign/AssignList')),
	EDITASSIGNTICKETEVENT:lazy(()=>import('../pages/presentation/Assign/EditAssignTicketEvent'))
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

const AUTHCALLBACK = {
	AUTH:lazy(()=>import('../pages/presentation/dashboard/common/AuthGoogle'))
}

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
	{
		path: '/duplicateTicket/:id',
		element: <TICKET.DUPLICATETICKET />,
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

	// Datalist
	{
		path: demoPagesMenu.DataList.subMenu.subscription.path,
		element: <DATALIST.SUBSCRIPTION />,
	},
	{
		path: demoPagesMenu.DataList.subMenu.sponsor.path,
		element: <DATALIST.SPONSOR  />,
	},
	{
		path: demoPagesMenu.DataList.subMenu.vendor.path,
		element: <DATALIST.VENDOR />,
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
		path:'/tickettemplate/:id',
		element:<TEMPLATE.TICKETPAGE/>
	},
	{
		path:'/sponsortemplate/:id',
		element:<TEMPLATE.SPONSORPAGE/>
	},
	{
		path:'/vendortemplate/:id',
		element:<TEMPLATE.VENDORPAGE/>
	},
	{
		path:'/abouttemplate/:id',
		element:<TEMPLATE.ABOUTPAGE/>
	},
	{
		path:'/festivhourstemplate/:id',
		element:<TEMPLATE.FESTIVALHOURS/>
	},
	{
		path: '/auth-pages/404',
		element: <AUTH.PAGE_404 />,
	},
	{
		path: '/auth-pages/login',
		element: <Login />,
	},
	{
		path:'/auth/callback',
		element:<React.Suspense fallback={<Spinner color="light" size="10"/>}>  <AUTHCALLBACK.AUTH/></React.Suspense>
	}
]
const contents = [...presentation];
export default contents;

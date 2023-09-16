import React from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';


const headers: RouteProps[] = [
	{ path: '/auth-pages/login', element: null },
	{ path: '/auth/callback', element: null },
	{ path: dashboardPagesMenu.dashboard.path, 
		element: <DashboardHeader /> 
	},
	{
		path: demoPagesMenu.eventPages.subMenu.categories.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.eventPages.subMenu.location.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.eventPages.subMenu.eventDetails.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketCategory.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.ticketPages.subMenu.ticketLists.path,
		element: <DashboardHeader />,
	},
	{ 
		path: demoPagesMenu.assignEvents.subMenu.assign.path, 
		element: <DashboardHeader /> 
	},
	{ 
		path: demoPagesMenu.assignEvents.subMenu.assignLists.path, 
		element: <DashboardHeader /> 
	},
	{
		path: `${demoPagesMenu.reports.path}/*`,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.Template.subMenu.pageList.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.DataList.subMenu.subscription.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.DataList.subMenu.sponsor.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.DataList.subMenu.vendor.path,
		element: <DashboardHeader />,
	},
	{
		path:'/newCategory',
		element:<DashboardHeader/>
	},
	{
		path:'/newLocation',
		element:<DashboardHeader/>
	},
	{
		path:'/editLocation/:id',
		element:<DashboardHeader/>
	},
	{
		path:'/newevent',
		element:<DashboardHeader/>
	},
	{
		path:'/editEvent/:id',
		element:<DashboardHeader/>
	},
	{
		path:'/newticketcategory',
		element:<DashboardHeader/>
	},
	{
		path:'/newTicket',
		element:<DashboardHeader/>
	},
	{
		path:'/editTicket/:id',
		element:<DashboardHeader/>
	},
	{
		path:'/duplicateTicket/:id',
		element:<DashboardHeader/>
	},
	{
		path: '/editAssign/:eventId/:uniqueId',
		element:<DashboardHeader/>
	},
	{
		path:'/hometemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/eventtemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/tickettemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/sponsortemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/vendortemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/abouttemplate/:id',
		element:<DashboardHeader/>
	}
	,
	{
		path:'/festivhourstemplate/:id',
		element:<DashboardHeader/>
	}
];

export default headers;

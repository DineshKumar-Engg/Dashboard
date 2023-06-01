import React from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';


const headers: RouteProps[] = [
	{ path: '/auth-pages/login', element: null },
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
		path: demoPagesMenu.Template.subMenu.templateList.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.Template.subMenu.pageList.path,
		element: <DashboardHeader />,
	},
	{
		path: demoPagesMenu.Template.subMenu.drafts.path,
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
];

export default headers;

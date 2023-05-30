import React from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu, } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';
import { Navigate } from 'react-router-dom';


const asides: RouteProps[] = [
	// {path:"/", element:<Navigate to="/auth-pages/login"/>},
	{ path: 'auth-pages/login', element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;


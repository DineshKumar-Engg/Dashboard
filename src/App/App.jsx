import React, { useContext, useEffect, useLayoutEffect, useRef,useTransition ,Suspense} from 'react';
import { ThemeProvider } from 'react-jss';
import { ReactNotifications } from 'react-notifications-component';
import { useFullscreen } from 'react-use';
import { ToastProvider } from 'react-toast-notifications';
import { TourProvider } from '@reactour/tour';
import ThemeContext from '../contexts/themeContext';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
// import steps, { styles } from '../steps';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import {  BrowserRouter as Router,  Routes,  Route, Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LoginToken, Userlogin, loginState } from '../redux/Slice';
import Login from '../pages/presentation/auth/Login';
import Spinner from '../components/bootstrap/Spinner';
import 'sweetalert2/src/sweetalert2.scss'
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";   



const App = () => {
	const [isPending, startTransition] = useTransition();

	const navigate = useNavigate()
	const dispatch = useDispatch();
	const {login}=useSelector((state)=>state.festiv)
	console.log("login",login);


	useEffect(() => {
		const token = localStorage.getItem('Token');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

	if (token && tokenExpiration) {
		
		const currentTime = Math.floor(Date.now() / 1000);
		const expireSeconds = parseInt(tokenExpiration, 10);
		
		if (currentTime >= expireSeconds) {

		  dispatch(loginState({loginSet:false}))
		  dispatch(LoginToken({tokenremove:null}))
		  localStorage.removeItem('Token');
		  localStorage.removeItem('tokenExpiration');
		  localStorage.removeItem('Statistic');
		  localStorage.removeItem('expires_in');
		  localStorage.removeItem('expiration_time');
		  localStorage.removeItem('fblst_227901136576839');
		  localStorage.removeItem('FbAccess');
		  localStorage.removeItem('FbExpire');

		  navigate('../auth-pages/login')
		  console.log('Token has expired. Redirecting to login page.');
		} 	
		else{
			startTransition(() => {
					dispatch(loginState({loginSet:true}))
			})
		}
	  } else {
		navigate('../auth-pages/login')
	  }

	}, [navigate]);
	


	getOS();

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime);

	/**
	 * Dark Mode
	 */
	
	const { themeStatus, darkModeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	useEffect(() => {
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
			document.documentElement.removeAttribute('data-bs-theme');
		};
	}, [darkModeStatus]);

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<ToastProvider components={{ ToastContainer, Toast }}>

					<div
						ref={ref}
						className='app'
						style={{
							backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : undefined,
							zIndex: fullScreenStatus ? 1 : undefined,
							overflow: fullScreenStatus ? 'scroll' : undefined,
						}}>
			
					{
						 isPending || login ?
						(
						<>
						<Suspense fallback={<Spinner color="light" size="10"/>}>
						<AsideRoutes />
						<Wrapper />
						</Suspense>
						</>
						)
						:
						(
							<Login/>
						)
					}
						
					</div>
					<Portal id='portal-notification'>
						<ReactNotifications />
					</Portal>
			</ToastProvider>
		</ThemeProvider>
	);
};

export default App;


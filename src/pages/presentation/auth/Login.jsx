import React, { FC, useCallback, useContext, useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
// import Logo from '../../../assets/festivLogo.svg'
import LoginImage from '../../../assets/loginImage.png'
import '../../../styles/Custom.css'
import axios from 'axios';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import LoginImg from '../../../assets/loginImage.png'
// import LogoWhite from '../../../components/LogoWhite';
import LogoWhite from '../../../assets/LogoWhiteBg.svg'
import LogoBlack from '../../../assets/festivLogoBlack.svg'
import { Userlogin, errorMessage, loadingStatus, successMessage} from '../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

const LoginHeader= () => {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
				<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
			</>
		);
};



const Login = () => {

	const {error,Loading,success,status}=useSelector((state)=>state.festiv)
	const { setUser } = useContext(AuthContext);
	const [signInPassword, setSignInPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const handleSave = (err) => {
		// setIsLoading(false);
		console.log(err);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-5'>{err}</span>
			</span>,
		);
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))
		setIsLoading(false)
		
		if(!status || localStorage["token"] !==undefined || localStorage["token"]!==0 || !localStorage["token"]!==null || !localStorage["token"]!==false || !localStorage["token"]!==''){
			// navigate('/')
			console.log("true");
		}else{
			console.log("false");
		}
	};



	useEffect(() => {

		error && handleSave(error)
		success && handleSave(success)
		Loading &&	setIsLoading(true)
		
	  }, [error,success,Loading]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			username: '',
			password: '',
		},
		validate: (values) => {
			const errors={}


			if (!values.username) {
				errors.username = 'Required';
			} else if (values.username.length < 3) {
				errors.username = 'Must be 3 characters or more';
			} else if (values.username.length > 20) {
				errors.username = 'Must be 20 characters or less';
			}

			if (!values.password) {
				errors.password = 'Required';
			}
			else if (!/[0-9]/g.test(values.password)) {
				errors.password =
					'Require that at least one digit appear anywhere in the string. ';
			}
			else if (!/[a-z]/g.test(values.password)) {
				errors.password =
					'Require that at least one lowercase letter appear anywhere in the string. ';
			}

			if (Object.keys(errors).length === 0) {
				formik.setStatus({ isSubmitting: true });
			}
			return errors;
		},
		validateOnChange: true,
		onSubmit: async(values, { setSubmitting }) => {
			dispatch(Userlogin(values))
			setIsLoading(true);
			setTimeout(() => {
			  setSubmitting(false);
			}, 2000); 
		  },
	});

	
	

	return (

				<div className='container-fluid '>
<div className='row LoginRow'>
				
				<div className='col-lg-6 LoginCol'>
					<img src={LoginImg} alt='Login-Image' />
				</div>
				<div className='col-lg-6 '>
				<div className='LoginSmallbg'>
				<div className='row LoginImage'>	
							<div className='text-center'>
									<img src={LogoWhite} className='LogoWhite' alt="LogoWhite" />
									<img src={LogoBlack} className='LogoBlack'alt="LogoWhite" />
							</div>
							<form onSubmit={formik.handleSubmit} className='row g-4 justify-content-center'>
										<div className='col-8'>
											
												<FormGroup
													id='username'
													label='Username'
													className='py-2'
													>
													<Input
														type='text'
														placeholder='Enter Your Username'
														autoComplete='text'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.username}
														isValid={formik.isValid}
														isTouched={formik.touched.username}
														invalidFeedback={
															formik.errors.username
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
												<FormGroup
												id='password'
												label='Password'
												className='py-2'
												> 
											<Input
													type='password'
													value={formik.values.password}
													isTouched={formik.touched.password}
													invalidFeedback={
														formik.errors.password
													}
													validFeedback='Looks good!'
													isValid={formik.isValid}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													placeholder='Enter Your Password'
												/>
										</FormGroup>
											<div className='col-12 d-flex justify-content-center'>
											<Button
													className='w-50 py-3 my-3 fs-5'
													color='warning'
													onClick={formik.handleSubmit}>
													{isLoading && <Spinner isSmall inButton />}
														Login
												</Button>
											</div>
										</div>

									</form>

						<div className='text-center'>
						<a
							href='/'
							className={classNames('text-decoration-none me-3')}
							>
							Privacy policy
						</a>
						<a
							href='/'
							className={classNames('text-decoration-none')}>
							Terms of use
						</a>
					</div>
				
				</div>
				</div>
				</div>
				</div>
			 </div>

	);
};


export default Login;

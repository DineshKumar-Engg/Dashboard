import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import { useFormik } from 'formik';
import Spinner from '../../../components/bootstrap/Spinner';
import '../../../styles/Custom.css'
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import LoginImg from '../../../assets/loginImage.jpg'
import LogoWhite from '../../../assets/LogoWhiteBg.svg'
import LogoBlack from '../../../assets/festivLogoBlack.svg'
import { Userlogin, errorMessage, loadingStatus, successMessage } from '../../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat,today } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'

const Login = () => {

	const { error,Loading, success, login } = useSelector((state) => state.festiv)
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch()


	useEffect(() => {
		if (login) {
			navigate('/')
		}
	}, [login]);

    const Notification = (val, tit, pos, ico, btn) => {
        Swal.fire({
            position: `${pos}`,
            title: `${tit}`,
            text: `${val}`,
            icon: `${ico}`,
            confirmButtonText: `${btn}`,

        })
        setIsLoading(false)
        clearErrors();
        clearSuccesses();
        setLoadingStatus(false);
    }

	useEffect(() => {

		error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
        success && Notification(success, scc, posTop, sccIcon, BtnGreat)
		Loading && setIsLoading(true)
	}, [error, success, Loading]);



	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			username: '',
			password: '',
		},
		validate: (values) => {
			const errors = {}
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
				errors.password ='Require that at least one digit appear anywhere in the string. ';
			}
			else if (!/[a-z]/g.test(values.password)) {
				errors.password ='Require that at least one lowercase letter appear anywhere in the string. ';
			}

			if (Object.keys(errors).length === 0) {
				formik.setStatus({ isSubmitting: true });
			}
			return errors;
		},
		validateOnChange: true,
		onSubmit: async (values, { setSubmitting }) => {
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
				<div className='col-lg-6 LoginCol2'>
					<div className='LoginSmallbg'>
						<div className='row LoginImage'>
							<div className='text-center'>
								<img src={LogoWhite} className='LogoWhite' alt="LogoWhite" />
								<img src={LogoBlack} className='LogoBlack' alt="LogoWhite" />
							</div>
							<form onSubmit={formik.handleSubmit} className='row g-2 justify-content-center'>
								<div className='col-8'>
									<FormGroup
										id='username'
										label='Username'
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

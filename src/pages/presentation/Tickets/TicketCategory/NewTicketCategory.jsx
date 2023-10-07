import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { addTicketCategory } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'



const NewTicketCategory = () => {


	const { error, Loading, success, token } = useSelector((state) => state.festiv)

	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const Notification = (val, tit, pos, ico, btn) => {
		Swal.fire({
			position: `${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		if (success) {
			navigate(-1)
		}
		clearErrors();
		clearSuccesses();
		setLoadingStatus(false);
	}

	useEffect(() => {
		error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
		success && Notification(success, scc, posTop, sccIcon, BtnGreat)
		Loading ? setIsLoading(true) : setIsLoading(false)
	}, [error, success, Loading]);


	const formik = useFormik({
		initialValues: {
			ticketCategory: '',
			status: true
		},
		validate: (values) => {
			const errors = {}
			// if (!values.ticketCategory) {
			// 	errors.ticketCategory = 'Required';
			// } else if (values.ticketCategory.length < 3) {
			// 	errors.ticketCategory = 'Must be 3 characters or more';
			// } else if (values.ticketCategory.length > 200) {
			// 	errors.ticketCategory = 'Must be 200 characters or less';
			// }
			// if (Object.keys(errors).length === 0) {
			// 	formik.setStatus({ isSubmitting: true });
			// }
			return errors;
		},
		onSubmit: (values, { setSubmitting }) => {
			dispatch(addTicketCategory({ values, token }))
			setIsLoading(true);
			setTimeout(() => {
				setSubmitting(false);
			}, 2000);
		},
	});
	return (
		<PageWrapper title={demoPagesMenu.ticketPages.subMenu.ticketCategory.text}>
			<Page>
				<Card>
					<CardHeader>
						<CardLabel icon='Add' iconColor='success'>
							<CardTitle>Add New Ticket Category</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<form onSubmit={formik.handleSubmit}>
							<div className='row g-4 d-block mx-3'>
								<div className='col-lg-6'>
									<FormGroup id='ticketCategory' label='Ticket Category Name' >
										<Input
											placeholder='Enter Ticket Category Name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.ticketCategory}
											isValid={formik.isValid}
											isTouched={formik.touched.ticketCategory}
											invalidFeedback={formik.errors.ticketCategory}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>

							</div>

							<div className='mx-3'>
								<Button
									className='w-20 py-3 px-3 my-3'
									icon={isLoading ? undefined : 'Save'}
									isLight
									color={isLoading ? 'success' : 'info'}
									isDisable={isLoading}
									onClick={formik.handleSubmit}>
									{isLoading && <Spinner isSmall inButton />}
									Save & Close
								</Button>
								<Button
									className='w-20 py-3 px-3 my-3 mx-2'
									color={'danger'}
									isLight
									shadow='default'
									hoverShadow='none'
									icon='Cancel'
									onClick={() => {
										formik.resetForm()
										navigate(-1)
									}}
								>
									Cancel
								</Button>
							</div>
						</form>

					</CardBody>

				</Card>
			</Page>
		</PageWrapper>
	);
};

export default NewTicketCategory;

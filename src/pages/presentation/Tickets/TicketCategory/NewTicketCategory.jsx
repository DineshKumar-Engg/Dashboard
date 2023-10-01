import  { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import useDarkMode from '../../../../hooks/useDarkMode';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import Button from '../../../../components/bootstrap/Button';

import Icon from '../../../../components/icon/Icon';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import {  addTicketCategory } from '../../../../redux/Slice';
import { errorMessage, loadingStatus, successMessage} from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import { demoPagesMenu } from '../../../../menu';
import showNotification from '../../../../components/extras/showNotification';




const NewTicketCategory = () => {
		

	const {error,Loading,success,token}=useSelector((state)=>state.festiv)

	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSave = (val) => {
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-6'>{val}</span>
			</span>,
			
		);
		if(success){
			navigate('../ticketPages/ticketCategory')
		}
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))

	};





	useEffect(() => {

		error && handleSave(error)
		success && handleSave(success)
		if(Loading)
        {
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
	  }, [error,success,Loading]);




	const formik = useFormik({
		initialValues: {
			ticketCategory:'',
			// seoTitle:'',
			// seoDescription:'',
			status:true
		},
		validate: (values) => {

			const errors={}

			if (!values.ticketCategory) {
				errors.ticketCategory = 'Required';
			} else if (values.ticketCategory.length < 3) {
				errors.ticketCategory = 'Must be 3 characters or more';
			} else if (values.ticketCategory.length > 200) {
				errors.ticketCategory = 'Must be 200 characters or less';
			}
		
			//  if (values.seoTitle.length > 60) {
			// 	errors.seoTitle = 'Must be 60 characters or less';
			// }
		
			// if (values.seoDescription.length > 160) {
			// 	errors.seoDescription = 'Must be 160 characters or less';
			// }

			if (Object.keys(errors).length === 0) {
				formik.setStatus({ isSubmitting: true });
			}
		
			return errors;
		  },
		onSubmit: (values, { setSubmitting }) => {
			dispatch(addTicketCategory({values,token}))
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
										{/* <div className='col-lg-6 col-md-12'>
											<FormGroup id='seoTitle' label='SEO Title' >
												<Input
													placeholder='Enter SEO Title'
													autoComplete='seoTitle'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.seoTitle}
													isValid={formik.isValid}
													isTouched={formik.touched.seoTitle}
													invalidFeedback={formik.errors.seoTitle}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-lg-6 col-12'>
											<FormGroup
												id='seoDescription'
												label='SEO Description'
												
												>
												<Textarea
													placeholder='Enter SEO Description'
													autoComplete='seoDescription'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.seoDescription}
													isValid={formik.isValid}
													isTouched={formik.touched.seoDescription}
													invalidFeedback={formik.errors.seoDescription}
													validFeedback='Looks good!'
													rows={5}
												/>
											</FormGroup>
										</div> */}
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
					onClick={()=>{
						formik.resetForm()
						navigate('../ticketPages/ticketCategory')
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

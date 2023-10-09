import React, { useState, useEffect } from 'react';
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
import { addCategoryList } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'




const NewCategory = () => {

	const { error, Loading, success, token } = useSelector((state) => state.festiv)

	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch()
	const navigate = useNavigate()



	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
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
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
		Loading ? setIsLoading(true) : setIsLoading(false)
	}, [error, success, Loading]);


	const formik = useFormik({
		initialValues: {
			categoryName: '',
			status: true
		},
		validate: (values) => {

			const errors = {}

			if (!values.categoryName) {
				errors.categoryName = 'Required';
			} else if (values.categoryName.length < 3) {
				errors.categoryName = 'Must be 3 characters or more';
			} else if (values.categoryName.length > 100) {
				errors.categoryName = 'Must be 100 characters or less';
			}

			if (Object.keys(errors).length === 0) {
				formik.setStatus({ isSubmitting: true });
			}

			return errors;
		},
		onSubmit: (values, { setSubmitting }) => {
			console.log("submit", values);
			dispatch(addCategoryList({ values, token }))
			setIsLoading(true);
			setTimeout(() => {
				setSubmitting(false);
			}, 2000);
		},
	});

	return (
		<PageWrapper>
			<Page>

				<Card>
					<CardHeader>
						<CardLabel icon='Add' iconColor='success'>
							<CardTitle>Add New Event Category</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<form onSubmit={formik.handleSubmit}>
							<div className='row g-4 d-block  mx-3'>
								<div className='col-lg-6'>
									<FormGroup id='categoryName' label='Category Name' >
										<Input
											placeholder='Enter Category Name'
											autoComplete='categoryName'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.categoryName}
											isValid={formik.isValid}
											isTouched={formik.touched.categoryName}
											invalidFeedback={formik.errors.categoryName}
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
									className='w-20 py-3 px-3 my-3 mx-3'
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
	)
}
export default NewCategory


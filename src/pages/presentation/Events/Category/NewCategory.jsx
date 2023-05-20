import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import useDarkMode from '../../../../hooks/useDarkMode';
import validate from '../../helper/editPagesValidate';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import Button from '../../../../components/bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import dayjs, { Dayjs } from 'dayjs';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'

const NewCategory = () => {

	const { themeStatus } = useDarkMode();

 	const [lastSave, setLastSave] = useState( null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch()

	const handleSave = () => {
		setLastSave(dayjs());
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Updated Successfully</span>
			</span>,
			"The Event Category have been successfully updated.",
		);
	};


	const formik = useFormik({
		initialValues: {
			categoryName:'',
			seoTitle:'',
			seoDescription:''
		},
		validate: (values) => {

			const errors={}

			if (!values.categoryName) {
				errors.categoryName = 'Required';
			} else if (values.categoryName.length < 3) {
				errors.categoryName = 'Must be 3 characters or more';
			} else if (values.categoryName.length > 20) {
				errors.categoryName = 'Must be 20 characters or less';
			}
		
			if (!values.seoTitle) {
				errors.seoTitle = 'Required';
			} else if (values.seoTitle.length < 3) {
				errors.seoTitle = 'Must be 3 characters or more';
			} else if (values.seoTitle.length > 20) {
				errors.seoTitle = 'Must be 20 characters or less';
			}
		
			if (!values.seoDescription) {
				errors.seoDescription = 'Required';
			} else if (values.seoDescription.length < 3) {
				errors.seoDescription = 'Must be 3 characters or more';
			}
			else if (values.seoDescription.length < 40) {
				errors.seoDescription = 'Must be 40 characters or less';
			}
			if (Object.keys(errors).length === 0) {
				formik.setStatus({ isSubmitting: true });
			}
		
			return errors;
		  },
		onSubmit: (values, { setSubmitting }) => {
			setIsLoading(true);
			setTimeout(() => {
			  setSubmitting(false);
			}, 2000); 
			setTimeout(handleSave, 2000);
			console.log("submit",values)
			// dispatch(addCategoryList(values))
		  },
		
	});


  return (
    <PageWrapper>
		{/* <SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Category', to: '/events/categories' },
							{ title: 'New Category', to: '/' },
						]}
					/>
					<SubheaderSeparator />
				</SubHeaderLeft>
			</SubHeader> */}
			<Page>
				
			<Card>
							<CardHeader>
								<CardLabel icon='Add' iconColor='success'>
									<CardTitle>Add New Event Category</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<form onSubmit={formik.handleSubmit}>
								<div className='row g-4 d-block'>
									<div className='col-lg-6'>
										<FormGroup id='categoryName' label='Category Name' >
											<Input
												placeholder='Category Name'
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
									<div className='col-lg-6 col-md-12'>
										<FormGroup id='seoTitle' label='SEO Title' >
											<Input
												placeholder='SEO Title'
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
											className='px-2 py-2'
											>
											<Textarea
												placeholder='SEO Description'
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
									</div>
								</div>
								{/* <Button
				className='w-20 py-3 px-3 my-3'
				color='dark'
				isLight
				shadow='default'
				hoverShadow='none'
				icon='Bookmark'
				type="submit"
				
				>
				Save & Close
			</Button> */}
												<Button
													className='w-20 py-3 px-3 my-3'
													icon={isLoading ? undefined : 'Save'}
													isLight
													color={isLoading ? 'success' : 'info'}
													isDisable={isLoading}
													onClick={formik.handleSubmit}>
													{isLoading && <Spinner isSmall inButton />}
													{isLoading
														? (lastSave && 'Saving') || 'Publishing'
														: (lastSave && 'Saved') || 'Save & Close'}
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
				}}
				>
				Cancel
			</Button>
								</form>
								
							</CardBody>
					
						</Card>
			</Page>
		</PageWrapper>
  )
}
export default NewCategory
// import React from "react";
// import { Formik, Form, Field } from "formik";
// import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
// import Page from '../../../../layout/Page/Page';
// import validate from '../../helper/editPagesValidate';
// import Input from '../../../../components/bootstrap/forms/Input';

// const NewCategory = () => {
//   const handleSubmit = (values, { setSubmitting }) => {
//     // Perform any necessary form submission logic here
//     // For the sake of this example, let's use a setTimeout to simulate an asynchronous request
//     setTimeout(() => {
//       // Submission complete, set isSubmitting back to false
//       setSubmitting(false);

//       // Perform any further actions after successful form submission
//     }, 2000); // Simulating a 2-second delay for the sake of this example

//     // Note: If you have any asynchronous validation or side effects during form submission,
//     // make sure to set isSubmitting to true before performing those actions, and then set it back to false when they are complete.
// 	console.log(values);
// };


//   return (
// 	<PageWrapper>
// 			<Page>

//     <Formik
//       initialValues={{
//         // Set your initial form values here
//         // Example: name: "",
//       }}
//       validationSchema={validate}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting ,handleChange,handleBlur,isValid,touched,errors,values}) => (
//         <Form>
//         					 <Input
// 												placeholder='Category Name'
// 												autoComplete='categoryName'
// 												onChange={handleChange}
// 												onBlur={handleBlur}
// 												value={values.categoryName}
// 												isValid={isValid}
// 												isTouched={touched.categoryName}
// 												invalidFeedback={errors.categoryName}
// 												validFeedback='Looks good!'
// 												name="categoryName"
// 											/>
          
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
// 				</Page>
// 		</PageWrapper>
//   );
// };

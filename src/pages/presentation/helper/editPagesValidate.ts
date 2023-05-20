interface IValues {
	categoryName: string;
	seoTitle: string;
	seoDescription: string;
}
const validate = (values: IValues) => {
	const errors: IValues = {
		categoryName: '',
		seoTitle: '',
		seoDescription: '',
	};
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
	

	return errors;
};

export default validate;

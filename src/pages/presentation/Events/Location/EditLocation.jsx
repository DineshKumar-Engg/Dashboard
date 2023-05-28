import React, { useRef, useState,useEffect } from 'react';
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
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import { withGoogleMap, GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Label from '../../../../components/bootstrap/forms/Label';
import { useParams } from 'react-router-dom';
import { getLocationId } from '../../../../redux/Slice';
import { errorMessage, loadingStatus, successMessage} from '../../../../redux/Slice';
import { addLocationList, citylist, statelist } from '../../../../redux/Slice';


const EditLocation = () => {

	const {error,Loading,success,stateLists,cityLists} = useSelector((state) => state.festiv)
    const lib = ['places'];

	const dispatch = useDispatch()


    const center = {lat: 11.0247072, lng: 77.0106034}

    const { themeStatus } = useDarkMode();
    const inputRef = useRef()
    const [lastSave, setLastSave] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLocation, setInitialLocation] = useState({ lat: 0, lng: 0 });


    const mapStyles = {
        height: '300px',
        width: '100%',
    };

    const handleSave = (val) => {
        setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span className='fs-5'>{val}</span>
			</span>,
		);
		dispatch(errorMessage({errors:''}))
		dispatch(successMessage({successess:''}))
		dispatch(loadingStatus({loadingStatus:false}))
		if(success){
			navigate('../events/location')
		}
    };

	useEffect(() => {

		error && handleSave(error)
		success && handleSave(success)
		Loading &&	setIsLoading(true)
	  }, [error,success,Loading]);

    const handlePlace = () => {
        console.log(inputRef.current.getPlaces());
        const [place] = inputRef.current.getPlaces()
        if (place) {
            console.log(place.formatted_address)
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
            setInitialLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
    }

    console.log(initialLocation);

    const formik = useFormik({
        initialValues: {
            locationName: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            status:true
        },
        validate: (values) => {

            const errors = {}
            if (!values.locationName) {
                errors.locationName = 'Required';
            }

            if (!values.address) {
                errors.address = 'Required';
            } else if (values.address.length > 3) {
                errors.address = 'Must be 3 characters or more';
            } else if (values.address.length < 40) {
                errors.address = 'Must be 40 characters or less';
            }

            if (!values.city) {
                errors.city = 'Required';
            }
            if (!values.state) {
                errors.state = 'Required';
            }

            if (!values.postalCode) {
                errors.postalCode = 'Required';
            }

            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
             values.locationName = searchData
            values.latitude = initialLocation.lat
            values.longitude =initialLocation.lng
            dispatch(addCategoryList(values))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
            setTimeout(handleSave, 2000);
            console.log("submit", values)
        },

    });

    useEffect(()=>{
        dispatch(statelist())
        dispatch(citylist(formik.values.state))
      },[formik.values.state])

  return (
    <PageWrapper>

            <Page>

                <Card>
                    <CardHeader>
                        <CardLabel icon='AddLocation' iconColor='success'>
                            <CardTitle>Edit Location</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='row'>
                            <div className="col-lg-6">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='row g-4 d-block'>

                                        <div className='col-lg-12 col-md-12'>
                                            <FormGroup id='address' label='Address' >
                                                <Input
                                                    placeholder='Enter Your Address'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.address}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.address}
                                                    invalidFeedback={formik.errors.address}
                                                    validFeedback='Looks good!'
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className='row g-4'>
                                            <div className='col-lg-6 locationSelect'>
                                               <FormGroup id='state' label='State'>
                                                    <Select
                                                        placeholder='--Select Your State--'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.state}
                                                        isValid={formik.isValid}
                                                        isTouched={formik.touched.state}
                                                        invalidFeedback={formik.errors.state}
                                                        validFeedback='Looks good!'
                                                        ariaLabel='label'
                                                    >
                                                        {
                                                            stateLists.map((item,index)=>(
                                                                <Option  key={index} value={item?.value}>{item?.label}</Option>
                                                            ))
                                                        }
                                                       
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-lg-6 locationSelect'>
                                                <FormGroup id='city' label='City'>
                                                    <Select
                                                        placeholder='--Select Your City--'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.city}
                                                        isValid={formik.isValid}
                                                        isTouched={formik.touched.city}
                                                        invalidFeedback={formik.errors.city}
                                                        validFeedback='Looks good!'
                                                        ariaLabel='label'
                                                    >
                                                        {
                                                            cityLists?.map((items,index)=>(
                                                                <Option slot='4' key={index} value={items?.value}>{items?.label}</Option>  
                                                            ))
                                                        }
                                                       
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                            <FormGroup id='postalCode' label='Postal' >
                                                <Input
                                                    type='number'
                                                    placeholder='Enter Your Postal'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.postalCode}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.postalCode}
                                                    invalidFeedback={formik.errors.postalCode}
                                                    validFeedback='Looks good!'
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

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
                                            navigate('../events/location')
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <LoadScript
                                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                    libraries={lib}
                                >
                                    
                                    <StandaloneSearchBox
                                        onLoad={ref => { inputRef.current = ref }}
                                        onPlacesChanged={handlePlace}
                                    >
                                        <FormGroup id='locationName' label='Search Location' >
                                        <Input
                                            type="text"
                                            placeholder='Search Location'
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.locationName}
                                            isValid={formik.isValid}
                                            isTouched={formik.touched.locationName}
                                            invalidFeedback={formik.errors.locationName}
                                        />
                                        </FormGroup>
                                    </StandaloneSearchBox>
                                    <GoogleMap 
                                     mapContainerStyle={mapStyles} 
                                     zoom={10}   
                                     center={center} 
                                    >
                                        <Marker position={initialLocation} />
                                    </GoogleMap>
                                </LoadScript>     
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
  )
}

export default EditLocation
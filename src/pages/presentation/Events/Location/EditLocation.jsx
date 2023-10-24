import  { useRef, useState, useEffect } from 'react';
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
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Spinner from '../../../../components/bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import {  GoogleMap,Marker } from '@react-google-maps/api';

import { useNavigate, useParams } from 'react-router-dom';
import { GetLocationId,  saveLocation } from '../../../../redux/Slice';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';
import { citylist, statelist } from '../../../../redux/Slice';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'



const libraries  = ["places"];

const EditLocation = () => {





    const { error, Loading, success, stateLists, cityLists, token, LocationData } = useSelector((state) => state.festiv)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        dispatch(GetLocationId({ id, token }))
    }, [id])


    const center = { lat: 39.833851, lng: -74.871826 }

    const [isLoading, setIsLoading] = useState(false);
    const [initialLocation, setInitialLocation] = useState({ lat: 0, lng: 0 });
    const [markers, setMarkers] = useState([]);
    const [searchData, setSearchData] = useState('')
    const [map, setMap] = useState(/** @type google.maps.Map */(null))

    const mapStyles = {
        height: '300px',
        width: '100%',
    };

    useEffect(() => {
        dispatch(GetLocationId({ token, id }))
    }, [id])


	const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
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


    const searchBoxRef = useRef()
    const onSBLoad = ref => {
        searchBoxRef.current = ref;
    };


    const onPlacesChanged = () => {
        const results = searchBoxRef.current.getPlaces();
        const [place] = searchBoxRef.current.getPlaces()
        if (place) {
            setSearchData(place.formatted_address)
            formik.values.address = place.formatted_address

            setInitialLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
        setInitialLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        setMarkers(results[0].geometry.location);
    };


    const handleMapClick = (event) => {
        setMarkers(event?.latLng)
        setInitialLocation({ lat: event?.latLng.lat(), lng: event?.latLng.lng() });
    }


    useEffect(() => {
        formik.setValues({
            locationName: LocationData?.locationName  || '',
            address: LocationData?.address || '',
            city: LocationData?.city || '',
            state: LocationData?.state || '',
            postalCode: LocationData?.postalCode || '',
            status: LocationData?.status || false
        });
        setInitialLocation({ lat: LocationData?.latitude, lng: LocationData?.longitude });
        setSearchData(LocationData?.address)
        if (LocationData?.latitude && LocationData?.longitude) {
            const lat = parseFloat(LocationData.latitude);
            const lng = parseFloat(LocationData.longitude);
            setMarkers({ lat, lng });
        }

    }, [LocationData]);


    const formik = useFormik({
        initialValues: {
            locationName: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            status: true
        },
        validate: (values) => {

            const errors = {}
            if (!values.locationName) {
                errors.locationName = 'Required';
            } 
            else if (values.locationName.length < 3) {
                errors.locationName = 'Must be 3 characters or more';
            }
            else if (values.locationName.length > 200) {
                errors.locationName = 'Must be 200 characters or less';
            }

            if (!values.address) {
                errors.address = 'Required';
            }
            
            if (!values.city) {
                errors.city = 'Required';
            }
            if (!values.state) {
                errors.state = 'Required';
            }

            if (!values.postalCode) {
                errors.postalCode = 'Required';
            }else if(!/^\d{5}$/.test(values.postalCode)){
                errors.postalCode = 'Zip code number must be 5 digit  number';
            }

          

            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            values.address = searchData
            values.latitude = initialLocation.lat.toString()
            values.longitude = initialLocation.lng.toString()
            values.postalCode = values.postalCode.toString()
            dispatch(saveLocation({ values, id, token }))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },

    });

    useEffect(() => {
        dispatch(statelist())
        dispatch(citylist(formik.values.state))
    }, [formik.values.state])

    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='EditLocation' iconColor='success'>
                            <CardTitle>Edit Location</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row mx-3'>
                                <div className="col-lg-6">
                                    <div className='row g-4 d-block'>

                                        <div className='col-lg-12 col-md-12'>
                                        <FormGroup id='locationName' label='Location Name' >
                                                <Input
                                                    placeholder='Enter Your Location Name'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.locationName}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.locationName}
                                                    invalidFeedback={formik.errors.locationName}
                                                    validFeedback='Looks good!'
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className='row g-4  mx-1'>
                                            <div className='col-lg-5 locationSelect'>
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
                                                            stateLists.map((item, index) => (
                                                                <Option key={index} value={item?.value}>{item?.label}</Option>
                                                            ))
                                                        }

                                                    </Select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-lg-5 locationSelect'>
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
                                                            cityLists?.map((items, index) => (
                                                                <Option slot='4' key={index} value={items?.value}>{items?.label}</Option>
                                                            ))
                                                        }

                                                    </Select>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                            <FormGroup id='postalCode' label='Zip Code' >
                                                <Input
                                                    type='text'
                                                    placeholder='Enter Your Zip Code'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.postalCode}
                                                    isValid={formik.isValid}
                                                    isTouched={formik.touched.postalCode}
                                                    invalidFeedback={formik.errors.postalCode}
                                                    validFeedback='Looks good!'
                                                    min={0}
                                                    max={9}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                  

                                </div>
                                <div className="col-lg-4">
                                    <LoadScript
                                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                        libraries={libraries }
                                    >
                                        <StandaloneSearchBox
                                            onLoad={onSBLoad}
                                            onPlacesChanged={onPlacesChanged}
                                        >
                                            <FormGroup label='Location Address' >
                                            <Input type='text'
                                                placeholder='Search Location Address'
                                                id='address'
                                                className='form-control'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                                isValid={formik.isValid}
                                                isTouched={formik.touched.address}
                                                invalidFeedback={formik.errors.address}
                                            />
                                        </FormGroup>
                                        </StandaloneSearchBox>
                                        <GoogleMap
                                            center={center}
                                            zoom={1}
                                            mapContainerStyle={mapStyles}
                                            onLoad={map => setMap(map)}
                                            onClick={handleMapClick}
                                        >
                                            <Marker position={markers} />
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                            <div>
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
                            </div>
                            </div>
                        </form>

                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    )
}

export default EditLocation
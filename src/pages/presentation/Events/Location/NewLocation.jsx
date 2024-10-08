import { useEffect, useRef, useState } from 'react';
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
import { GoogleMap, Marker } from '@react-google-maps/api';
import { citylist, saveLocation, statelist } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon, BtnCanCel, BtnGreat } from '../../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../../redux/Action'



const libraries = ["places"];


const NewLocation = () => {


    const { error, Loading, success, token } = useSelector((state) => state.festiv)

    const [isLoading, setIsLoading] = useState(false);
    const [initialLocation, setInitialLocation] = useState({ lat: 0, lng: 0 });
    const [searchData, setSearchData] = useState('')
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mapStyles = {
        height: '250px',
        width: '100%',
    };

    const center = { lat: 39.833851, lng: -74.871826 }




    const Notification = (val, tit, pos, ico, btn) => {
        Swal.fire({
            position: `${pos}`,
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
        error && Notification(error, errTitle, poscent, errIcon, BtnCanCel)
        success && Notification(success, scc, posTop, sccIcon, BtnGreat)
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


    const formik = useFormik({
        initialValues: {
            locationName: '',
            address: '',
            status: true,
            latitude: '',
            longitude: '',
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


            if (Object.keys(errors).length === 0) {
                formik.setStatus({ isSubmitting: true });
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            values.address = searchData
            values.latitude = initialLocation.lat.toString()
            values.longitude = initialLocation.lng.toString()

            dispatch(saveLocation({ values, token }))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        },
    });

    // useEffect(() => {
    //     dispatch(statelist(token))
    //     dispatch(citylist(formik.values.state))
    // }, [formik.values.state])


    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='AddLocation' iconColor='success'>
                            <CardTitle>Add New Location</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row mx-3'>
                                <div className="col-lg-6">
                                    <div className='row d-block'>
                                        <div className='col-lg-8 col-md-12'>
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

                                        <div className="col-lg-8">
                                            <LoadScript
                                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                                libraries={libraries}
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
                                    </div>

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
                                            navigate(-1)
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

export default NewLocation



import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, useFormik, useFormikContext } from 'formik';
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
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Label from '../../../../components/bootstrap/forms/Label';
import { addLocationList, citylist, statelist } from '../../../../redux/Slice';
import { useNavigate } from 'react-router-dom';
import { errorMessage, loadingStatus, successMessage } from '../../../../redux/Slice';



const NewLocation = () => {
    const { error, Loading, success, stateLists, cityLists } = useSelector((state) => state.festiv)

    const lib = ['places'];
    const { themeStatus } = useDarkMode();

    const [isLoading, setIsLoading] = useState(false);
    const [initialLocation, setInitialLocation] = useState({ lat: 0, lng: 0 });
    const [searchData, setSearchData] = useState('')
    const [markers, setMarkers] = useState([]);


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const mapStyles = {
        height: '300px',
        width: '100%',
    };
    const center = { lat: 39.833851, lng: -74.871826 }

console.log(error);
console.log(Loading);
console.log(success);

    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span className='fs-6'>{val}</span>
            </span>,
        );
        if (success) {
            navigate('../events/location')
        }
        dispatch(errorMessage({ errors: '' }))
        dispatch(successMessage({ successess: '' }))
        dispatch(loadingStatus({ loadingStatus: false }))

    };
    
    useEffect(() => {

        error && handleSave(error)
        success && handleSave(success)
        Loading && setIsLoading(true)
    }, [error, success, Loading]);




    const searchBoxRef = useRef()
    const onSBLoad = ref => {
        searchBoxRef.current = ref;
    };

    const onPlacesChanged = () => {
        // const markerArray = [];
        const results = searchBoxRef.current.getPlaces();
        const [place] = searchBoxRef.current.getPlaces()
        // console.log(results)

        if (place) {
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
            setSearchData(place.formatted_address)
            setInitialLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
        setInitialLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        setMarkers(results[0].geometry.location);
    };

    console.log(initialLocation);
    
    const handleMapClick=(event)=>{
        setMarkers(event?.latLng)
        console.log(event?.latLng);
    }

    const formik = useFormik({
        initialValues: {
            locationName: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            status: true,
            latitude: '',
            longitude: '',
        },
        validate: (values) => {
            const errors = {}
            if (!values.locationName) {
                errors.locationName = 'Required';
            }

            if (!values.address) {
                errors.address = 'Required';
            } else if (values.address.length < 3) {
                errors.address = 'Must be 3 characters or more';
            } else if (values.address.length > 40) {
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
            values.latitude = initialLocation.lat.toString()
            values.longitude = initialLocation.lng.toString()
            values.postalCode = values.postalCode.toString()
            dispatch(addLocationList(values))
            setIsLoading(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
            console.log("submit", values)
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
                        <CardLabel icon='AddLocation' iconColor='success'>
                            <CardTitle>Add New Location</CardTitle>
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
                                                            stateLists?.length>0 ?
                                                            (
                                                                stateLists.map((item, index) => (
                                                                    <Option key={index} value={item?.value}>{item?.label}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait,Server Busy...</Option>
                                                            )
                                                         
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
                                                            cityLists?.length > 0 ?
                                                            (
                                                                cityLists?.map((items, index) => (
                                                                    <Option slot='4' key={index} value={items?.value}>{items?.label}</Option>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Option>Please wait,Server Busy...</Option>
                                                            )
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
                                        onLoad={onSBLoad}
                                        onPlacesChanged={onPlacesChanged}
                                        // bounds={bounds}
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
                                        center={center}
                                        zoom={1}
                                        mapContainerStyle={mapStyles}
                                        onClick={handleMapClick}
                                    >
                                        {/* {markers.map((mark, index) => ( */}
                                            <Marker
                                                // key={index}
                                         
                                                position={markers}

                                            />
                                        {/* // ))} */}
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

export default NewLocation



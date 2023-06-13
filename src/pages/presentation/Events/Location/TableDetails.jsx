import React, { useState } from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import Page from '../../../../layout/Page/Page';
import { withGoogleMap, GoogleMap, useJsApiLoader, Marker, LoadScript } from '@react-google-maps/api';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import useOpenController from '../../../Common/ToggleHooks';
import { ExpendableButton } from '../../../Common/ExpandableButton';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../../redux/Slice';
import Label from '../../../../components/bootstrap/forms/Label';

const TableDetails = () => {

    const lib = ['places'];

    const mapStyles = {
        height: '400px',
        width: '100%',
    };
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))

    const center = { lat: 39.833851, lng: -74.871826 }
    const {canva,canvaList}=useSelector((state)=>state.festiv)

    const dispatch = useDispatch()


	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);


    const handleCanvaClose = ()=>{
        
        dispatch(canvaBoolean({canvas:!canva}))
    }



    return (
        <>
     	<OffCanvas
				setOpen={setUpcomingEventsEditOffcanvas}
				isOpen={upcomingEventsEditOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader onClick={handleCanvaClose } setOpen={setUpcomingEventsEditOffcanvas}>
					<OffCanvasTitle id='upcomingEdit' className='bg-dark text-white rounded py-2 px-4'>Your Location Details</OffCanvasTitle>
                </OffCanvasHeader>
				<OffCanvasBody>
                        <div className='row g-4'>
                            <div className="col-lg-6 col-sm-12">
                                <Label>Location Name</Label>
                                <p>{canvaList?.locationName}</p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                            <Label>Address</Label>
                                <p>{canvaList?.address}</p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                            <Label>City</Label>
                                <p>{canvaList?.city}</p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                            <Label>State</Label>
                                <p>{canvaList?.state}</p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                            <Label>Postal Code</Label>
                                <p>{canvaList?.postalCode}</p>
                            </div>
                            <div className="col-12">
                              <LoadScript
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                libraries={['visualization']}
                              >
                              <GoogleMap 
                                     mapContainerStyle={mapStyles} 
                                     zoom={1}
                                     center={center}
                                     onLoad={map => setMap(map)}
                                     >
                                        <Marker position={{lat:JSON.parse(canvaList?.latitude),lng:JSON.parse(canvaList?.longitude)}} />
                                    </GoogleMap>
                              </LoadScript>
                            </div>
                        </div>
				</OffCanvasBody>
			</OffCanvas>
        </>
    )
}

export default TableDetails


{/* <LoadScript
googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
libraries={lib}
>
      <Autocomplete>      
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
            ref={searchBoxRef}
        />
    </FormGroup>
</StandaloneSearchBox>
</Autocomplete>

<GoogleMap
    center={center}
    zoom={1}
    mapContainerStyle={mapStyles}
    onClick={handleMapClick}
>
        <Marker
     
            position={markers}

        />
</GoogleMap>
</LoadScript> */}
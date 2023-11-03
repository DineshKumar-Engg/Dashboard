import  { useState } from 'react'
import {  GoogleMap,  Marker, LoadScript } from '@react-google-maps/api';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { canvaBoolean } from '../../../../redux/Slice';
import Label from '../../../../components/bootstrap/forms/Label';

const lib = ['visualization'];

const TableDetails = () => {


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
                            <div className="col-lg-12 col-sm-12">
                                <Label>Location Name</Label>
                                <h5>{canvaList?.locationName}</h5>
                            </div>
                            <div className="col-lg-12 col-sm-12">
                            <Label>Address Name</Label>
                                <h5>{canvaList?.address}</h5>
                            </div>
                            
                            <div className="col-lg-6 col-sm-12">
                            <Label>Number Of Events</Label>
                                <h5>{canvaList?.numberOfEvents}</h5>
                            </div>
                            <div className="col-12">
                              <LoadScript
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                libraries={lib}
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


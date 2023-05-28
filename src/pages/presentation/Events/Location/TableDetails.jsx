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

    // const { isOpen, toggle } = useOpenController(false);
    const lib = ['places'];

    const mapStyles = {
        height: '400px',
        width: '100%',
    };

    const center = {lat: 11.0247072, lng: 77.0106034}

const {canva,canvaList}=useSelector((state)=>state.festiv)

    // const API = 'AIzaSyCrRwQZKpFBc5MeQGViOVq-IU5RhdKX8GQ'

    // const lib = ['places'];
    const dispatch = useDispatch()

console.log("canvaList",canvaList);

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(canva);

    console.log("upcomingEventsEditOffcanvas",upcomingEventsEditOffcanvas);

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
					<OffCanvasTitle id='upcomingEdit'>Your Location Details</OffCanvasTitle>
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
                                    <GoogleMap 
                                     mapContainerStyle={mapStyles} 
                                     zoom={10}   
                                     center={center}
                                     googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
 
                                    >
                                        <Marker position={center} />
                                    </GoogleMap>
                            </div>
                        </div>
				</OffCanvasBody>
			</OffCanvas>
        </>
    )
}

export default TableDetails
{/* <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <p>{items?.address}</p>
                        <p>{items?.city}</p>
                        <p>{items?.locationName}</p>
                        <p>{items?.California}</p>
                    </div>
                    <div className="col-lg-6">
                    </div>
                </div>
            </div> */}

//             <tr className='tableRow'>
//             <td className='tableContent'>
//                 <p><strong>Location </strong> : {items?.locationName}</p>
//                 <p><strong>Address </strong>: {items?.address}</p>
//                 <p><strong>City </strong>: {items?.city}</p>
//                 <p><strong>State </strong>: {items?.state}</p>
//                 <p><strong>PostalCode </strong>: {items?.postalCode}</p>
//             </td>
//             <td className='tableContent'>
//                 {/* <LoadScript
//                 // googleMapsApiKey={API}
//                 // libraries={lib}
//                 >
//                     <GoogleMap
//                         mapContainerStyle={mapStyles}
//                         zoom={10}
//                     >
//             <Marker position={`lat:${items?.latitude},lng:${items?.longitude}`} />
//                     </GoogleMap>
//                 </LoadScript> */}
//     {/* <iframe width="100%" height="450" frameborder="0" src={`https://www.google.com/maps/embed/v1/place?q=${items?.latitude},${items?.longitude}&zoom=10&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`}></iframe> */}
//   </td>
//         </tr>
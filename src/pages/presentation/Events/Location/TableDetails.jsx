import React from 'react'
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import Page from '../../../../layout/Page/Page';
import { withGoogleMap, GoogleMap, useJsApiLoader, Marker, LoadScript } from '@react-google-maps/api';

const TableDetails = ({ items }) => {
    const mapStyles = {
        height: '400px',
        width: '100%',
    };
    // const API = 'AIzaSyCrRwQZKpFBc5MeQGViOVq-IU5RhdKX8GQ'

    // const lib = ['places'];

console.log(items);

    return (
        <>
            <tr className='tableRow'>
                <td className='tableContent'>
                    <p><strong>Location </strong> : {items?.locationName}</p>
                    <p><strong>Address </strong>: {items?.address}</p>
                    <p><strong>City </strong>: {items?.city}</p>
                    <p><strong>State </strong>: {items?.state}</p>
                    <p><strong>PostalCode </strong>: {items?.postalCode}</p>
                </td>
                <td className='tableContent'>
                    {/* <LoadScript
                    // googleMapsApiKey={API}
                    // libraries={lib}
                    >
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={10}
                        >
                <Marker position={`lat:${items?.latitude},lng:${items?.longitude}`} />
                        </GoogleMap>
                    </LoadScript> */}
        {/* <iframe width="100%" height="450" frameborder="0" src={`https://www.google.com/maps/embed/v1/place?q=${items?.latitude},${items?.longitude}&zoom=10&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`}></iframe> */}
      </td>
            </tr>
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
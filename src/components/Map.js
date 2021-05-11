import React, {useEffect, useState,useRef, useCallback} from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';

import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapGL, {Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

import styles from './Map.module.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFtaXNoMjc1MCIsImEiOiJja25sbHY0Y24wODZvMm9reDQybmRjOWFmIn0.e11jMwucWn5X5_V9gK4a7A'


const Map = (props) => {
    const [open, setOpen] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 33.6844,
        longitude: 73.0479,
        zoom: 10
    });

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const onCloseModal = () => {
        props.onClose()
        setOpen(false)
    }

    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => {
            setViewport(newViewport)
            setMarker({
                longitude: newViewport.longitude,
                latitude: newViewport.latitude
            })
        },
        []
    );

    const [marker, setMarker] = useState({
        latitude: viewport.latitude,
        longitude: viewport.longitude
    });
    const [events, logEvents] = useState({});

    const onMarkerDragStart = useCallback(event => {
        logEvents(_events => ({..._events, onDragStart: event.lngLat}));
    }, []);

    const onMarkerDrag = useCallback(event => {
        logEvents(_events => ({..._events, onDrag: event.lngLat}));
    }, []);

    const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
        console.log(event)
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    }, []);

    return (
        <>
            <Modal open={open} onClose={onCloseModal} center>
                <div className={styles.map}>
                    <div className={styles.mapHeader}>
                        <span>{props.modalTitle}</span>
                        <button className={'btn btn--small'}>{props.modalButton} <i
                            className="fas fa-arrow-right"/></button>
                    </div>
                    <div className={styles.mapOuterContainer}>
                        <div className={styles.geocoderContainer}
                             ref={geocoderContainerRef}
                        />
                        <Geocoder
                            mapRef={mapRef}
                            containerRef={geocoderContainerRef}
                            onViewportChange={handleViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            position="top-left"
                            marker={false}
                        />
                        <MapGL
                            ref={mapRef}
                            {...viewport}
                            width="100%"
                            height="100%"
                            // mapStyle="mapbox://styles/ramish2750/cknlmlqs11awz17pb32ubs74w"
                            mapStyle={"mapbox://styles/ramish2750/cknlmi4412zdc17mif6vximpm"}
                            onViewportChange={handleViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}

                        >
                            <Marker
                                longitude={marker.longitude}
                                latitude={marker.latitude}
                                draggable
                                onDragStart={onMarkerDragStart}
                                onDrag={onMarkerDrag}
                                onDragEnd={onMarkerDragEnd}
                            ><i className="fas fa-map-marker-alt"/>
                            </Marker>
                        </MapGL>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Map

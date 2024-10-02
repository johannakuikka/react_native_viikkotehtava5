import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map(props) {
    const [markers, setMarkers] = useState([]);

    const [location, setLocation] = useState({
        latitude: 64.14797,
        longitude: 28.28564,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async() => {
            getUserPosition()
        })()
    }, [])

    const addMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarkers([...markers,coords])
    }

    return (
    <>
    <MapView
        style={styles.map}
        region={location}
        mapType='standard'
        onLongPress={addMarker}
    >
            {markers.map((marker,index) => (
                <Marker
                    key={index}
                    title={`My marker ${index + 1}`}
                    coordinate={{latitude: marker.latitude,longitude: marker.longitude}}              
                />
            ))}
    </MapView>
    </>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})
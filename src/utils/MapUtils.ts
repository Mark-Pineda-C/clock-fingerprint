import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';
interface RegionProps{
    latitude: number;
    longitude: number;
}

export function isInside (point: Location.LocationObject, coordinates: LatLng[]) {
    const x = point.coords.latitude; // latitude
    const y = point.coords.longitude; // longitude

    let inside = false;
    for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        const xi = coordinates[i].latitude;
        const yi = coordinates[i].longitude;
        const xj = coordinates[j].latitude;
        const yj = coordinates[j].longitude;

        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';
interface RegionProps{
    latitude: number;
    longitude: number;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    check_in_hour?: string;
    check_out_hour?: string;
    salary?: number;
    is_super_admin?: boolean;
    lastCheck: "entrada" | "salida" | "";
    for_test: boolean;
}

export interface RecordData {
    id: string;
    user_id: string;
    timestamp: FirebaseFirestoreTypes.Timestamp;
    type: "entrada" | "salida" | "";
    is_valid: boolean | null;
    excuse?: string;
    salary_reduction?: number;
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

export interface AppConfig {
    adminId: string;
    appName: string;
    geoValidation: FirebaseFirestoreTypes.GeoPoint[];
}

export function compareTime(targetTime: number[], threshold = [1,15] ){
    const [targetHour, targetMinute] = targetTime.map(time => time);
    const [thresholdHour, thresholdMinute] = threshold;
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    if(nowHour > targetHour + thresholdHour) return 1;
    if(nowHour < targetHour - thresholdHour) return -1;
    if(nowHour === targetHour){
        if(nowMinute > targetMinute + thresholdMinute) return 1;
        if(nowMinute < targetMinute - thresholdMinute) return -1;
        return 0;
    }
    return 0;
}
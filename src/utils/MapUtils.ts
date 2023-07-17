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
    lastCheck: Pick<RecordData, "timestamp" | "type">;
    for_test: boolean;
    location: RegionProps;
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
    const { latitude, longitude } = point.coords;

    let inside = false;
    for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        const xi = coordinates[i].latitude;
        const yi = coordinates[i].longitude;
        const xj = coordinates[j].latitude;
        const yj = coordinates[j].longitude;

        const intersect =  
            yi > longitude !== yj > longitude &&
            latitude <
            ((xj - xi) * (longitude - yi)) / (yj - yi) + xi;

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

export function formatTextToTime(text: string) {
    const sanitizedText = text.replace(/[^0-9]/g, '');

    if (sanitizedText.length <= 4) {
        let formattedTime = sanitizedText;
        if (sanitizedText.length >= 3) {
          formattedTime = `${sanitizedText.substr(0, 2)}:${sanitizedText.substr(2, 2)}`;
        }
        return formattedTime;
      }
  }
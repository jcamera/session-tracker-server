
type ParkingSessionStatus = 'ACTIVE' | 'COMPLETE' | 'CANCELLED';

export interface ParkingSession {
    id?: string;
    plate_number: string;
    status: ParkingSessionStatus;
    created_on?: string;
}


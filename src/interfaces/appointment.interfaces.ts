import { ServiceType } from "./service_type.interface";
import { Business, User } from "./user.interface";

export type AppointmentStatusTypes = "PENDING_CONFIRM" | "CONFIRMED" | "CANCELED" | "COMPLETED" ;

export enum AppointmentStatus {
    PENDING_CONFIRM = "PENDING_CONFIRM",
    CONFIRMED       = "CONFIRMED",
    CANCELED       = "CANCELED",
    COMPLETED       = "COMPLETED"
}

export interface Appointment {
    business     : Business;
    user         : User;
    service_type : ServiceType;
    observations : string;
    date         : Date;
    endDate      : Date;
    status       : AppointmentStatusTypes | AppointmentStatus;
    createdAt    : Date;
    updatedAt    : Date;
    uid          : string;
}


export interface StoreAppointment {
    business     : string
    service_type : string
    date         : Date
    observations : string
}
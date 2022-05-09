import { ServiceType } from "./service_type.interface";
import { Business, User } from "./user.interface";

export type Appointment_Status = "PENDING_CONFIRM" | "CONFIRMED" | "CANCELLED" | "COMPLETED" ;
export interface Appointment {
    business:     Business;
    user:         User;
    serviceType:  ServiceType;
    observations: string;
    date:         Date;
    endDate:      Date;
    status:       Appointment_Status;
    createdAt:    Date;
    updatedAt:    Date;
    uid:          string;
}

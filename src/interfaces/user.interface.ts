import { Appointment } from "./appointment.interfaces";
import { ServiceType } from "./service_type.interface";

export type roles = "USER_ROLE" | "ADMIN_ROLE" | "BUSINESS_ROLE";

export interface User {
  name          : string;
  phoneNumber   : string;
  email         : string;
  image         : string;
  role          : roles;
  status        : boolean;
  google        : boolean;
  uid           : string;
}

export interface Business {
  name          : string;
  employees     : number;
  image         : string;
  serviceTypes? : ServiceType[];
  user          : User;
  uid           : string;
}

export interface LoginResponse {
  appointments? : Appointment[]
  business?     : Business
  user          : User
  token         : string
}
import { WorkHours } from "./workHours";

export interface Doctor {
    key?: string;
    firstname: string;
    lastname: string;
    telephoneNumber: string;
    email: string;
    specialization: string;
    officeAddress: string;
    workHours: WorkHours;
}
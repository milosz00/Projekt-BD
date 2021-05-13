export interface Patient {
    key?: string;
    firstname: string;
    lastname: string;
    pesel: string;
    telephoneNumber: string;
    email: string;
    uid?: string;
    active: boolean;
    role: string;
}
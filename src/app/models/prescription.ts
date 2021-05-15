export class Prescription {
    key?: string;
    pesel: string;
    doctor: string;
    medicines: any;
    validity: string;
    date: string;

    constructor(pesel,doctor,medicines,validity)
    {
        this.pesel = pesel;
        this.doctor = doctor;
        this.medicines = medicines;
        this.validity = validity;
        this.date = new Date().toJSON();
    }
}
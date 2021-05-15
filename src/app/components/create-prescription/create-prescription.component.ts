import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import {Prescription} from 'src/app/models/prescription';

@Component({
  selector: 'app-create-prescription',
  templateUrl: './create-prescription.component.html',
  styleUrls: ['./create-prescription.component.css']
})
export class CreatePrescriptionComponent implements OnInit {

  prescriptionForm = this.formBuilder.group({
    pesel: '',
    validity: '',
    doctor:''


  });

  medicine="";
  quantity="";
  medicines = []
  constructor(private formBuilder: FormBuilder, private prescriptionsService: PrescriptionsService) { }

  ngOnInit(): void {
  }
  log(x){
    console.log(x)
  }

  onSubmit(){
    if(this.prescriptionForm.value.pesel.length!=11){
      alert("PESEL złej długości");
      return;
    }
    else{
      for(let i = 0; i<this.prescriptionForm.value.pesel.length; i++){
        if(isNaN(parseInt(this.prescriptionForm.value.pesel[i]))){
          alert("Błędny PESEL");
          return;
        }
      }
    }
    let d1 = Date.now();
    let d2 = new Date(this.prescriptionForm.value.validity).getTime();
    console.log(d1)
    console.log(d2)
    if(d1>=d2 || isNaN(d1) || isNaN(d2)){
      alert("Błędne daty");
      return;
    }
    let newPrescription = new Prescription(this.prescriptionForm.value.pesel, this.prescriptionForm.value.doctor,
      this.medicines, this.prescriptionForm.value.validity);
    this.prescriptionsService.createPrescription(newPrescription);
    alert("Pomyślnie wystawiono nową receptę!");
    this.prescriptionForm.reset();
  }

  addMedicine(){
    if(this.medicine=="" || this.quantity=="" ||  isNaN(parseFloat(this.quantity)) || parseFloat(this.quantity)<=0.0){
      alert("Nieporawne dodawanie leku do recepty");
      return;
    }
    else{
      this.medicines.push({"medicine":this.medicine, "quantity":this.quantity});
      this.medicine = "";
      this.quantity = "";
    }
  }
}
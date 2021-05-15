import { Component, OnInit } from '@angular/core';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';


@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  constructor(private prescriptionsService: PrescriptionsService) { 

  }
  prescriptions: any;
  ngOnInit(): void {
    this.prescriptionsService.getPrescriptions().subscribe(data => 
      {
        this.prescriptions = data;
      });
  
  }

}
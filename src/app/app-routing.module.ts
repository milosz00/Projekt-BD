import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PatientsComponent } from "./components/patients/patients.component";
import { VisitsComponent } from "./components/visits/visits.component";
import { WorkHoursComponent } from "./components/work-hours/work-hours.component";


const routes: Routes = [
    {path: "home", component: HomeComponent },
    {path: "", redirectTo: "/home", pathMatch: 'full'},
    {path: "visits", component: VisitsComponent},
    {path: "workHours", component: WorkHoursComponent},
    {path: "patients", component: PatientsComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}
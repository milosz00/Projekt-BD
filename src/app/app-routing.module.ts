import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
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
    {path: "admin-panel", component: AdminComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}
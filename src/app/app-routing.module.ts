import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountActiveComponent } from "./components/account-active/account-active.component";
import { AdminComponent } from "./components/admin/admin.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PatientsComponent } from "./components/patients/patients.component";
import { RegisterComponent } from "./components/register/register.component";
import { VisitsComponent } from "./components/visits/visits.component";
import { WorkHoursComponent } from "./components/work-hours/work-hours.component";


const routes: Routes = [
    {path: "home", component: HomeComponent },
    {path: "", redirectTo: "/sign-in", pathMatch: 'full'},
    {path: "visits", component: VisitsComponent},
    {path: "workHours", component: WorkHoursComponent},
    {path: "patients", component: PatientsComponent},
    {path: "admin-panel", component: AdminComponent},
    {path: "sign-in", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "active-account", component: AccountActiveComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}
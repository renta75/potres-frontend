import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { UserTableComponent } from './custom/view/usertable.component';
import { UserEditComponent } from './custom/view/useredit.component';
import { AuthGuardService as AuthGuard } from './custom/service/authguardservice';
import { UserRestrictedEditComponent } from './custom/view/user-restricted.edit.component';
import { HelpCategoryTableComponent } from './custom/view/helpCategory/helpCategory.table.component'
import { HelpCategoryEditComponent } from './custom/view/helpCategory/helpCategory.edit.component'
import { PropertyTableComponent } from './custom/view/property/property.table.component'
import { PropertyEditComponent } from './custom/view/property/property.edit.component'
import { HelpTableComponent } from './custom/view/help/help.table.component'
import { HelpEditComponent } from './custom/view/help/help.edit.component'
import { NeedTableComponent } from './custom/view/need/need.table.component'
import { NeedEditComponent } from './custom/view/need/need.edit.component'
import { NeedFieldsTableComponent } from './custom/view/needFields/needFields.table.component'
import { NeedFieldsEditComponent } from './custom/view/needFields/needFields.edit.component'
import { HelpFieldsTableComponent } from './custom/view/helpFields/helpFields.table.component'
import { HelpFieldsEditComponent } from './custom/view/helpFields/helpFields.edit.component'
import { PropertyTypeTableComponent } from './custom/view/propertyType/propertyType.table.component'
import { PropertyTypeEditComponent } from './custom/view/propertyType/propertyType.edit.component'
import { StatusTableComponent } from './custom/view/status/status.table.component'
import { StatusEditComponent } from './custom/view/status/status.edit.component'
import { MapComponent } from './custom/view/map/map.component';


export const routes: Routes = [
    { path: '', component: AppMainComponent,
        children: [
            { path: '', component: MapComponent , canActivate: [AuthGuard]},
            
            { path: 'HelpCategory', component: HelpCategoryTableComponent, canActivate: [AuthGuard] },
            { path: 'HelpCategory/:id', component: HelpCategoryEditComponent, canActivate: [AuthGuard] },
            
            { path: 'Help', component: HelpTableComponent, canActivate: [AuthGuard] },
            { path: 'Help/:id', component: HelpEditComponent, canActivate: [AuthGuard] },
            
            { path: 'Need', component: NeedTableComponent, canActivate: [AuthGuard] },
            { path: 'Need/:id', component: NeedEditComponent, canActivate: [AuthGuard] },
            
            { path: 'user', component: UserTableComponent, canActivate: [AuthGuard] },
            { path: 'user/:id', component: UserEditComponent , canActivate: [AuthGuard]},

            { path: 'Map', component: MapComponent , canActivate: [AuthGuard]},
            
            {
                path: 'usersrestricted/:id',
                component: UserRestrictedEditComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'accessdenied', component: AppAccessdeniedComponent},
    {path: '404', component: AppNotfoundComponent},
    {path: 'login', component: AppLoginComponent},
    {path: '**', redirectTo: '/404'},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});

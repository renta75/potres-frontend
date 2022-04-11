import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { UserTableComponent } from './custom/view/usertable.component';
import { UserEditComponent } from './custom/view/useredit.component';

import { BreadcrumbService } from './breadcrumb.service';
import { MessageService } from 'primeng/api';

import { AuthGuardService } from './custom/service/authguardservice';
import { UserService } from './custom/service/user.service';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MyHttpInterceptor } from './http.interceptor';

import { SecuredImageComponent } from './custom/domain/secured-image.component';
import { AppConfigComponent } from './app.config.component';
import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';
import { DynamicPipe } from './custom/pipes/dynamic.pipe';
import { UserRestrictedEditComponent } from './custom/view/user-restricted.edit.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { PasswordCheckService} from './custom/service/password-check.service';

import { HelpCategoryService } from './custom/service/helpCategory.service'
import { PropertyService } from './custom/service/property.service'
import { HelpService } from './custom/service/help.service'
import { NeedService } from './custom/service/need.service'
import { NeedFieldsService } from './custom/service/needFields.service'
import { HelpFieldsService } from './custom/service/helpFields.service'
import { PropertyTypeService } from './custom/service/propertyType.service'
import { StatusService } from './custom/service/status.service'

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



// the second parameter 'fr-FR' is optional
registerLocaleData(localeHr, 'hr-HR');

export function tokenGetter() {
    return localStorage.getItem('jwt');
}

export const customCurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: ' kn',
    thousands: '.',
    nullable: false,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
    imports: [
        ProgressSpinnerModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        CalendarModule,
        JwtModule.forRoot({
            config: {
                // tslint:disable-next-line
                tokenGetter: tokenGetter,
                whitelistedDomains: [
                    'matrica.hr:4400'
                ],
                blacklistedRoutes: [
                    'matrica.hr:4400/api/auth/create_token'
                ]
            }
        })
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppBreadcrumbComponent,
        AppConfigComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        UserTableComponent,
        UserEditComponent,
        SecuredImageComponent,
        UserRestrictedEditComponent,
        DynamicPipe,
        HelpCategoryTableComponent,
        HelpCategoryEditComponent,
        PropertyTableComponent,
        PropertyEditComponent,
        HelpTableComponent,
        HelpEditComponent,
        NeedTableComponent,
        NeedEditComponent,
        NeedFieldsTableComponent,
        NeedFieldsEditComponent,
        HelpFieldsTableComponent,
        HelpFieldsEditComponent,
        PropertyTypeTableComponent,
        PropertyTypeEditComponent,
        StatusTableComponent,
        StatusEditComponent,
        MapComponent
        
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        BreadcrumbService,
        MessageService,
        AuthGuardService,
        UserService,
        PasswordCheckService,
         HelpCategoryService,PropertyService,HelpService,NeedService,NeedFieldsService,HelpFieldsService,PropertyTypeService,StatusService,

        { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

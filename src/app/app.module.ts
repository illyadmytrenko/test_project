import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { GraphComponent } from 'src/components/graph/graph.component';
import { UserPageComponent } from 'src/components/userPage/userPage.component';
import { AdminPageComponent } from 'src/components/adminPage/adminPage.component';
import { TableComponent } from 'src/components/table/table.component';

const routes: Routes = [
  { path: 'userPage', component: UserPageComponent },
  { path: 'adminPage', component: AdminPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphComponent,
    UserPageComponent,
    AdminPageComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

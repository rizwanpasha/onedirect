import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { NoResultComponent } from './no-result/no-result.component';
import { ResultsComponent } from './results/results.component';


import { DataService } from './services/data.service';
import { FooterComponent } from './footer/footer.component';

let routes: Routes = [
  { path: '', component: ResultsComponent, pathMatch: 'full' },
  { path: 'home', component: ResultsComponent },
  { path: 'lettermark', redirectTo: '/home' },
  { path: '**', component: NoResultComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent,
    NoResultComponent,
    ResultsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

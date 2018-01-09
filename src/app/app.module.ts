import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { NoResultComponent } from './no-result/no-result.component';
import { ResultsComponent } from './results/results.component';

let routes: Routes = [
  { path: '', component: ResultsComponent, pathMatch: 'full' },
  { path: 'home', component: ResultsComponent },
  { path: 'wordmark', component: ResultsComponent },
  { path: '**', component: NoResultComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent,
    NoResultComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

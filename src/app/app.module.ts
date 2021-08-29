import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GrilleComponent } from './plateau/grille/grille.component';
import { EmplacementComponent } from './plateau/emplacement/emplacement.component';

@NgModule({
  declarations: [
    AppComponent,
    GrilleComponent,
    EmplacementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

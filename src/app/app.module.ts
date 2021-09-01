import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ActionComponent } from './gestion/action/action.component';
import { GestionComponent } from './gestion/gestion.component';
import { PlayerStatistiqueComponent } from './gestion/statistique/player-statistique/player-statistique.component';
import { StatistiqueComponent } from './gestion/statistique/statistique.component';
import { CoupComponent } from './plateau/coup/coup.component';
import { EmplacementComponent } from './plateau/emplacement/emplacement.component';
import { GrilleComponent } from './plateau/grille/grille.component';


@NgModule({
  declarations: [
    AppComponent,
    GrilleComponent,
    EmplacementComponent,
    GestionComponent,
    ActionComponent,
    StatistiqueComponent,
    PlayerStatistiqueComponent,
    CoupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

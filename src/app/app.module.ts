import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GrilleComponent } from './plateau/grille/grille.component';
import { EmplacementComponent } from './plateau/emplacement/emplacement.component';
import { getGrille, Grille } from './plateau/grille-initializer';
import { GestionComponent } from './gestion/gestion.component';
import { ActionComponent } from './gestion/action/action.component';
import { StatistiqueComponent } from './gestion/statistique/statistique.component';
import { PlayerStatistiqueComponent } from './gestion/statistique/player-statistique/player-statistique.component';

@NgModule({
  declarations: [
    AppComponent,
    GrilleComponent,
    EmplacementComponent,
    GestionComponent,
    ActionComponent,
    StatistiqueComponent,
    PlayerStatistiqueComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ useFactory: getGrille, provide: Grille }],
  bootstrap: [AppComponent]
})
export class AppModule { }

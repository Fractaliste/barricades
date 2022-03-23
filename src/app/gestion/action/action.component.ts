import { Component, OnInit } from '@angular/core';
import { JoueurManager } from 'src/app/joueur/joueur-manager';
import { GrilleProvider } from 'src/app/plateau/grille-provider';
import { PartieManager } from '../partie-manager';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  classBtn = "col btn btn-sm btn-info mx-1"

  nbPartie = 10

  constructor(public partieManager: PartieManager, private joueurManager: JoueurManager, private grilleProvider: GrilleProvider) {
  }

  ngOnInit(): void {
  }

  onReset() {
    this.partieManager.reset()
    this.joueurManager.reset()
    this.grilleProvider.reset()
}
  onLoop() {
    this.partieManager.onPause()
  }


}

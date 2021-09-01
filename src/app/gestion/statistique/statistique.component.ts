import { Component, OnInit } from '@angular/core';
import { IJoueur } from 'src/app/joueur/ijoueur';
import { JoueurManager } from 'src/app/joueur/joueur-manager';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  joueurs: IJoueur[] = [];

  constructor(private joueurManager: JoueurManager) {
    joueurManager.joueurSubject.subscribe((joueurs) => this.joueurs = joueurs)
  }

  ngOnInit(): void {
  }

}

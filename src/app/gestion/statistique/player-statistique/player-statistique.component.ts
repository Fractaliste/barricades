import { Component, Input, OnInit } from '@angular/core';
import { IJoueur } from 'src/app/joueur/ijoueur';

@Component({
  selector: 'app-player-statistique',
  templateUrl: './player-statistique.component.html',
  styleUrls: ['./player-statistique.component.css']
})
export class PlayerStatistiqueComponent implements OnInit {

  @Input() player!: IJoueur
  stats: any;

  constructor() { }

  ngOnInit(): void {
    this.stats = this.player.stats
  }

}

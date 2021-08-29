import { Component, Input, OnInit } from '@angular/core';
import { EmplacementType } from 'src/app/emplacement-type';
import { Emplacement } from '../emplacement';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {

  @Input() emplacement!: Emplacement
  emplacementType = EmplacementType

  constructor() { }

  ngOnInit(): void {
  }

}

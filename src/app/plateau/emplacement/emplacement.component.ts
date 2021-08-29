import { Component, OnInit } from '@angular/core';
import { EmplacementType } from 'src/app/emplacement-type';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {

  previous?: EmplacementComponent[]
  next?: EmplacementComponent[]

  constructor() { }

  ngOnInit(): void {
  }

}

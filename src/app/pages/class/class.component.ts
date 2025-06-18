import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-class',
  imports: [
    NavbarComponent,
    FooterComponent,
    NgFor
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {


  classInfo = {
    name: 'July java',
    coach: 'Carter',
    members: ['Alice', 'Bob', 'Charlie', 'David']
  };
}

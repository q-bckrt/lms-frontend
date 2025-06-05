import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-codelabs-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './codelabs-overview.component.html',
  styleUrl: './codelabs-overview.component.css'
})
export class CodelabsOverviewComponent {
  codelabs = [
    { id: 1, name: 'Intro to Loops' },
    { id: 2, name: 'OOP in Java' }
  ];

  constructor(private router: Router) {}

  editCodelab(id: number) {
    this.router.navigate(['/edit-codelab', id]);
  }
}

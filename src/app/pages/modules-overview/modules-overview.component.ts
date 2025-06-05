import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-modules-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './modules-overview.component.html',
  styleUrl: './modules-overview.component.css'
})
export class ModulesOverviewComponent {
  modules = [
    { id: 1, name: 'Java Basics' },
    { id: 2, name: 'Spring Boot' }
  ];

  constructor(private router: Router) {}

  editModule(id: number) {
    this.router.navigate(['/edit-module', id]);
  }
}

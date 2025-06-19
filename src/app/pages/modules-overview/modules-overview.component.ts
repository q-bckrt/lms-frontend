import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import {ModuleService} from '../../services/module.service';


@Component({
  selector: 'app-modules-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './modules-overview.component.html',
  styleUrl: './modules-overview.component.css'
})
export class ModulesOverviewComponent implements OnInit {
  modules: Array<{ id: number; title: string }> = [];

  constructor(private router: Router, private moduleService: ModuleService) { }

  ngOnInit() {
    this.moduleService.getAllModules().subscribe({
      next: (modules) => {
        this.modules = modules;
      },
      error: (err) => {
        console.error('Failed to load modules:', err);
        alert('Failed to load modules. Please try again later.');
      }
    });
  }


  editModule(id: number) {
    this.router.navigate(['/edit-module', id]);
  }
}

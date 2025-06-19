import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CommonModule} from '@angular/common';
import { RoleService } from '../../services/role-service.service';

@Component({
  selector: 'app-overview',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  userRole: 'student' | 'coach' = 'student'; // default
  username = '';

  constructor(public roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.userRole$.subscribe(role => {
      if (role === 'coach' || role === 'student') {
        this.userRole = role;
      }
    });

    const token = sessionStorage.getItem('TOKEN_KEY_NAME');
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        this.username = tokenData.preferred_username;
      } catch (e) {
        console.error('Failed to parse token', e);
      }
    }
  }

  cards = [
    {
      header: 'Java basics',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java advanced',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java basics',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java advanced',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java basics',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java advanced',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java basics',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    },
    {
      header: 'Java advanced',
      codelabs: {
        codelab1: 'codelab1',
        codelab2: 'codelab2',
        codelab3: 'codelab3'
      }
    }
  ];

  students = [
    { name: 'Alice', completedCodelabs: 3, totalCodelabs: 8 },
    { name: 'Bob', completedCodelabs: 5, totalCodelabs: 8 },
    { name: 'Charlie', completedCodelabs: 8, totalCodelabs: 8 }
  ];
}

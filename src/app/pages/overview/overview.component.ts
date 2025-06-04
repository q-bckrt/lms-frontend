import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth-service.service';

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
  username = 'JDoe';

  constructor(private authService: AuthService) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    this.userRole = userData.role
    this.username = userData.username
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

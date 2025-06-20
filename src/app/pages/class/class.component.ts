  import {Component, inject, OnInit} from '@angular/core';
  import {NavbarComponent} from '../../components/navbar/navbar.component';
  import {FooterComponent} from '../../components/footer/footer.component';
  import {NgFor} from '@angular/common';
  import {UserService} from '../../services/user-service.service';
  import {userModel} from '../../models/userModel';
  import {classOverviewModel} from '../../models/classOverviewModel';
  import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';

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
  export class ClassComponent implements OnInit{
    userService = inject(UserService);
    keycloakService = inject(KeycloakServiceService)

    classOverviews: classOverviewModel[] = [];
    selectedClassOverview: classOverviewModel | null = null;

    ngOnInit() {
      const userName = this.keycloakService.getTokenUserName()

      this.userService.getClassOverviews(userName).subscribe({
        next: (overviews) => {
          this.classOverviews = overviews;
          console.log("class overview list is set")
        },
        error: (err) => {
          console.error('Failed to fetch class overview list:', err);
        }
      });
    }

    selectClass(classId: number): void {
      this.selectedClassOverview = this.classOverviews.find(c => c.id === classId) ?? null;
    }

  }

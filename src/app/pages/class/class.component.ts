  import {Component, inject, OnInit} from '@angular/core';
  import {NavbarComponent} from '../../components/navbar/navbar.component';
  import {FooterComponent} from '../../components/footer/footer.component';
  import {NgFor, NgIf} from '@angular/common';
  import {UserService} from '../../services/user-service.service';
  import {classOverviewModel} from '../../models/classOverviewModel';
  import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
  import {ActivatedRoute, Router} from '@angular/router';
  import {ButtonComponent} from '../../components/button/button.component';
  import {RoleService} from '../../services/role-service.service';

  @Component({
    selector: 'app-class',
    imports: [
      NavbarComponent,
      FooterComponent,
      NgFor,
      NgIf,
      ButtonComponent
    ],
    templateUrl: './class.component.html',
    styleUrl: './class.component.css'
  })
  export class ClassComponent implements OnInit{
    private router = inject(Router);
    roleService = inject(RoleService);
    userService = inject(UserService);
    keycloakService = inject(KeycloakServiceService);
    private route = inject(ActivatedRoute);

    classId: number = 0;
    classOverviews: classOverviewModel[] = [];
    selectedClassOverview: classOverviewModel | null = null;
    loading: boolean = true;

    ngOnInit() {
      const userName = this.keycloakService.getTokenUserName()
      this.classId = Number(this.route.snapshot.paramMap.get('id')!);

      this.userService.getClassOverviews(userName).subscribe({
        next: (overviews) => {
          this.classOverviews = overviews;
          console.log("class overview list is set")
          this.selectClass(this.classId)
          console.log("class is selected")
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch class overview list:', err);
          this.loading = false;

        }
      });

    }

    //the argument for this function is gonna come from the route
    private selectClass(classId: number): void {
      this.selectedClassOverview = this.classOverviews.find(c => c.id === classId) ?? null;
    }

    goTo(path: string) {
      console.log('Button clicked');
      this.router.navigate([path]);
    }

  }

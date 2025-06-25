import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CommonModule} from '@angular/common';
import { RoleService } from '../../services/role-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
import {UserService} from '../../services/user-service.service';
import {Router} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {ClassService} from '../../services/class-service.service';
import {progressUserListModel} from '../../models/progressUserListModel';
import {overviewProgressCoach} from '../../models/overviewProgressCoach';

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
export class OverviewComponent implements OnInit{
  userRole = '';
  firstName = '';
  username= '';
  codelabsStudent: progressUserListModel | null=null;
  classes: overviewProgressCoach | null=null;

  constructor(
    private keycloakService: KeycloakServiceService,
    private userService: UserService,
    private router: Router,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.initializeUserData();

    this.roleService.userRole$.subscribe(role => {
      this.userRole = role;
    })

    if (this.roleService.isStudent() && this.username){

      this.userService.getProgressCodelabsPerUser(this.username).subscribe({

          next: (progress) => {
            this.codelabsStudent = progress
            console.log("successfully got the codelabs")
          },
          error: (err) => {
            console.error('Failed to load codelabs:', err);
            alert('Failed to load codelabs. Please try again later.');
          }
      }

      )
    }

    if( this.roleService.isCoach()){
      this.userService.getOverviewAllStudentsForCoach(this.username).subscribe({
        next: (classes) => {
          this.classes = classes
          console.log("successfully got the overview for all students of all associated classes")
        },
        error: (err) => {
          console.error('Failed to load overview:', err);
          alert('Failed to load overview. Please try again later.');
        }
      })
    }
  }

  // What is the way of getting the first and last name of the user?
  private initializeUserData() {
    const token = this.keycloakService.getToken();
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        this.firstName = tokenData.given_name || '';
        this.username = tokenData.preferred_username;
        this.roleService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }

}

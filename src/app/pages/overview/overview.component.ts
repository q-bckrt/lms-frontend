import { Component } from '@angular/core';
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
  userRole = '';
  firstName = '';
  username= '';
  codelabsStudent: progressUserListModel | null=null;

  constructor(
    private keycloakService: KeycloakServiceService,
    private userService: UserService,
    private router: Router,
    public roleService: RoleService,
    private courseService: CourseService,
    private classService: ClassService
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
            console.log(this.username)
            console.log("successfully got the codelabs")
            console.log(this.codelabsStudent?.progressPerUserDtoList)
          },
          error: (err) => {
            console.error('Failed to load codelabs:', err);
            alert('Failed to load codelabs. Please try again later.');
          }
      }

      )
    }

    if( this.roleService.isCoach()){
      // get all class for this coach
      // for a specific class get all
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

  students = [
    { name: 'Alice', completedCodelabs: 3, totalCodelabs: 8 },
    { name: 'Bob', completedCodelabs: 5, totalCodelabs: 8 },
    { name: 'Charlie', completedCodelabs: 8, totalCodelabs: 8 }
  ];

}

import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ButtonComponent} from '../../components/button/button.component';
import {Codelab, CodelabService, CodelabComment } from '../../services/codelab.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { formatDistanceToNow } from 'date-fns';
import { FormsModule } from '@angular/forms';
import {RoleService} from '../../services/role-service.service';
import {UserService} from '../../services/user-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';

declare var bootstrap: any;



@Component({
  selector: 'app-codelab',
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './codelab.component.html',
  styleUrl: './codelab.component.css'
})
export class CodelabComponent implements OnInit {
  codelab: Codelab | null = null;
  codelabId: number = 0;
  comments: CodelabComment[] = [];
  error: string | null = null;
  editedCourseTitle: string = '';
  userRole: string = '';
  userName: string = '';
  currentProgress: string = '';

  //for changing the progressLevel the current codelab
  allProgressLevels: string[] = [];
  selectedProgressLevel: string | null = null;

  constructor(private codelabService: CodelabService,
              private route: ActivatedRoute,
              private router: Router,
              private roleService: RoleService,
              private userService: UserService,
              private keycloakService: KeycloakServiceService
  ) {}

  ngOnInit(): void {
    this.codelabService.getAllProgressLevels().subscribe({
      next: (progressLevels) => {
        this.allProgressLevels=progressLevels;
        console.log("list of all progressLevels set - all levels")
      },
      error: (err: any) => {
        console.error("failed to fetch and set list of progressLevels - all levels")
      }
    })

    this.userName = this.keycloakService.getTokenUserName();
    this.roleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = +id;
      this.codelabId = numericId;
      this.loadCodelab(numericId);
      this.loadComments(numericId);
    } else {
      this.error = 'No codelab ID provided';
    }

    this.codelabService.getCurrentProgressLevelForUser(this.codelabId, this.userName).subscribe({
        next: (progressLevel) => {
          this.currentProgress = progressLevel.progressLevel;
          console.log("current progress level set");
        },
        error: (err: any) => {
          console.error("failed to fetch and set current progress level");
          console.log(this.currentProgress);
        }
      }
    )
  }

  private loadCodelab(id: number): void {
    this.codelabService.getCodelab(id).subscribe({
      next: (codelab) => {
        this.codelab = codelab;
        this.editedCourseTitle = codelab.title; // Initialize input
        console.log(this.allProgressLevels)
      },
      error: (err) => {
        console.error('Error loading codelab:', err);
        this.error = 'Failed to load codelab';
      }
    });
  }

  private loadComments(id: number): void {
    this.codelabService.getCodelabComments(id).subscribe({
      next: (comments) => {
        this.comments = comments.sort((a, b) =>
          new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
        );
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  setProgressLevel() {
    if (this.selectedProgressLevel && this.codelab) {
      this.userService.setCurrentProgressLevel(this.userName,this.codelabId,this.selectedProgressLevel).subscribe({
        next: () => {
          console.log(`Progresslevel of codelab with ID ${this.codelab!.id} and title "${this.codelab!.title}" was changed to ${this.selectedProgressLevel}`);
          this.currentProgress = this.selectedProgressLevel!;
          //alert(`Class "${this.selectedClassOverview!.title}" linked to course with ID ${this.selectedCourse!.id}`)
        },
        error: (err) => {
          console.error("Failed to set progress level:", err);
        }
      });
    } else {
      console.error("No progress level selected or codelab is null");
    }
  }

  getRelativeTime(timestamp: string): string {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }

  goToCommentPage() {
    this.router.navigate(['/codelabs', this.codelab?.id, 'comment']);
  }

  handleUpdateCourseTitle(): void {
    if (!this.codelab) return;

    const updatedData = {
      title: this.editedCourseTitle,
      details: this.codelab.details ?? '',
      parentSubmoduleId: this.codelab.parentSubmoduleId
    };

    this.codelabService.updateCodelab(this.codelab.id, updatedData).subscribe({
      next: (updated) => {
        this.codelab = updated;
        // Close the modal using Bootstrap JS
        const modalEl = document.getElementById('editCourseModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      },
      error: (err) => {
        console.error('Failed to update title:', err);
      }
    });
  }
}



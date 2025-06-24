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
  comments: CodelabComment[] = [];
  error: string | null = null;
  editedCourseTitle: string = '';
  userRole: string = '';

  constructor(private codelabService: CodelabService, private route: ActivatedRoute, private router: Router, private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = +id;
      this.loadCodelab(numericId);
      this.loadComments(numericId);
    } else {
      this.error = 'No codelab ID provided';
    }
  }

  private loadCodelab(id: number): void {
    this.codelabService.getCodelab(id).subscribe({
      next: (codelab) => {
        this.codelab = codelab;
        this.editedCourseTitle = codelab.title; // Initialize input
      },
      error: (err) => {
        console.error('Error loading codelab:', err);
        this.error = 'Failed to load codelab';
      }
    });
  }

  private loadComments(id: number): void {
    this.codelabService.getCodelabComments(id).subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
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



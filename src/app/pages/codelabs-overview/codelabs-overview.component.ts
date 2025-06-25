import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {NgFor, NgIf} from '@angular/common';
import {CodelabService} from '../../services/codelab.service';
import {SubmoduleService} from '../../services/submodule.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-codelabs-overview',
  standalone: true,
    imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './codelabs-overview.component.html',
  styleUrl: './codelabs-overview.component.css'
})
export class CodelabsOverviewComponent implements OnInit {
  codelabs: Array<{ id: number; title: string }> = [];
  submoduleId!: number;
  submoduleTitle: string = '';
  newCodelabTitle: string = '';
  newCodelabDescription: string = '';
  editedSubmoduleTitle: string = '';
  loading: boolean = true;

  constructor(
    private router: Router,
    private codelabService: CodelabService,
    private subService: SubmoduleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.submoduleId = Number(this.route.snapshot.params['id']);
    this.subService.getSubmodule(this.submoduleId).subscribe(
      (submodule) => {
        this.submoduleTitle = submodule.title;
        console.log('Submodule Title:', this.submoduleTitle);
      }
    );
    this.codelabService.getAllCodelabs().subscribe((codelabs) => {
      this.codelabs = codelabs.filter(codelab => codelab.parentSubmoduleId === this.submoduleId);
      this.loading = false;
      console.log('Filtered Codelabs for Submodule ID:', this.submoduleId);
      console.log(this.codelabs);
    });
  }

  editCodelab(id: number) {
    this.router.navigate(['/codelabs', id]);
  }

  handleCreateNewCodelab() {
    const newCodelab = {
      id: 0, // ID will be assigned by the backend
      title: this.newCodelabTitle,
      details: this.newCodelabDescription,
      parentSubmoduleId: this.submoduleId
    };

    this.codelabService.createCodelab(newCodelab).subscribe({
      next: (createdCodelab) => {
        console.log('New codelab created:', createdCodelab);
        this.codelabs.push(createdCodelab);
        this.newCodelabTitle = '';
        this.newCodelabDescription = '';
      },
      error: (err) => {
        console.error('Error creating codelab:', err);
      }
    });

    //close modal
    const modalEl = document.getElementById('createCodelabModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();

  }

  handleUpdateSubmoduleTitle() {
    if (!this.editedSubmoduleTitle.trim()) {
      console.error('Submodule title cannot be empty');
      return;
    }

    this.subService.updateSubmoduleTitle(this.submoduleId, { title: this.editedSubmoduleTitle }).subscribe({
      next: (updatedSubmodule) => {
        console.log('Submodule title updated:', updatedSubmodule);
        this.submoduleTitle = updatedSubmodule.title;

        const modalEl = document.getElementById('editSubmoduleModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }
      },
      error: (err) => {
        console.error('Error updating submodule title:', err);
      }
    });
  }

  // What's that ??
  protected readonly webkitURL = webkitURL;
}

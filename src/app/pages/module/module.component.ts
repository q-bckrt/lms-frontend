import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {NgFor, NgIf} from '@angular/common';
import {ModuleService} from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';
import {forkJoin} from 'rxjs';
import {SubmoduleService} from '../../services/submodule.service';
import {FormsModule} from '@angular/forms';
import {RoleService} from '../../services/role-service.service';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-submodules-overview',
  standalone: true,
    imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor, FormsModule, NgIf],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit, AfterViewInit {
  @ViewChild('addExistingSubmoduleModal') modalElement!: ElementRef;

  submodules: Array<{ id: number; title: string }> = [];
  extSubmodules: Array<{ id: number; title: string }> = [];
  moduleId!: number;
  moduleTitle: string = '';
  editedModuleTitle: string = '';
  newSubmoduleTitle: string = '';
  selectedSubmoduleId!: number;
  loading: boolean =true;
  isCoach: boolean = true;
  moduleProgress: number = 0;
  userName: string = '';

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private subService: SubmoduleService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private keycloakService: KeycloakServiceService
  ) { }

  ngOnInit() {
    this.moduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.isCoach = this.roleService.isCoach();
    this.userName = this.keycloakService.getTokenUserName();

    // fetch both the module and the full submodule list in parallel
    forkJoin({
      module: this.moduleService.getOneModule(this.moduleId),
      allSubmodules: this.subService.getAllSubmodules(),
    }).subscribe(({ module, allSubmodules }) => {
      console.log(allSubmodules);
      console.log(module.id);
      console.log('Module ID:', module.id);
      console.log('FIRST submodule object:', allSubmodules[0]);  // <--- THIS
      this.moduleTitle = module.title;
      // filter down to only the modules linked to this module
      this.submodules = allSubmodules.filter((sub: any) =>
        sub.parentModules.includes(module.id)
      );
      this.loading=false;
    });

    this.moduleService.getProgressPercentageModule(this.userName,this.moduleId).subscribe({
      next: progress => {
        this.moduleProgress =progress;
        console.log(`successfully fethced and initialized module progress: ${progress} percent`)
      },
      error: err => console.error('Failed to fetch and initialize module progress')
    })
  }

  ngAfterViewInit() {
    const modal = this.modalElement.nativeElement;
    modal.addEventListener('shown.bs.modal', () => {
      this.onModalOpened();
    });
  }

  onModalOpened(): void {
    console.log('Modal opened!');
    this.subService.getAllSubmodules().subscribe(submodules => {
      console.log(submodules);
      this.extSubmodules = submodules.filter((sub: any) => !this.submodules.some(m => m.id === sub.id));
      console.log("extSubmodules:", this.extSubmodules);
    })
  }

  handleUpdateModuleTitle() {
    this.moduleService.updateModuleTitle(this.moduleId, { title: this.editedModuleTitle }).subscribe(() => {
      this.moduleTitle = this.editedModuleTitle;

      const modalEl = document.getElementById('editModuleModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();

      console.log("Module title updated");
    });
  }

  handleCreateNewSubmodule() {
    this.subService.createSubmodule({title: this.newSubmoduleTitle}).subscribe((response) => {
      console.log('New Submodule created:', response);

      this.moduleService.addSubmoduleToModule(this.moduleId, response.id).subscribe(() => {

        const modalEl = document.getElementById('createSubmoduleModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();

        console.log("New submodule created");
        // refresh the submodule list
        this.subService.getAllSubmodules().subscribe(submodules => {
          this.submodules = submodules.filter((sub: any) =>
            sub.parentModules.includes(this.moduleId)
          );
        });
      });
    });
  }

  handleAddExistingSubmodule() {
    this.moduleService.addSubmoduleToModule(this.moduleId, this.selectedSubmoduleId).subscribe(() => {
      console.log('Submodule added to course');
      // refresh the submodule list
      this.subService.getAllSubmodules().subscribe(submodules => {
        this.submodules = submodules.filter((sub: any) =>
          sub.parentModules.includes(this.moduleId)
        );
      });

      const modalEl = document.getElementById('addExistingSubmoduleModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    })
  }

  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}

import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModuleService} from '../../services/module.service';

@Component({
  selector: 'app-create-module',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css',
  standalone: true
})

// Later will require a dropdown to select the course and add it right after
// the creation of the module
export class CreateModuleComponent {

  constructor(private moduleService: ModuleService) {}

  handleCreateModule() {
    console.log("ENTERING MODULE CREATION COMPONENT");
    const title = (document.getElementById('title') as HTMLInputElement).value.trim();

    if (!title) {
      alert('Please enter a module title');
      return;
    }

    const module = {title};

    this.moduleService.createModule(module).subscribe({
      next: (response) => {
        console.log('Module created successfully:', response);
        alert('Module created successfully');
      },
      error: (err) => {
        console.error('Error creating module:', err);
        alert('Failed to create module. Please try again.');
      }
    });
  }
}

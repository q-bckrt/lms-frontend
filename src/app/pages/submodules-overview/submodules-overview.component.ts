import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import {ModuleService} from '../../services/module.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import {forkJoin} from 'rxjs';
import {SubmoduleService} from '../../services/submodule.service';

@Component({
  selector: 'app-submodules-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './submodules-overview.component.html',
  styleUrl: './submodules-overview.component.css'
})
export class SubmodulesOverviewComponent implements OnInit {
  submodules: Array<{ id: number; title: string }> = [];
  moduleId!: number;
  moduleTitle: string = 'Course Title'; // Placeholder for course title, can be set dynamically

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private subService: SubmoduleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.moduleId = Number(this.route.snapshot.paramMap.get('id'));

    // fetch both the module and the full submodule list in parallel
    forkJoin({
      module: this.moduleService.getOneModule(this.moduleId),
      allSubmodules: this.subService.getAllSubmodules(),
    }).subscribe(({ module, allSubmodules }) => {
      console.log(allSubmodules);
      console.log(module.id);
      this.moduleTitle = module.title;
      // filter down to only the modules linked to this course
      this.submodules = allSubmodules.filter((sub: any) =>
        sub.parentModules.includes(module.id)
      );
    });


  }


  goTo(path: string) {
    console.log('Button clicked');
    this.router.navigate([path]);
  }
}

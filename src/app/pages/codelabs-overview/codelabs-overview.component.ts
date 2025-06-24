import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import {CodelabService} from '../../services/codelab.service';
import {SubmoduleService} from '../../services/submodule.service';


@Component({
  selector: 'app-codelabs-overview',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, FooterComponent, NgFor],
  templateUrl: './codelabs-overview.component.html',
  styleUrl: './codelabs-overview.component.css'
})
export class CodelabsOverviewComponent implements OnInit {
  codelabs: Array<{ id: number; title: string }> = [];
  submoduleId!: number;
  submoduleTitle: string = '';

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
      console.log('Filtered Codelabs for Submodule ID:', this.submoduleId);
      console.log(this.codelabs);
    });
  }

  editCodelab(id: number) {
    this.router.navigate(['/codelabs', id]);
  }

  protected readonly webkitURL = webkitURL;
}

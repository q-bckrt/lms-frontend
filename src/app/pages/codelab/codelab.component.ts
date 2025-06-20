import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ButtonComponent} from '../../components/button/button.component';
import {Codelab, CodelabService, CodelabComment } from '../../services/codelab.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-codelab',
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './codelab.component.html',
  styleUrl: './codelab.component.css'
})

export class CodelabComponent implements OnInit {
  codelab: Codelab | null = null;
  comments: CodelabComment[] = [];
  error: string | null = null;

  constructor(private codelabService: CodelabService, private route: ActivatedRoute) {}

  ngOnInit(): void {
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
      next: (codelab) => this.codelab = codelab,
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
}


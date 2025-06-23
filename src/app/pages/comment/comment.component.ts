import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {KeycloakServiceService} from '../../services/keycloak/keycloak-service.service';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  commentText = '';
  codelabId: string | null = null;
  username = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private keycloakService: KeycloakServiceService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.codelabId = this.route.snapshot.paramMap.get('id');
    const token = this.keycloakService.getToken();
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const username = tokenPayload.preferred_username;

    if (!username) {
      console.error('No username found in token');
      return;
    } else {
      this.username = username;
    }
  }

  submitComment() {
    this.commentService
      .postComment(this.codelabId!, this.username, this.commentText)
      .subscribe({
        next: () => this.router.navigate(['/codelabs', this.codelabId]),
        error: (err) => console.error('Comment submission failed:', err)
      });
  }
}

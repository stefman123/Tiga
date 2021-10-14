import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthHelperService } from 'app/services/authHelper.service';

@Component({
  selector: 'app-auth-nav-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <li class="nav-item" (click)="authHelper.logout({ returnTo: document.location.origin })">
      <a class="nav-link text-dark" [routerLink]="['/']">logout</a>
          </li>

    </ng-container>

    <ng-template #loggedOut>
      <li class="nav-item" (click)="auth.loginWithRedirect()">
      <a class="nav-link text-dark" [routerLink]="['/']">login</a>
          </li>
    </ng-template>
  `,
  styles: [],
})
export class AuthNavButtonComponent {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public authHelper: AuthHelperService) {
  }

  ngOnInit(): void{
  }
}

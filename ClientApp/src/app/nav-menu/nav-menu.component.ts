import { Component } from '@angular/core';
import { AuthHelperService } from 'app/services/authHelper.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
/**
 *
 */
constructor(public authHelper: AuthHelperService) {


}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

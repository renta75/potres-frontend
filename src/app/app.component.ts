import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './custom/view/animations';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        slideInAnimation
        // animation triggers go here
      ]
})
export class AppComponent {
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
      }
}

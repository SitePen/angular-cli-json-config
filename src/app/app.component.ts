import { Component } from '@angular/core';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get enableLogin() {
    return this.env.environment.enableLogin;
  }

  constructor(private env: EnvironmentService) {}
}

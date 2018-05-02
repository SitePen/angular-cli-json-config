import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { EnvironmentService, Environment } from './services/environment.service';

interface MockEnvironmentService {
  environment: Partial<Environment>;
}

@Component({
  template: ''
})
export class MockComponent {
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MockComponent },
  { path: 'login', component: MockComponent }
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let envService: EnvironmentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        MockComponent
      ],
      providers: [
        { provide: EnvironmentService, useValue: { environment: { enableLogin: true } } }
      ]
    }).compileComponents();
  }));

  function initialize(enableLogin = true) {
    envService = TestBed.get(EnvironmentService);
    envService.environment.enableLogin = enableLogin;

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }

  it('should create the app with login enabled', async(() => {
    initialize();
    expect(app).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain('Login');
  }));

  it('should create the app without login enabled', async(() => {
    initialize(false);
    expect(app).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain('Login');
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService, Environment } from '../services/environment.service';

import { EnableLoginGuard } from './enable-login.guard';

interface MockEnvironmentService {
  environment: Partial<Environment>;
}

describe('EnableLoginGuard', () => {
  let guard: EnableLoginGuard;
  let envService: MockEnvironmentService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EnableLoginGuard,
        {
          provide: EnvironmentService,
          useValue: { environment: { enableLogin: true } }
        }
      ]
    });
    guard = TestBed.get(EnableLoginGuard);
    envService = TestBed.get(EnvironmentService);

    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should activate when login enabled', () => {
    expect(guard.canActivate()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not activate when login disabled', () => {
    envService.environment.enableLogin = false;
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should activate children when login enabled', () => {
    expect(guard.canActivateChild()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not activate children when login disabled', () => {
    envService.environment.enableLogin = false;
    expect(guard.canActivateChild()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should load when login enabled', () => {
    expect(guard.canLoad()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not load when login disabled', () => {
    envService.environment.enableLogin = false;
    expect(guard.canLoad()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnvironmentService]
    });

    service = TestBed.get(EnvironmentService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.environment).toBeUndefined();
  });

  it('should load once', () => {
    service.load().then(() => {
      expect(service.environment).toEqual({
        apiBaseUrl: '/base/',
        enableLogin: false
      });
      expect(Object.isFrozen(service.environment)).toBe(true);
    });
    service.load().then(() => {});

    const result = http.expectOne(request => {
      return request.method === 'GET' && request.url === 'config/env.json';
    });
    result.flush({
      apiBaseUrl: '/base/',
      enableLogin: false
    });

    http.verify();
  });
});

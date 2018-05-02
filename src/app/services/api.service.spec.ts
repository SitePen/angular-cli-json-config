import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentService, Environment } from '../services/environment.service';

import { ApiService } from './api.service';

interface MockEnvironmentService {
  environment: Partial<Environment>;
}

describe('ApiService', () => {
  let service: ApiService<{
    'test': {
      get: { foo: string; },
      delete: { bar: number; },
      post: { baz: boolean; },
      put: { spam: string; }
    }
  }>;
  let envService: EnvironmentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: EnvironmentService,
          useValue: { environment: { apiBaseUrl: '/api/' } }
        }
      ]
    });

    service = TestBed.get(ApiService);
    envService = TestBed.get(EnvironmentService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be use the API root with get()', () => {
    service.get('test').subscribe(result => {
      expect(result).toEqual({
        foo: 'bar'
      });
    });

    const result = http.expectOne(request => {
      return request.method === 'GET' && request.url === '/api/test';
    });
    result.flush({ foo: 'bar' });

    http.verify();
  });

  it('should be use the API root with delete()', () => {
    service.delete('test').subscribe(result => {
      expect(result).toEqual({
        bar: 100
      });
    });

    const result = http.expectOne(request => {
      return request.method === 'DELETE' && request.url === '/api/test';
    });
    result.flush({ bar: 100 });

    http.verify();
  });

  it('should be use the API root with post()', () => {
    service.post('test', {}).subscribe(result => {
      expect(result).toEqual({
        baz: true
      });
    });

    const result = http.expectOne(request => {
      return request.method === 'POST' && request.url === '/api/test';
    });
    result.flush({ baz: true });

    http.verify();
  });

  it('should be use the API root with put()', () => {
    service.put('test', {}).subscribe(result => {
      expect(result).toEqual({
        spam: 'ham'
      });
    });

    const result = http.expectOne(request => {
      return request.method === 'PUT' && request.url === '/api/test';
    });
    result.flush({ spam: 'ham' });

    http.verify();
  });
});

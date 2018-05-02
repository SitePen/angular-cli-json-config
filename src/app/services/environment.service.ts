import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

export interface Environment {
  apiBaseUrl: string;
  enableLogin: boolean;
}

@Injectable()
export class EnvironmentService {
  readonly environment: Environment;

  private _promise: Promise<void>;

  constructor(private http: HttpClient) { }

  load(): Promise<void> {
    if (!this._promise) {
      this._promise = this.http
        .get('config/env.json')
        .pipe(
          map((environment: Environment) => {
            Object.freeze(environment);

            Object.defineProperty(this, 'environment', {
              enumerable: true,
              get() {
                return environment;
              }
            });
          })
        )
        .toPromise();
    }

    return this._promise;
  }
}

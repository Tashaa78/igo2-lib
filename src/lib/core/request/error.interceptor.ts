import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,
  HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { finalize } from 'rxjs/operators/finalize';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { MessageService } from '../message';
import { LanguageService } from '../language/shared/language.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private httpError: HttpErrorResponse;

  constructor(private messageService: MessageService,
              private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => this.handleError(error, req)),
      finalize(() => this.handleUncaughtError())
    );
  }

  private handleError(httpError: HttpErrorResponse, req: HttpRequest<any>) {
    const msg = `${req.method} ${req.urlWithParams} ${httpError.status} (${httpError.statusText})`;

    if (httpError instanceof HttpErrorResponse) {
      const errorObj = httpError.error === 'object' ? httpError.error : {};
      errorObj.message = httpError.error.message || httpError.statusText;
      errorObj.caught = false;
      console.error(msg, '\n', errorObj.message, '\n\n', httpError);

      this.httpError = new HttpErrorResponse({
          error: errorObj,
          headers: httpError.headers,
          status: httpError.status,
          statusText: httpError.statusText,
          url: httpError.url
      });
    }

    return new ErrorObservable(this.httpError);
  };

  private handleUncaughtError() {
    if (this.httpError && !this.httpError.error.caught) {
      const translate = this.injector.get(LanguageService).translate;
      const message = translate.instant('igo.errors.uncaught.message');
      const title = translate.instant('igo.errors.uncaught.title');
      this.messageService.error(message, title);
    }
  }
}

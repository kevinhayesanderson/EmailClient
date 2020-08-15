import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        // ? Modify or log the outgoing request or response
        const modifiedReq = req.clone({
            // ? options withCredentials will make and save the cookies from the server,
            // ? so on referesh the request is made with the same cookies instead of cookie being discarded
            withCredentials: true
        });
        return next.handle(modifiedReq);
        // ? Pipe the respose event observable and get the info on events
        // .pipe(
        //     filter(val => val.type === HttpEventType.Sent),
        //     tap(val => {
        //         if (val.type === HttpEventType.Sent) {
        //             console.log('Request was sent to the server');
        //         }
        //         if (val.type === HttpEventType.Response) {
        //             console.log('Response from the API', val);
        //         }
        //     })
        // );
    }

}

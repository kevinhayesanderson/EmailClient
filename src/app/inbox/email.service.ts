import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  cache$ = Array<Observable<Email>>();

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  deleteCache(id: string) {
    delete this.cache$[id];
  }

  getEmail(id: string): Observable<Email> {
    if (!this.cache$[id]) {
      this.cache$[id] = this.http.get<Email>(`${this.rootUrl}/emails/${id}`)
        .pipe(
          shareReplay(CACHE_SIZE)
        );
    }
    return this.cache$[id];
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.rootUrl}/emails`, email);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(private route: ActivatedRoute) {
    this.email = route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit() {
    // ? params is a rxJs behavior subject, will give the latest url in the route, use this way
    // ! Again this method will call service for every click, if the service response is slow , incorrect email will be shown
    // ! we should be able to cancel the prevoius params change service like angular does in order to show the latest clicked mail
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     console.log(email);
    //   });
    // });
    // ? Or use snapshot(it is a route at the time of OnInit)
    // ! But there are drawbacks[ will only see the first snapshot,
    // ! will have to get latest snapshot by setInterval and continously update it, and it will not be responsive]
    // this.route.snapshot;

    // * * switchMap operator solves this https://rxjs-dev.firebaseapp.com/api/operators/switchMap
    // this.route.params
    //   .pipe(
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     }))
    //   .subscribe(email => {
    //     this.email = email;
    //   });

    // ? But on component rendering, email property maybe undefined,
    // ? that's why we use resolver on data fetching in the constructor instead of having an *ngIf check
    // ? so there's no need for these code, if we use resolver, commenting out for future reference
  }
}

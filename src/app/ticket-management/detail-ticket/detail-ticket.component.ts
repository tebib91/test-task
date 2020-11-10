import { BackendService } from './../../core/services/backend.service';
import { Ticket } from './../../core/interfaces/ticket.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  ticket$: Observable<any>;
  isEdit = false;
  public readonly users$: Observable<User[]> = this.backendService.users();
  ticket: Ticket;
  etatValue: boolean;
  userValue: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private backendService: BackendService) { }

  ngOnInit(): void {
    this.ticket$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
       this.backendService.ticket(+params.get('id')))
    );
    this.ticket$.subscribe(value => this.ticket = value);
  }

  cancel(): void {
    this.gotoTickets();
  }
  edit(): void {
    this.isEdit = !this.isEdit;
  }

  save(): void {

    this.backendService.assign(this.ticket.id, this.userValue).subscribe(value => {
    });
    this.backendService.complete(this.ticket.id, this.etatValue).subscribe(value => {
    });

  }
  gotoTickets(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

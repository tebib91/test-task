import { BackendService } from './../core/services/backend.service';
import { Ticket } from './../core/interfaces/ticket.interface';
import { User } from './../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AddTicketComponent } from './add-ticket/add-ticket.component';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();

  constructor(public dialog: MatDialog, private readonly backendService: BackendService) { }

  ngOnInit(): void {
  }


  openTicket(): void {
    const dialogRef = this.dialog.open(AddTicketComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

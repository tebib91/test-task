import { BackendService } from './../core/services/backend.service';
import { Ticket } from './../core/interfaces/ticket.interface';
import { User } from './../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  dataSource: any;
  displayedColumns: string[] = ['position', 'description', 'assigneeId', 'completed'];

  constructor(public dialog: MatDialog, private readonly backendService: BackendService, public router: Router) { }

  ngOnInit(): void {
    this.tickets$.subscribe(value => {
      this.dataSource = value;
      console.log(value);

    });

  }


  openTicket(): void {
    const dialogRef = this.dialog.open(AddTicketComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.length > 0) {
        const body = {
          description: result
        };
        this.backendService.newTicket(body).subscribe(value => {
          console.log(value);

        });
      }
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goDetail(data): void {
    this.router.navigate([data.id]);

  }
}

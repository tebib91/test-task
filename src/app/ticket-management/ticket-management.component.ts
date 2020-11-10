import { BackendService } from './../core/services/backend.service';
import { Ticket } from './../core/interfaces/ticket.interface';
import { User } from './../core/interfaces/user.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();


  displayedColumns: string[] = ['position', 'description', 'assigneeId', 'completed'];
  dataSource = new MatTableDataSource<Ticket[]>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, private readonly backendService: BackendService, public router: Router) {

  }

  ngOnInit(): void {
    this.tickets$.subscribe((value: any) => {
      this.dataSource.data = value;
      this.dataSource.sort = this.sort;
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
        this.backendService.newTicket(body).subscribe((value: any) => {
          this.dataSource = this.backendService.tickets() as any;

        });
      }
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.data);

  }

  goDetail(data): void {
    this.router.navigate([data.id]);

  }
}

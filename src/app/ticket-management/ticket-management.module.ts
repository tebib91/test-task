import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketManagementComponent } from './ticket-management.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [TicketManagementComponent, AddTicketComponent],
  imports: [
    CommonModule,
    TicketManagementRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class TicketManagementModule { }

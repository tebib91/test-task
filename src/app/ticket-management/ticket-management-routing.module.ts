import { DetailTicketComponent } from './detail-ticket/detail-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketManagementComponent } from './ticket-management.component';

const routes: Routes = [{ path: '', component: TicketManagementComponent },
{ path: ':id', component: DetailTicketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagementRoutingModule { }

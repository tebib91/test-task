import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { TicketManagementComponent } from './ticket-management.component';

describe('TicketManagementComponent', () => {
  let component: TicketManagementComponent;
  let fixture: ComponentFixture<TicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketManagementComponent],
      imports: [
        RouterModule.forRoot([]),
        MatDialogModule,
        BrowserAnimationsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // I test the dialog here.
  fit('should open the dialog', () => {
    component.openTicket();
  });
});

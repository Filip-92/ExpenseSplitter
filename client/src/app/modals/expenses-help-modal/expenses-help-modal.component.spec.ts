import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHelpModalComponent } from './expenses-help-modal.component';

describe('ExpensesHelpModalComponent', () => {
  let component: ExpensesHelpModalComponent;
  let fixture: ComponentFixture<ExpensesHelpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHelpModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesHelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

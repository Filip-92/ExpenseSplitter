import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseColumnComponent } from './expense-column.component';

describe('ExpenseColumnComponent', () => {
  let component: ExpenseColumnComponent;
  let fixture: ComponentFixture<ExpenseColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

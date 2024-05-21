import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaricalExpensesComponent } from './summarical-expenses.component';

describe('SummaricalExpensesComponent', () => {
  let component: SummaricalExpensesComponent;
  let fixture: ComponentFixture<SummaricalExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaricalExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaricalExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

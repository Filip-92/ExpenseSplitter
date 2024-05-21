import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpendingsModalComponent } from './edit-spendings-modal.component';

describe('EditSpendingsModalComponent', () => {
  let component: EditSpendingsModalComponent;
  let fixture: ComponentFixture<EditSpendingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpendingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpendingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

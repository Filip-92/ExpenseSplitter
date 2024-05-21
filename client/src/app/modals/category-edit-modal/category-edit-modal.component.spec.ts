import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionEditModalComponent } from './division-edit-modal.component';

describe('DivisionEditModalComponent', () => {
  let component: DivisionEditModalComponent;
  let fixture: ComponentFixture<DivisionEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

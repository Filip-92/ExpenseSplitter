import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTaskCardFormComponent } from './task-card-form.component';

describe('GroupTaskCardFormComponent', () => {
  let component: GroupTaskCardFormComponent;
  let fixture: ComponentFixture<GroupTaskCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTaskCardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTaskCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

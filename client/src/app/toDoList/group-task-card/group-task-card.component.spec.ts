import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTaskCardComponent } from './group-task-card.component';

describe('GroupTaskCardComponent', () => {
  let component: GroupTaskCardComponent;
  let fixture: ComponentFixture<GroupTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTaskCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTasksComponent } from './group-tasks.component';

describe('GroupTasksComponent', () => {
  let component: GroupTasksComponent;
  let fixture: ComponentFixture<GroupTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTasksFilterComponent } from './group-tasks-filter.component';

describe('GroupTasksFilterComponent', () => {
  let component: GroupTasksFilterComponent;
  let fixture: ComponentFixture<GroupTasksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTasksFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

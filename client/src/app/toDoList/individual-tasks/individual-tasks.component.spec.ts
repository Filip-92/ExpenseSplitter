import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTasksComponent } from './individual-tasks.component';

describe('IndividualTasksComponent', () => {
  let component: IndividualTasksComponent;
  let fixture: ComponentFixture<IndividualTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

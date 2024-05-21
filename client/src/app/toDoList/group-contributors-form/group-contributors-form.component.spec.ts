import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupContributorsFormComponent } from './group-contributors-form.component';

describe('GroupContributorsFormComponent', () => {
  let component: GroupContributorsFormComponent;
  let fixture: ComponentFixture<GroupContributorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupContributorsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupContributorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

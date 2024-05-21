import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupContributorCardComponent } from './group-contributor-card.component';

describe('GroupContributorCardComponent', () => {
  let component: GroupContributorCardComponent;
  let fixture: ComponentFixture<GroupContributorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupContributorCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupContributorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

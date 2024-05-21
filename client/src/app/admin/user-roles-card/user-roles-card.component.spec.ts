import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesCardComponent } from './user-roles-card.component';

describe('UserRolesCardComponent', () => {
  let component: UserRolesCardComponent;
  let fixture: ComponentFixture<UserRolesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

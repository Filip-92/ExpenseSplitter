import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorUpdateComponent } from './contributor-update.component';

describe('ContributorUpdateComponent', () => {
  let component: ContributorUpdateComponent;
  let fixture: ComponentFixture<ContributorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

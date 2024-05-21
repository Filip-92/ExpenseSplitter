import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryPhotoComponent } from './add-category-photo.component';

describe('AddCategoryPhotoComponent', () => {
  let component: AddCategoryPhotoComponent;
  let fixture: ComponentFixture<AddCategoryPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

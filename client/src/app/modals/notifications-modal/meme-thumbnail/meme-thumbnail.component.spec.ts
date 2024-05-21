import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeThumbnailComponent } from './meme-thumbnail.component';

describe('MemeThumbnailComponent', () => {
  let component: MemeThumbnailComponent;
  let fixture: ComponentFixture<MemeThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemeThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

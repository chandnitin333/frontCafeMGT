import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCateogryComponent } from './manage-cateogry.component';

describe('ManageCateogryComponent', () => {
  let component: ManageCateogryComponent;
  let fixture: ComponentFixture<ManageCateogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCateogryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

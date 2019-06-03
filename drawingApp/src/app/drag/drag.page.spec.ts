import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragPage } from './drag.page';

describe('DragPage', () => {
  let component: DragPage;
  let fixture: ComponentFixture<DragPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

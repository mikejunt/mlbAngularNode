import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterDisplayComponent } from './roster-display.component';

describe('RosterDisplayComponent', () => {
  let component: RosterDisplayComponent;
  let fixture: ComponentFixture<RosterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

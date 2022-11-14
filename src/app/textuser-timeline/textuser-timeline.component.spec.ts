import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextuserTimelineComponent } from './textuser-timeline.component';

describe('TextuserTimelineComponent', () => {
  let component: TextuserTimelineComponent;
  let fixture: ComponentFixture<TextuserTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextuserTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextuserTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

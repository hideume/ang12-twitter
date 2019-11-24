import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetweetgraphComponent } from './retweetgraph.component';

describe('RetweetgraphComponent', () => {
  let component: RetweetgraphComponent;
  let fixture: ComponentFixture<RetweetgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetweetgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetweetgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

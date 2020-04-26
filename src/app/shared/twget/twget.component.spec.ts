import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwgetComponent } from './twget.component';

describe('TwgetComponent', () => {
  let component: TwgetComponent;
  let fixture: ComponentFixture<TwgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

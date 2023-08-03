import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphChartComponent } from './line-graph-chart.component';

describe('LineGraphChartComponent', () => {
  let component: LineGraphChartComponent;
  let fixture: ComponentFixture<LineGraphChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineGraphChartComponent]
    });
    fixture = TestBed.createComponent(LineGraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

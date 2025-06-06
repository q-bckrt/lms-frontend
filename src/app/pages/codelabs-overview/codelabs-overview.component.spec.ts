import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabsOverviewComponent } from './codelabs-overview.component';

describe('CodelabsOverviewComponent', () => {
  let component: CodelabsOverviewComponent;
  let fixture: ComponentFixture<CodelabsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelabsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

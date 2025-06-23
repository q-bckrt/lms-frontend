import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodulesOverviewComponent } from './submodules-overview.component';

describe('SubmodulesOverviewComponent', () => {
  let component: SubmodulesOverviewComponent;
  let fixture: ComponentFixture<SubmodulesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmodulesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmodulesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

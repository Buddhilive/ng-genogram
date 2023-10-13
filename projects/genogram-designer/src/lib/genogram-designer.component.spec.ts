import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenogramDesignerComponent } from './genogram-designer.component';

describe('GenogramDesignerComponent', () => {
  let component: GenogramDesignerComponent;
  let fixture: ComponentFixture<GenogramDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenogramDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenogramDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

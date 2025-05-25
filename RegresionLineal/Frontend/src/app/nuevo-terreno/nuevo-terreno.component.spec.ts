import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTerrenoComponent } from './nuevo-terreno.component';

describe('NuevoTerrenoComponent', () => {
  let component: NuevoTerrenoComponent;
  let fixture: ComponentFixture<NuevoTerrenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoTerrenoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoTerrenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

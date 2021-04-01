import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalExporterComponent } from './journal-exporter.component';

describe('JournalExporterComponent', () => {
  let component: JournalExporterComponent;
  let fixture: ComponentFixture<JournalExporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalExporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

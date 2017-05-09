import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellComponent } from './table-cell.component';

describe('ListComponent', () => {
  let component: TableCellComponent;
  let fixture: ComponentFixture<TableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ TableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

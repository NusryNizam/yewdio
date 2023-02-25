import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSheetComponent } from './playlist-sheet.component';

describe('PlaylistSheetComponent', () => {
  let component: PlaylistSheetComponent;
  let fixture: ComponentFixture<PlaylistSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

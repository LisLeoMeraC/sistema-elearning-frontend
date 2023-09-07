import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideosComponent } from './youtube-videos.component';

describe('YoutubeVideosComponent', () => {
  let component: YoutubeVideosComponent;
  let fixture: ComponentFixture<YoutubeVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeVideosComponent]
    });
    fixture = TestBed.createComponent(YoutubeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

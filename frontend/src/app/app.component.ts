import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Global Countries';
  toggleControl = new FormControl(false);
  @HostBinding('class') user_theme = 'light-theme';

  constructor(private _overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    if (localStorage.getItem('dark-theme') == 'dark-theme') {
      this.updateTheme(true);
      this.toggleControl.setValue(true);
    }

    this.toggleControl.valueChanges.subscribe(change_theme => this.updateTheme(change_theme));
  }

  updateTheme(change_theme: boolean): void {
    this.user_theme = change_theme ? 'dark-theme' : 'light-theme';

    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses)
      .filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.user_theme);

    localStorage.setItem('dark-theme', this.user_theme);
  }

}

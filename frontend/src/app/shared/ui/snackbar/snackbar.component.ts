import { Component, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SnackBarOptions } from './snackbar-provider';

// ! Reference: https://github.dev/cyclosproject/cyclos4-ui/
@Component({
  selector: 'app-snackbar',
  template: `
  {{ message$ | async }}
  `,
  styleUrls: ['./snackbar.component.scss'],

})
export class SnackbarComponent {
  constructor(
    private _element: ElementRef,
    private notification: NotificationService
  ) {
  }

  message$ = new BehaviorSubject('');
  private timeoutHandle: any;

  ngOnInit() {
    this.notification.snackBarProvider = this;
  }

  get element(): HTMLElement {
    return this._element.nativeElement;
  }

  @HostListener('click') onClick() {
    this.hide();
  }

  show(message: string, options?: SnackBarOptions) {
    const timeout = (options || {}).timeout || 3000;
    const status = (options || {}).status || 'info';
    this.message$.next(message);
    const style = this.element.style;
    switch (status) {
      case 'info':
        style.backgroundColor = 'darkblue';
        break;
      case 'error':
        style.backgroundColor = 'crimson';
        break;
      case 'warn':
        style.backgroundColor = 'goldenrod';
        break;
    }
    style.opacity = '1';
    style.transform = 'translate(-50%, 0)';
    this.timeoutHandle = setTimeout(() => this.hide(), timeout);
  }

  hide() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
    const style = this.element.style;
    style.opacity = '';
    style.transform = '';
  }
}

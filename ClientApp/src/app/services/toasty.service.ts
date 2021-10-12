import { Component, Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastyService {
  private newToastNotification: ToastNotificationInitializer;


  constructor() {


  }

  public error(title:string, message: string) {

    this.newToastNotification = new ToastNotificationInitializer();
    this.newToastNotification.setTitle(title);
    this.newToastNotification.setMessage(message);


    this.newToastNotification.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER
    });


    this.newToastNotification.openToastNotification$();

  }

  public success() {

    this.newToastNotification = new ToastNotificationInitializer();
    this.newToastNotification.setTitle('Success');
    this.newToastNotification.setMessage('Success Message');


    this.newToastNotification.setConfig({
      LayoutType: DialogLayoutDisplay.SUCCESS
    });


    this.newToastNotification.openToastNotification$();

  }
}

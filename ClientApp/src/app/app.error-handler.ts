import { ErrorHandler , Injector, Injectable, NgZone, isDevMode} from "@angular/core";
import { ToastyService } from "./services/toasty.service";
import * as Sentry from '@sentry/browser'
@Injectable()


export class AppErrorHandler implements ErrorHandler {
 private toastyService: ToastyService

  constructor(private ngZone: NgZone, private injector: Injector) {

  }

    handleError(error: any): void {
      this.ngZone.run(()=>{

        this.toastyService = this.injector.get(ToastyService);
        this.toastyService.error('Error','An unexpected error happened.');

      });

      if(!isDevMode())
        Sentry.captureException(error.originalError || error)
        else
        throw error;
    }
}

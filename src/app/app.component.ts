import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'trip';
  tripForm: FormGroup = new FormGroup({
    start_point: new FormControl(''),
    end_point: new FormControl(''),
  });
  tripsArr: any = [];
  showMessage: boolean = false;
  display: { [klass: string]: any } | null | undefined;
  lastTripElement: any;
  addTrip(form: any) {
    console.log(form);

    if (form.start_point === '' || form.end_point === '') {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
      return console.log('Enter the values');
    }

    let obj = {
      origin: {
        name: form.start_point,
        sub: form.start_point.substr(0, 3).toLocaleUpperCase(),
      },
      destination: {
        name: form.end_point,
        sub: form.end_point.substr(0, 3).toLocaleUpperCase(),
      },
      tripType: 'initial',
      line: 'straight',
      marginTop: '0',
    };

    if (this.tripsArr.length > 0) {
      this.lastTripElement = this.tripsArr[this.tripsArr.length - 1];
      if (
        this.lastTripElement.destination.sub.toLocaleLowerCase() ===
        form.start_point.toLocaleLowerCase()
      ) {
        obj.tripType = 'continued';
        obj.line = 'straight';
        if (
          this.lastTripElement.line === 'straight' &&
          this.lastTripElement.tripType === 'notContinued'
        ) {
          obj.tripType = 'continued';
          obj.line = 'curvedDown';
        }
        if (this.lastTripElement.line === 'curvedUp') {
          obj.line = 'straight';
          obj.marginTop = '-68px';
        }
        if (
          this.lastTripElement.line === 'curvedDown' &&
          this.lastTripElement.tripType === 'continued'
        ) {
          obj.line = 'straight';
          obj.marginTop = '12px';
        }
        if (
          this.lastTripElement.line === 'straight' &&
          this.lastTripElement.tripType === 'continued'
        ) {
          obj.tripType = 'continued';
          obj.line = 'straight';
          obj.marginTop = '0';
        }
        this.tripsArr.push(obj);
      } else if (
        this.lastTripElement.origin.sub.toLocaleLowerCase() ===
          form.start_point.toLocaleLowerCase() &&
        this.lastTripElement.destination.sub.toLocaleLowerCase() ===
          form.end_point.toLocaleLowerCase()
      ) {
        obj.tripType = 'sameContinued';
        obj.line = 'straight';
        if (
          this.lastTripElement.line === 'straight' &&
          this.lastTripElement.tripType === 'notContinued'
        ) {
          obj.tripType = 'continued';
          obj.line = 'curvedDown';
          obj.marginTop = '0';
        }
        this.tripsArr.push(obj);
      } else {
        obj.tripType = 'notContinued';
        if (this.lastTripElement.line === 'curvedUp') {
          obj.line = 'straight';
          obj.marginTop = '-68px';
        } else if (
          this.lastTripElement.line === 'straight' &&
          this.lastTripElement.tripType === 'continued'
        ) {
          obj.line = 'curvedUp';
          obj.marginTop = '0';
        } else if (
          this.lastTripElement.line === 'straight' &&
          this.lastTripElement.tripType === 'notContinued'
        ) {
          obj.line = 'straight';
          obj.marginTop = '-68px';
        } else {
          obj.line = 'curvedUp';
        }
        this.tripsArr.push(obj);
      }
    } else {
      this.tripsArr.push(obj);
    }
    // console.log(this.tripsArr, 'tyu');

    // this.tripForm.get('start_point')?.patchValue('');
    // this.tripForm.get('end_point')?.patchValue('');
  }
}

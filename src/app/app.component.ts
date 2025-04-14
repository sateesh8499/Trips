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
  addTrip(form: any) {
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
    };

    if (this.tripsArr.length > 0) {
      const lastTripElement = this.tripsArr[this.tripsArr.length - 1];

      if (
        lastTripElement.destination.sub.toLocaleLowerCase() ===
        form.start_point.toLocaleLowerCase()
      ) {
        obj.tripType = 'continued';
        this.tripsArr.push(obj);
        // console.log('continued');
      } else if (
        lastTripElement.origin.sub.toLocaleLowerCase() ===
          form.start_point.toLocaleLowerCase() &&
        lastTripElement.destination.sub.toLocaleLowerCase() ===
          form.end_point.toLocaleLowerCase()
      ) {
        obj.tripType = 'sameContinued';
        this.tripsArr.push(obj);
      } else {
        obj.tripType = 'notContinued';
        this.tripsArr.push(obj);
        // console.log('notContinued');
      }
    } else {
      this.tripsArr.push(obj);
    }
    this.tripForm.get('start_point')?.patchValue('');
    this.tripForm.get('end_point')?.patchValue('');

    // console.log(this.tripsArr, 'fghyj');
  }
}

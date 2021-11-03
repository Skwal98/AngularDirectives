import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AngularDirectives';
  size = 250;

  constructor() {
    
  }

  changeSize(value){
    this.size = this.size + value;
    this.size = Math.max(Math.min(350, this.size), 150);

    console.log(value);
  }
}

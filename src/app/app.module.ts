import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDirective } from './core/directives/drag.directive';
import { ZoomDirective } from './core/directives/zoom.directive';

@NgModule({
  declarations: [
    AppComponent,
    ZoomDirective,
    DragDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

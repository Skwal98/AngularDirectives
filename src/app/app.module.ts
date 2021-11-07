import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { MyLetComponent } from './components/my-let/my-let.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { DragDirective } from './core/directives/drag.directive';
import { DropDirective } from './core/directives/drop.directive';
import { MyLetDirective } from './core/directives/let.directive';
import { ZoomDirective } from './core/directives/zoom.directive';

@NgModule({
  declarations: [
    AppComponent,
    ZoomDirective,
    DragDirective,
    ZoomComponent,
    DragDropComponent,
    DropDirective,
    MyLetComponent,
    MyLetDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

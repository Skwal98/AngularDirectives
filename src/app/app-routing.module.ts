import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ZoomComponent } from './components/zoom/zoom.component';

const routes: Routes = [
  {
    path: 'zoom',
    component: ZoomComponent,
  },
  {
    path: 'drag',
    component: DragDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

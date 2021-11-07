import { Component, ElementRef } from '@angular/core';
import { Dropped } from '../../models/dropped.model';
import { shuffle } from '../../utils/common.utils';
import { Answer } from './models/answer.model';

@Component({
  selector: 'app-drag',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.sass']
})
export class DragDropComponent {
  answers: Answer[];
  letters: string[];

  constructor() {
    const word = "Phone".toUpperCase();
    this.answers = word.split('').map(x => new Answer(x, false));
    this.letters = shuffle(word.split(''));
  }

  onDropped(dropped: Dropped){
    console.log('dropped from component');
    const answer = dropped.container.value;
    if (answer.letter === dropped.item.value){
      answer.isAnswered = true;
      dropped.item.element.nativeElement.remove();
      dropped.preventDefault();
    } else {
      dropped.item.element.nativeElement.classList.add('fail');
    }
  }
}
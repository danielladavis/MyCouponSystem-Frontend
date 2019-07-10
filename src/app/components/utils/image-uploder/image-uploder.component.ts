import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-uploder',
  templateUrl: './image-uploder.component.html',
  styleUrls: ['./image-uploder.component.css']
})
export class ImageUploderComponent {


  @Output() sendImage = new EventEmitter();
  constructor() { }

  createImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      let selectedImage = new ImageSnippet(event.target.result, file)

      this.sendImage.emit({
        file: selectedImage.file,
        image: selectedImage.src
      });

    })
    reader.readAsDataURL(file);
  }
}



class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
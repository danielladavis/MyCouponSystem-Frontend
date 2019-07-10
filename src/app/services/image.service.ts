import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  url: string = "http://localhost:8080/images";

  constructor(private httpClient: HttpClient) { }

  // Post methods
  uploadImage(image: File) {



const formData = new FormData();
formData.append('image',image);
    return this.httpClient
      .post(`${this.url}`, formData, { observe: 'response' })
  }
}

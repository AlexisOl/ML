import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {
  private readonly URL = environment.URL_ML;
  constructor() { }
}

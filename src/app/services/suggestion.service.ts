import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Suggestion {
  id: number;
  title: string;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor() { }

  getSuggestions(): Observable<Suggestion[]> {
    const suggestions: Suggestion[] = [
      { id: 1, title: 'Sopa de Verduras', ingredients: ['Zanahoria', 'Apio', 'Patata'] },
      // Añade más sugerencias aquí
    ];
    return of(suggestions);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  author: string;
}
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    const recipes: Recipe[] = [
      { id: 1, title: 'Ensalada de Quinoa', ingredients: ['Quinoa', 'Tomate', 'Pepino'], instructions: 'Mezcla todos los ingredientes.', author: 'Chef Juan' },
      // Añade más recetas aquí
    ];
    return of(recipes);
  }
  
    
  
}
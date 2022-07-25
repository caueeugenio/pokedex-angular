import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  constructor(private http: HttpClient) {}

  get apiListAllPokemon(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemon: any) => {
          this.getAllPokemon(resPokemon.url).subscribe(
            res => resPokemon.status = res
          );
        });
      })
    );
  }

  public getAllPokemon(url: string):Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}

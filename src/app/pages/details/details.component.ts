import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
  urlType = 'https://pokeapi.co/api/v2/pokemon-species'
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.pokemon;
  }

  get pokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = this.pokeApiService.getAllPokemon(`${this.urlPokemon}/${id}`);
    const type = this.pokeApiService.getAllPokemon(`${this.urlType}/${id}`);

    return forkJoin([name,type]).subscribe(
      res => console.log(res)
    );

  }
}

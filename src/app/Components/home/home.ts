import { Component, OnInit } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
//  counter:number[]=[1,2,3,4,5,6,66,6,66];
imagePhath:string='https://image.tmdb.org/t/p/w500'
 movieData:Imovie[]=[]
 constructor(private _DataFromAPI:DataFromAPI){}
 ngOnInit(): void {
   this._DataFromAPI.getData().subscribe({
    next:(res)=>{
       console.log(res.results);
       this.movieData=res.results;
      
    },
    error:(err)=>{}
   })
 }
}

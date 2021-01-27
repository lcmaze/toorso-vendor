import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  uid: any;
  userDetails: any;
  cities: any;
  states: any;
  countries: any;
  selectedBranch: any;

  clientId: any;

  filterLink: any;
  changeFilter(link: any){
    this.filterLink = link;
  }

  post(value: any, link: string){
    return this.http.post(environment.apiUrl + link, JSON.stringify(value), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  delete(link: string){
    return this.http.delete(environment.apiUrl + link, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  get(link: string){
    return this.http.get(environment.apiUrl + link);
  }
  private cacheValue: any = [];
  getCache(link: string){
    if(typeof this.cacheValue[link] === 'undefined'){
      this.cacheValue[link] = this.http.get(environment.apiUrl + link)
      .pipe(
        shareReplay(1)
      );
    }
    return this.cacheValue[link];
  }

  async openToast(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

}

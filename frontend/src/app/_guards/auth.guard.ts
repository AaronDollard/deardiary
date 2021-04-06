import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard{
  
    constructor( private router: Router) {}

}
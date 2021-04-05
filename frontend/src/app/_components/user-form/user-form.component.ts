import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/_services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  countryForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    nationality: new FormControl(null, [Validators.required]),
    natLang: new FormControl(null, [Validators.required])
  })

  //Implement the user service
  constructor(private _router:Router, private _userService:UserServiceService) { }

  ngOnInit(): void {
  }

  //Log country function
  logCountry() {
    if (!this.countryForm.valid) {
      console.log('Invalid');
      return;
    }
  
    //Passing the post from the user Service and using the countryform
    this._userService.postCountry(JSON.stringify(this.countryForm.value))
    .subscribe(
    //If it is valid, write to console log the values
    data => { console.log(data), this._router.navigate(['/user']);},
    error => console.log(error)
    )}
}

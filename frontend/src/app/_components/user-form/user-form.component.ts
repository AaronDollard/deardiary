import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { ICountry } from '@app/_models/country';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userId: string='';
  countries: ICountry[];


  countryForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    nationality: new FormControl(null, [Validators.required]),
    natLang: new FormControl(null, [Validators.required])
  })

  //Implement the user service
  constructor(
    private _router:Router, 
    private _userService:UserService
    ) { }

  ngOnInit(): void {
  }

  // getAll(): void {
  //   this._userService.getAllEntries().subscribe((data: any[]) => {
  //     this.countries = data || [];
  //   });
  // }

  // onSubmit(f: NgForm) {
  //   this.userId = this._authService.ObtainID();
  //   this._userService.makeEntry(this.userId, f.value).subscribe((data) => {
  //     this.getAll();
  //     f.resetForm();
  //     this._router.navigate(['user']);
  //   });
  // }

  //Log country function
  // logCountry() {
  //   if (!this.countryForm.valid) {
  //     console.log('Invalid');
  //     return;
  //   }
  
  //   //Passing the post from the user Service and using the countryform
  //   this._userService.postCountry(JSON.stringify(this.countryForm.value))
  //   .subscribe(
  //   //If it is valid, write to console log the values
  //   data => { console.log(data), this._router.navigate(['/user']);},
  //   error => console.log(error)
  //   )}
}

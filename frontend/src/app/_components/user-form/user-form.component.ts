import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { ICountry } from '@app/_models/country';
import { EntryService } from '../../_services/entry.service';

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
    private _userService:UserService,
    private _entryService: EntryService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.userId = this._userService.ObtainID();
    this._entryService.makeCountry(this.userId, f.value).subscribe(() => {
      f.resetForm();
      this._router.navigate(['profile']);
    });
  }
}

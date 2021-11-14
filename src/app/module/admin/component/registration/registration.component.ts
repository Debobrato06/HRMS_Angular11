import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../service/registration/registration.service';
import {ConfirmedValidator} from '../../../../validation/confirmed.validator';
import {Registration} from '../../model/registration';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  message: string;
  registrationForm: FormGroup;
  model: Registration = new Registration();
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initFormValue();
    this.passwordMatch();
  }

  // tslint:disable-next-line:typedef
  initFormValue() {
    this.registrationForm = this.formBuilder.group({
      // id: ['', ''],
      // photo: ['', ''],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      matchPassword: ['', [Validators.required]],
      active: [false],

    });
  }
  //

  // tslint:disable-next-line:typedef
  get f(){
    return this.registrationForm.controls;
  }

  passwordMatch(): any {
    this.registrationForm = this.formBuilder.group({
      photo: ['', ''],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      matchPassword: ['', [Validators.required]],
      active: [false],
    }, {
      validator: ConfirmedValidator('password', 'matchPassword')
    });

  }

  // -----------------------------------------------------------------------------------------------------
  // @ API Calling
  // -----------------------------------------------------------------------------------------------------
// tslint:disable-next-line:typedef
  submit(){
    this.generateModel();
    console.log(this.model);
    this.registrationService.registration(this.model).subscribe(data => {
      console.log(data);
      if (data.status === 'SUCCESS'){
        console.log('Registration success');
        this.errorMessage = 'Registration success';
        this.message = 'Registration success';
        this.router.navigate(['/login']);
      }else {
        console.log('Registration unsuccessfully');
        this.message = 'Registration unsuccessfully';
        this.errorMessage = 'Registration unsuccessfully';
      }
      // this.router.navigate(['/profile']);ngfd
    }, err => {
      console.log('unable to access data');
      this.message = 'unable to access data';
      this.errorMessage = 'unable to access data';
    });
  }

  // // -----------------------------------------------------------------------------------------------------
  // // @ View functionality
  // // -----------------------------------------------------------------------------------------------------
  //
  generateModel(): any {

    this.model.code = this.registrationForm.value.code;
    this.model.name = this.registrationForm.value.name;
    this.model.email = this.registrationForm.value.email;
    this.model.mobileNo = this.registrationForm.value.mobileNo;
    this.model.password = this.registrationForm.value.password;
    this.model.matchPassword = this.registrationForm.value.matchPassword;
    this.model.active = this.registrationForm.value.active;


  }

  clear(): any {
    this.initFormValue();
    this.message = '';
  }


}

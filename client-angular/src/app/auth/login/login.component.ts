import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/auth.service';
import {first} from 'rxjs/operators';
import {Player} from '../../models/player.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error: any;
  submitted = false;
  returnUrl: string;

  loginForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService/*, private toastr: ToastrService*/, private router: Router, private route: ActivatedRoute) { }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.createForm();
  }

  onSubmit() {
    this.authService.onLogin(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });


    /*      (response) => {
            const player = response as Player;

            if (this.authService.currentPlayerValue) {
              console.log('OK LOGIN');
              this.toastr.success(`Bienvenue ${player.name}`, 'Connexion OK');
              this.router.navigate([this.returnUrl]);
            } else {
              this.loginForm.reset({password: ''});
            }
          },
          (error) => {
            console.log('KO LOGIN');
            this.error = error;
          }
        );*/
  }

}

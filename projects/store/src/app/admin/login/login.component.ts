import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConfigService } from '../../shared/configs/global-config.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/dashboard';

  loginForm = this.fb.group({
    email: ['mukesh.nanji@gmail.com', Validators.required],
    device_name: ['web'],
    password: ['Password@123', Validators.required],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalConfig: GlobalConfigService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.globalConfig.dashboardRoute;
  }

  login() {
    const params = this.loginForm.value;
    this.auth.login(params).subscribe((response) => {
      console.log(response);
      this.router.navigate([this.returnUrl]);
    });
  }
}

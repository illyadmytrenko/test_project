import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  api = 'https://user-assessment-api.vercel.app/';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == 'bKfPSC2rQ1Mg') this.router.navigate(['/userPage']);
    else if (localStorage.getItem('token') == 'QWRtaW5Vc2Vy') this.router.navigate(['/adminPage']);
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.api}api/login`, {
        email: email,
        password: password
      });

      localStorage.setItem('token', response.data.token);
      if (response.data.token == 'bKfPSC2rQ1Mg') this.router.navigate(['/userPage']);
      else if (response.data.token == 'QWRtaW5Vc2Vy') this.router.navigate(['/adminPage']);

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
   selector: 'app-table',
   templateUrl: './table.component.html',
   styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
   users: any[] = [];
   api = 'https://user-assessment-api.vercel.app/';

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
      this.loadUsers();
   }

   loadUsers() {
      const token = localStorage.getItem('token');

      if (token) {
         const headers = new HttpHeaders().set('X-Token', token);
         this.http.get<any[]>(`${this.api}api/users`, { headers }).subscribe(
            data => {
               this.users = data;
               console.log(data);
            },
            error => {
               console.error('Failed to load assessments:', error);
            }
         );
      }
   }
}
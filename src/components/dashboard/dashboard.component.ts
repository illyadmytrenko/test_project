import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   assessments: any[] = [];
   api = 'https://user-assessment-api.vercel.app/';

   isGraph = false;

   isUserToken: boolean = false;

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
      this.loadAssessments();
   }

   loadAssessments() {
      const token = localStorage.getItem('token');
      this.isUserToken = localStorage.getItem('token') == 'bKfPSC2rQ1Mg';

      if (token) {
         const headers = new HttpHeaders().set('X-Token', token);
         this.http.get<any[]>(`${this.api}api/userassessments`, { headers }).subscribe(
            data => {
               this.assessments = data;
            },
            error => {
               console.error('Failed to load assessments:', error);
            }
         );
      }
   }

   handleGraph() {
      const graph = document.getElementById('graph');
      console.log(this.isGraph);

      if (graph) {
         if (!this.isGraph) {
            graph.classList.remove('disabled');
            graph.classList.remove('fadeOut');
         }
         else {
            graph.classList.add('fadeOut');
            setTimeout(() => {
               graph.classList.add('disabled');
            }, 1500);
         }
         this.isGraph = !this.isGraph;
      }
   }
}
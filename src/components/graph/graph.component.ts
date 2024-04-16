import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
   selector: 'app-graph',
   templateUrl: './graph.component.html',
   styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
   @Input() assessmentId: number = 0;
   graphData: any;
   chartInstance: any;

   api = 'https://user-assessment-api.vercel.app/';

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
      this.loadGraphData();
   }

   loadGraphData() {
      const token = localStorage.getItem('token');
      if (token) {
         const headers = new HttpHeaders().set('X-Token', token);
         this.http.get<any>(`${this.api}api/userassessments/graph?id=${this.assessmentId}`, { headers }).subscribe(
            data => {
               this.graphData = data;
               this.renderBarChart();
            },
            error => {
               console.error('Failed to load graph data:', error);
            }
         );
      }
   }

   private renderBarChart(): void {
      const labels = Object.keys(this.graphData.data);
      const dataValues = Object.values(this.graphData.data);

      const canvas = document.getElementById('barChart') as HTMLCanvasElement;

      if (canvas) {
         const bar = canvas.getContext('2d');
         if (bar) {
            this.chartInstance = new Chart(bar, {
               type: 'bar',
               data: {
                  labels: labels,
                  datasets: [{
                     label: 'Assessment Data',
                     data: dataValues,
                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
                     borderColor: 'black',
                     borderWidth: 1
                  }]
               },
               options: {
                  responsive: true,
               }
            });
         }
      }
   }
}
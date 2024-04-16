"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GraphComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var auto_1 = require("chart.js/auto");
var GraphComponent = /** @class */ (function () {
    function GraphComponent(http) {
        this.http = http;
        this.assessmentId = 0;
        this.api = 'https://user-assessment-api.vercel.app/';
    }
    GraphComponent.prototype.ngOnInit = function () {
        this.loadGraphData();
    };
    GraphComponent.prototype.loadGraphData = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token) {
            var headers = new http_1.HttpHeaders().set('X-Token', token);
            this.http.get(this.api + "api/userassessments/graph?id=" + this.assessmentId, { headers: headers }).subscribe(function (data) {
                _this.graphData = data;
                _this.renderBarChart();
            }, function (error) {
                console.error('Failed to load graph data:', error);
            });
        }
    };
    GraphComponent.prototype.renderBarChart = function () {
        var labels = Object.keys(this.graphData.data);
        var dataValues = Object.values(this.graphData.data);
        var canvas = document.getElementById('barChart');
        if (canvas) {
            var bar = canvas.getContext('2d');
            if (bar) {
                this.chartInstance = new auto_1["default"](bar, {
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
                        responsive: true
                    }
                });
            }
        }
    };
    __decorate([
        core_1.Input()
    ], GraphComponent.prototype, "assessmentId");
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'app-graph',
            templateUrl: './graph.component.html',
            styleUrls: ['./graph.component.css']
        })
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;

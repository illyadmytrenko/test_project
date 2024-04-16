"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.assessments = [];
        this.api = 'https://user-assessment-api.vercel.app/';
        this.isGraph = false;
        this.isUserToken = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.loadAssessments();
    };
    DashboardComponent.prototype.loadAssessments = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        this.isUserToken = localStorage.getItem('token') == 'bKfPSC2rQ1Mg';
        if (token) {
            var headers = new http_1.HttpHeaders().set('X-Token', token);
            this.http.get(this.api + "api/userassessments", { headers: headers }).subscribe(function (data) {
                _this.assessments = data;
            }, function (error) {
                console.error('Failed to load assessments:', error);
            });
        }
    };
    DashboardComponent.prototype.handleGraph = function () {
        var graph = document.getElementById('graph');
        console.log(this.isGraph);
        if (graph) {
            if (!this.isGraph) {
                graph.classList.remove('disabled');
                graph.classList.remove('fadeOut');
            }
            else {
                graph.classList.add('fadeOut');
                setTimeout(function () {
                    graph.classList.add('disabled');
                }, 1500);
            }
            this.isGraph = !this.isGraph;
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

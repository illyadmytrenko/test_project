"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var TableComponent = /** @class */ (function () {
    function TableComponent(http) {
        this.http = http;
        this.users = [];
        this.api = 'https://user-assessment-api.vercel.app/';
    }
    TableComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    TableComponent.prototype.loadUsers = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token) {
            var headers = new http_1.HttpHeaders().set('X-Token', token);
            this.http.get(this.api + "api/users", { headers: headers }).subscribe(function (data) {
                _this.users = data;
                console.log(data);
            }, function (error) {
                console.error('Failed to load assessments:', error);
            });
        }
    };
    TableComponent = __decorate([
        core_1.Component({
            selector: 'app-table',
            templateUrl: './table.component.html',
            styleUrls: ['./table.component.css']
        })
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;

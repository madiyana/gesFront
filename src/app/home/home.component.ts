import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AuthenticationService } from '../_services/index';
import { CategorieService } from '../_services/categories.service';
import { Categories } from '../_models/categories';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    categ: Categories[] = [];
    constructor(private router: Router,private userService: UserService, private authentService: AuthenticationService) {
     }

    ngOnInit() {
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }else{
            this.router.navigate(['/articles']);
        }
    }
    
}
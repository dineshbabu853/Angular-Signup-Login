// import { Component } from '@angular/core';

// import { User } from '@app/_models';
// import { AccountService } from '@app/_services';

// @Component({ templateUrl: 'home.component.html' })
// export class HomeComponent {
//     user: User;

//     constructor(private accountService: AccountService) {
//         this.user = this.accountService.userValue;
//     }
// }

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';


import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    users = null;
    user: User;


    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
   
    logout() {
        this.accountService.logout();
    }
    
    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
    }
}
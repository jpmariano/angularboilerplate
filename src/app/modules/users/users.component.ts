import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../model/user.model';
import { UserService } from '../../service/user.service';


interface Userz {
  name: string;
  email: string;
	status: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  currentUser: User;
  users: User[];
  hello: string;

  USER_DATA: Userz[]= [
    {name: "John Paul Mariano", email: "jmariano@webupps.com", status: "Active" },
    {name: "Jeff Zeejay Belamide", email: "zeejaybelamide@gmail.com", status: "Active" },
    {name: "Juan dela Cruz", email: "juandela@cruz.com", status: "Active" },
  ]

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
              this.users = users;
              console.log(users);
            });
  }

}

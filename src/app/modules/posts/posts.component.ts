import { Component, OnInit } from '@angular/core';

export interface User {
  name: string,
  email: string,
  status: string
}

const USER_DATA : User[] = [
  {name: "John Paul Mariano", email: "jmariano@webupps.com", status: "Active" },
  {name: "Jeff Zeejay Belamide", email: "zeejaybelamide@gmail.com", status: "Active" },
  {name: "Juan dela Cruz", email: "juandela@cruz.com", status: "Active" },
];

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  $users = "Users";
  displayedColumns:  string[] =  ['name', 'email','status'];
  dataSource = USER_DATA;


  constructor() { }

  ngOnInit(): void {
  }

}

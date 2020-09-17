import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  titles = ['Users', 'Permissions', 'Roles'];
  title = this.titles[0];

  constructor() {}

  ngOnInit() {}

  onName(id: number) {
    return (this.title = this.titles[id]);
  }
}

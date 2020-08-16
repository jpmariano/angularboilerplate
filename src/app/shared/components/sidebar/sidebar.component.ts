import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  onToggle = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.onToggle = !this.onToggle;
  }
}

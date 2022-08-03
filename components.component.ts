import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ComponentsComponent implements OnInit {

  collapedSideBar: boolean;
  error;
  mensaje;

  constructor() { }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}

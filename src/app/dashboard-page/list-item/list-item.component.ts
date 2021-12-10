import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() listId: number;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { CreateChildService } from '../create-child.service'

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
  styleUrls: ['./create-child.component.css']
})
export class CreateChildComponent implements OnInit {

  childData : any = {}
  
  constructor(private _create_child: CreateChildService) { }

  ngOnInit(): void {
  }

  createChild() {
    this._create_child.createChild(this.childData)
  }

}

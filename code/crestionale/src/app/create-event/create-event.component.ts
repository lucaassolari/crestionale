import { Component, OnInit } from '@angular/core';
import { CreateEventService } from '../create-event.service'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventData : any = {}
  
  constructor(private _create_event: CreateEventService) { 
    this.eventData.event_hour = ""
  }

  ngOnInit(): void {
    
  }

  createEvent() {
    this._create_event.createEvent(this.eventData)
  }

}
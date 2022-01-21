import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() inputEvents = []
  
  //Mail da passare al componente che deve fare l'appello
  @Input() userEmail : string
  
  orderedEvents : Object[] = []

  nextEvent
  futureEvents = []

  // bool che indicano se non ho più eventi da far apparire nel calendario
  noNextEvent : boolean = false
  noFutureEvents : boolean = false

  // Numberi che indicano se è già stato fatto l'appello relativo
  // 0: appello non fatto, 1: appello da fare, 2: appello fatto
  morningDone : number
  lunchDone : number
  afternoonDone : number

  rollCallToggle : boolean = false
  rollCallType : number 

  constructor() { }

  ngOnInit(): void {
    this.getRollCallStatus()
    this.orderedEvents = this.orderEvents()
    this.getNextEvent()
    this.getFutureEvents()
  }
         
  getRollCallStatus() {
    this.morningDone = parseInt(localStorage.getItem('morningDone')) || 0
    this.lunchDone = parseInt(localStorage.getItem('lunchDone')) || 0
    this.afternoonDone = parseInt(localStorage.getItem('afternoonDone')) || 0
  }
  
  orderEvents(): Object[] {
    let hour : number = (new Date()).getHours()
    let upcomingEvents = []

    this.checkRollCall(hour)
    
    this.inputEvents.forEach(element => {
      if(element.eventHour > hour)
        upcomingEvents.push(element)
    });

    // Bubblesort
    let _switch : boolean = true

    while(_switch) {
      _switch = false

      for(let i = 0; i <= (upcomingEvents.length - 2); i++) {
        if(upcomingEvents[i].eventHour > upcomingEvents[i + 1].eventHour) {
          let temp = upcomingEvents[i]
          upcomingEvents[i] = upcomingEvents[i + 1]
          upcomingEvents[i + 1] = temp
          _switch = true
        }
      }
    }

    return upcomingEvents
  }

  getNextEvent() {

    if(this.orderedEvents.length > 0) 
      this.nextEvent = this.orderedEvents[0]
    else
      this.noNextEvent = true
    
  }

  getFutureEvents() {

    if(this.orderedEvents.length > 1) {
      for(let i = 1; i < this.orderedEvents.length; i++) {
        this.futureEvents.push(this.orderedEvents[i])
      }
    }
    else
      this.noFutureEvents = true
  }

  checkRollCall(hour: number) {

    if(hour >= 9) {
      if(this.morningDone == 0)
        this.morningDone = 1
    }

    if(hour >= 12) {
      if(this.lunchDone == 0)
        this.lunchDone = 1
    }

    if(hour >= 14) {
      if(this.afternoonDone == 0)
        this.afternoonDone = 1
    }
        
  }

  toggleRollCall(rollCallType: number) {
    this.rollCallToggle = !this.rollCallToggle
    this.rollCallType = rollCallType
  }
  
}

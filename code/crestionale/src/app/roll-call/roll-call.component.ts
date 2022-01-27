import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FetchChildrenService } from '../fetch-children.service'


@Component({
  selector: 'app-roll-call',
  templateUrl: './roll-call.component.html',
  styleUrls: ['./roll-call.component.css']
})
export class RollCallComponent implements OnInit {

  @Input() userEmail: string
  @Input() rollCallType: number

  @Input() rollCallToggle: boolean
  @Output() rollCallToggleChange = new EventEmitter<boolean>()

  @Input() morningDone: number
  @Output() morningDoneChange = new EventEmitter<number>()

  @Input() lunchDone: number
  @Output() lunchDoneChange = new EventEmitter<number>()

  @Input() afternoonDone: number
  @Output() afternoonDoneChange = new EventEmitter<number>()  

  morning_list = []
  afternoon_list = []
  lunch_list = []

  roll_call_list = []
  roll_call_title : string
  
  constructor(private _fetchChildren: FetchChildrenService) { }

  ngOnInit(): void {
    this.fetchChildren()
    this.showList()
  }

  // Con questo metodo prendo tutta la lista dei bambini associati nel db alla mail dell'animatore
  fetchChildren() {
    this._fetchChildren.fetchChildren(this.userEmail)
      .subscribe(res => {
        console.log(res.result)
        this.makeLists(res.result)
      })
  }

  // Prende la lista principale e divide i bambini nelle 3 liste, più quella di quelli che vanno in mensa
  makeLists(childrenList) {

    childrenList.forEach(element => {
      
      switch(element.presenza) {
        case 0: {
          this.morning_list.push(element)
          break
        }
        case 1: {
          this.afternoon_list.push(element)
          break
        }
        case 2: {
          this.morning_list.push(element)
          this.afternoon_list.push(element)
          break
        }
      }

      if(element.presenza_in_mensa)
        this.lunch_list.push(element)
    })
  }

  showList() {
    switch(this.rollCallType) {
      case(0): {
        this.roll_call_list = this.morning_list
        this.roll_call_title ='Appello mattutino'
        break
      }
      case(1): {
        this.roll_call_list = this.lunch_list
        this.roll_call_title ='Appello mensa'
        break
      }
      case(2): {
        this.roll_call_list = this.afternoon_list
        this.roll_call_title ='Appello pomeridiano'
        break
      }
    }
  }

  toggleRollCall(rollCallType: number) {
    this.rollCallToggle = !this.rollCallToggle
    this.rollCallToggleChange.emit(this.rollCallToggle)

    switch(rollCallType) {
      case(0): {
        this.morningDoneChange.emit(2)
        localStorage.setItem('morningDone', '2')
        break
      }
      case(1): {
        this.lunchDoneChange.emit(2)
        localStorage.setItem('lunchDone', '2')
        break
      }
      case(2): {
        this.afternoonDoneChange.emit(2)
        localStorage.setItem('afternoonDone', '2')
        break
      }
    }


  }


}

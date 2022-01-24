import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { EventListComponent } from './event-list.component'

describe('EventListComponent', () => {
    let component: EventListComponent
    let fixture: ComponentFixture<EventListComponent>
    let de: DebugElement

    const singleEvent = [
        {
            event_name: 'Partita di calcio',
            team1: 'luca.assolari405@gmail.com',
            event_hour: 20
        }
    ]

    const multipleEvents = [
        {
            event_name: 'Partita di calcio',
            team1: 'luca.assolari405@gmail.com',
            event_hour: 20
        },
        {
            event_name: 'Laboratorio di scacchi',
            team1: 'luca.assolari405@gmail.com',
            event_hour: 21
        }
    ]

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [EventListComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EventListComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have next event if there is one', () => {
        component.inputEvents = singleEvent
        component.ngOnInit()
        fixture.detectChanges()
        expect(component.nextEvent).toBeDefined()
    })

    it('should not have future events if there is only one', () => {
        component.inputEvents = singleEvent
        component.ngOnInit()
        fixture.detectChanges()
        expect(component.futureEvents.length).toBe(0)
    })

    it('should have future events if there are more than one', () => {
        component.inputEvents = multipleEvents
        component.ngOnInit()
        fixture.detectChanges()
        expect(component.futureEvents.length).toBeGreaterThan(0)
    })


})
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { NavbarComponent } from './navbar.component'

describe('NavbarComponent', () => {
    let component: NavbarComponent
    // Una fixture è una reference al componente con in più i campi e i metodi
    let fixture: ComponentFixture<NavbarComponent>
    let de: DebugElement

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [NavbarComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have "Entra" button if user is not authenticated', () => {
        expect(de.query(By.css('.button.is-primary')).nativeElement.innerText).toBe('Entra')
    })

    it('should have "Registrati" button if user is not authenticated', () => {
        expect(de.query(By.css('.button.is-info')).nativeElement.innerText).toBe('Registrati')
    })

    it('should have "Esci" button if user is authenticated', () => {
        component.userIsAuthenticated = true
        fixture.detectChanges()
        expect(de.query(By.css('.button.is-danger')).nativeElement.innerText).toBe('Esci')
    })

    it('should have dropdown if "Altro" button is hovered', () => {
        de.query(By.css('#other-button')).triggerEventHandler('mouseover', {})
        fixture.detectChanges()
        const e = de.query(By.css('#other-dropdown')).nativeElement
        expect(getComputedStyle(e).opacity).toEqual('1')
    })
})
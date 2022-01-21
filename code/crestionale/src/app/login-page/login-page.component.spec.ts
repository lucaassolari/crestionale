import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { LoginPageComponent } from './login-page.component'
import { FormsModule } from '@angular/forms'

describe('LoginPageComponent', () => {
    let component: LoginPageComponent
    let fixture: ComponentFixture<LoginPageComponent>
    let de: DebugElement

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
            declarations: [LoginPageComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should not display error message if email is valid', () => {
        let email = de.query(By.css('#email-field'))
        email.nativeElement.value = 'luca.assolari405@gmail.com'
        email.nativeElement.dispatchEvent(new Event('input'))
        de.query(By.css('button')).nativeElement.click()
        fixture.detectChanges()
        expect(de.query(By.css('#invalid-email'))).toBeNull()
    })

    it('should display error message if email is not valid', () => {
        let email = de.query(By.css('#email-field'))
        email.nativeElement.value = 'luca.assolari405@gmail'
        email.nativeElement.dispatchEvent(new Event('input'))
        de.query(By.css('button')).nativeElement.click()
        fixture.detectChanges()
        expect(de.query(By.css('#invalid-email'))).toBeDefined()
    })

    it('should display error message if user does not exist', () => {
        component.userNotExists = true
        fixture.detectChanges()
        expect(de.query(By.css('#user-not-exist'))).toBeDefined()
    })
})
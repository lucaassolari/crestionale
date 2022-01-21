import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { RegistrationPageComponent } from './registration-page.component'
import { FormsModule } from '@angular/forms'

describe('RegistrationPageComponent', () => {
    let component: RegistrationPageComponent
    let fixture: ComponentFixture<RegistrationPageComponent>
    let de: DebugElement

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
            declarations: [RegistrationPageComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationPageComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should not display error message if email is valid', async(() => {
        fixture.whenStable().then(() => {
            let name = de.query(By.css('#name-field'))
                name.nativeElement.value = 'Luca'
                name.nativeElement.dispatchEvent(new Event('input'))
            let surname = de.query(By.css('#surname-field'))
                surname.nativeElement.value = 'Assolari'
                surname.nativeElement.dispatchEvent(new Event('input'))
            let email = de.query(By.css('#email-field'))
                email.nativeElement.value = 'luca.assolari405@gmail.com'
                email.nativeElement.dispatchEvent(new Event('input'))
            let password = de.query(By.css('#password-field'))
                password.nativeElement.value = 'prova'
                password.nativeElement.dispatchEvent(new Event('input'))
            de.query(By.css('#checkbox')).nativeElement.click()
            de.query(By.css('button')).nativeElement.click()
            fixture.detectChanges()
            expect(de.query(By.css('#invalid-email'))).toBeNull()
        }) 
    }))

    it('should display error message if email is not valid', async(() => {
        fixture.whenStable().then(() => {
            let name = de.query(By.css('#name-field'))
                name.nativeElement.value = 'Luca'
                name.nativeElement.dispatchEvent(new Event('input'))
            let surname = de.query(By.css('#surname-field'))
                surname.nativeElement.value = 'Assolari'
                surname.nativeElement.dispatchEvent(new Event('input'))
            let email = de.query(By.css('#email-field'))
                email.nativeElement.value = 'luca.assolari405@gmail'
                email.nativeElement.dispatchEvent(new Event('input'))
            let password = de.query(By.css('#password-field'))
                password.nativeElement.value = 'prova'
                password.nativeElement.dispatchEvent(new Event('input'))
            de.query(By.css('#checkbox')).nativeElement.click()
            de.query(By.css('button')).nativeElement.click()
            fixture.detectChanges()
            expect(de.query(By.css('#invalid-email'))).toBeDefined()
        })  
    }))
})
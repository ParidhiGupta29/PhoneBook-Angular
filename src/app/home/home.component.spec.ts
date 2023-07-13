import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from '../app-routing.module';
import { ContactService } from '../contact.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,  ],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]),Ng2SearchPipeModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient },
      ]
    })
    .compileComponents();    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let mockContactList = [{ firstName: 'Aakash', lastName: 'Choudhury', phone: '9876584431', id: 2 },{ firstName: 'Amit', lastName: 'Roy', phone: '9876543210', id: 1 }, { firstName: 'Arun', lastName: 'Dey', phone: '5748493812', id: 3 }, { firstName: 'Gaurav', lastName: 'Gupta', phone: '7002873284', id: 5 }, { firstName: 'Vikash', lastName: 'Trivedi', phone: '9873625261', id: 4 }]
  let dummmyConatct = { firstName: 'Aakash', lastName: 'Choudhury', phone: '9876584431', id: 2 }
  let newContactList = [{ firstName: 'Amit', lastName: 'Roy', phone: '9876543210', id: 1 }, { firstName: 'Arun', lastName: 'Dey', phone: '5748493812', id: 3 }, { firstName: 'Gaurav', lastName: 'Gupta', phone: '7002873284', id: 5 }, { firstName: 'Vikash', lastName: 'Trivedi', phone: '9873625261', id: 4 }]
  it('ngOnInit', () =>{
    component.ngOnInit();
    expect(component.contactList).toEqual(mockContactList);
  });

  it('ngOnInit', ()=>{
    component.ngOnInit();
    expect(component.contactList.length).toEqual(5)
  })


  it('addContact', fakeAsync(  () =>  {
    const navigateSpy = spyOn(router, 'navigate');
    component.addContact();
    const firstArg = navigateSpy.calls.mostRecent().args[0];
    expect(firstArg[0]).toContain('addContact');
  }));

  it('editContact', fakeAsync(  () =>  {
    const navigateSpy = spyOn(router, 'navigate');
    component.editContact(dummmyConatct);
    const firstArg = navigateSpy.calls.mostRecent().args[0];
    expect(firstArg[0]).toContain('editContact');
  }));

  it('deleteContact', fakeAsync(  () =>  {
    const navigateSpy = spyOn(router, 'navigate');
    component.deleteContact(dummmyConatct);
    expect(component.contactList).toEqual(newContactList);
  }));

  it('have no contacts intially', () =>{
    component.ngOnInit();
    localStorage.setItem("userList", '[]');
    expect(component.contactList).toEqual(mockContactList);
  })

});

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactComponent ],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]),Ng2SearchPipeModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient },
        FormBuilder
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.addContactForm  = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required], 
      phone: [null, Validators.required],
      id: null
  });
  localStorage.setItem("userList", JSON.stringify(mockContactList));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let mockContactList = [{ firstName: 'Aakash', lastName: 'Choudhury', phone: '9876584431', id: 2 },{ firstName: 'Amit', lastName: 'Roy', phone: '9876543210', id: 1 }, { firstName: 'Arun', lastName: 'Dey', phone: '5748493812', id: 3 }, { firstName: 'Gaurav', lastName: 'Gupta', phone: '7002873284', id: 5 }, { firstName: 'Vikash', lastName: 'Trivedi', phone: '9873625261', id: 4 }]
  let dummmyContact = { firstName: 'Akansha', lastName: 'Verma', phone: '8934984334', id: 6 }
  let newContactList = [{ firstName: 'Aakash', lastName: 'Choudhury', phone: '9876584431', id: 2 },{ firstName: 'Amit', lastName: 'Roy', phone: '9876543210', id: 1 }, { firstName: 'Arun', lastName: 'Dey', phone: '5748493812', id: 3 }, { firstName: 'Gaurav', lastName: 'Gupta', phone: '7002873284', id: 5 }, { firstName: 'Vikash', lastName: 'Trivedi', phone: '9873625261', id: 4 },{ firstName: 'Akansha', lastName: 'Verma', phone: '8934984334', id: 6 }]
  let dummmyContactNew = { firstName: null, lastName: 'Choudhury', phone: '9876584431', id: 2 }

  it('onSubmit', fakeAsync(  () =>  {
    component.addContactForm .setValue(dummmyContact);
    let len = JSON.parse(localStorage.getItem("userList")!).length;
    component.onSubmit();    
    expect(len).toEqual(newContactList.length+1);
  }));

  it('onSubmit', fakeAsync(  () =>  {
    component.addContactForm .setValue(dummmyContactNew);
    component.onSubmit();  
    expect(component.onSubmit()).toBe(undefined)
  }));
});

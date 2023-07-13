import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { EditContactComponent } from './edit-contact.component';

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactComponent ],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]),Ng2SearchPipeModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    component.editContactForm = formBuilder.group({
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
  let dummmyContact = { firstName: 'Akansha', lastName: 'Choudhury', phone: '9876584431', id: 2 }
  let newContactList = [{ firstName: 'Akansha', lastName: 'Choudhury', phone: '9876584431', id: 2 },{ firstName: 'Amit', lastName: 'Roy', phone: '9876543210', id: 1 }, { firstName: 'Arun', lastName: 'Dey', phone: '5748493812', id: 3 }, { firstName: 'Gaurav', lastName: 'Gupta', phone: '7002873284', id: 5 }, { firstName: 'Vikash', lastName: 'Trivedi', phone: '9873625261', id: 4 }]
  let dummmyContactNew = { firstName: null, lastName: 'Choudhury', phone: '9876584431', id: 2 }

  it('onSubmit', fakeAsync(  () =>  {
    const navigateSpy = spyOn(router, 'navigate');
    component.editContactForm.setValue(dummmyContact);
    component.onSubmit();  
    expect(localStorage.getItem("userList")).toEqual(JSON.stringify(newContactList));
    const firstArg = navigateSpy.calls.mostRecent().args[0];
    expect(firstArg[0]).toContain('');
  }));

  it('onSubmit', fakeAsync(  () =>  {
    component.editContactForm.setValue(dummmyContactNew);
    component.onSubmit();  
    expect(component.onSubmit()).toBe(undefined)
  }));
});

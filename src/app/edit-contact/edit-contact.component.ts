import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact;
  editContactForm: FormGroup
  submitted: boolean = false
  
  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    let contactId = localStorage.getItem("editContactId") || 0;
    if (!contactId) {
      alert("Invalid action.")
      this.router.navigate(['/'])
      return
    }	
    this.editContactForm = this.formBuilder.group({
      id: [],
      phone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
    //get contact from local storage using contact ID
    const contactList: Contact[] = JSON.parse(localStorage.getItem("userList") || '{}');
    const contactToEdit = contactList.find(contact => contact.id == +contactId);
    this.editContactForm.setValue(contactToEdit!)
  }							

  onSubmit() {
    this.submitted = true
    if (this.editContactForm.invalid) {
      return
    }

    //update contact in local storage userList
    const contactList: Contact[] = JSON.parse(localStorage.getItem("userList") || '{}');
    let foundIndex = contactList.findIndex(contact => contact.id == this.editContactForm.value.id);
    contactList[foundIndex] = this.editContactForm.value;

    localStorage.setItem("userList", JSON.stringify(contactList));
    this.router.navigate(['/'])
  }

}
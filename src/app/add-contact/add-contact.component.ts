import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.addContactForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true
    if (this.addContactForm.invalid) {
      return
    }
    //add contact to local storage userList
    const userList = JSON.parse(localStorage.getItem("userList") || '[]');
    this.addContactForm.value.id = (Math.floor(Math.random() * 100)+5);
    userList.push(this.addContactForm.value);
    localStorage.setItem("userList", JSON.stringify(userList));
  }

}

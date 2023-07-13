import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactList: Contact[] = [];
  
  constructor(private router: Router, private contactService: ContactService) { }
  
  test: string = ''
  
  ngOnInit() {
    this.contactList = JSON.parse(localStorage.getItem("userList") || '[]');
    if(this.contactList.length <= 0) {
      this.contactService.getContacts().subscribe(data => {
        this.contactList = data.sort((a, b) => {
          return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
        })
        localStorage.setItem("userList", JSON.stringify(this.contactList));
      })
    }
  }

  // Add New Contact
  addContact(): void {
    this.router.navigate(['addContact'])
  }

  // Modify Contact
  editContact(contact: Contact): void {
    localStorage.removeItem("editContactId")
    localStorage.setItem("editContactId", contact.id.toString())
    this.router.navigate(['editContact'])
  }

  // Delete Contact
  deleteContact(contact: Contact): void {
    const contacts: Contact[] = JSON.parse(localStorage.getItem("userList") || '[]');
    this.contactList = contacts.filter((item) => item.id !== contact.id);
    localStorage.setItem("userList", JSON.stringify(this.contactList));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  // get all contact
  getContacts() {
    return this.http.get<Contact[]>(this.baseUrl)
  }
}

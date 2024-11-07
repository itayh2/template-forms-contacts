import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { concatWith } from 'rxjs';
import { phoneTypeValues, addressTypesValues } from '../contacts/contact.model';
import { RestrictedWordsValidator } from '../validators/restricted-words-validator.directive';


@Component({
  imports: [CommonModule, FormsModule, RestrictedWordsValidator],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypesValues;

  contact: Contact = {
    id: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
    notes: '',
  };
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;
    this.contactsService.getContact(contactId).subscribe((contact) => {
      if(contact)
      this.contact = contact;
    });
  }

  cancelContact(){
  this.router.navigate([""]);
  }
  saveContact(form: NgForm) {
    console.log(this.contact.dateOfBirth, typeof this.contact.dateOfBirth);
    this.contactsService.saveContact(form.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}

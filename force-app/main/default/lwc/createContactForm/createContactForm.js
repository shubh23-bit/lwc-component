import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class CreateContactForm extends LightningElement {
    @track accountName = '';
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track message;
    @track error;

    handleChange(event) {
        const field = event.target.label;
        if (field === 'Account Name') this.accountName = event.target.value;
        if (field === 'First Name') this.firstName = event.target.value;
        if (field === 'Last Name') this.lastName = event.target.value;
        if (field === 'Email') this.email = event.target.value;
    }

    createContactHandler() {
        this.message = ''; 
        this.error = '';

        createContact({
            accountName: this.accountName,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        })
        .then(result => {
            this.message = result;
        })
        .catch(err => {
            this.error = err.body.message;
        });
    }
}

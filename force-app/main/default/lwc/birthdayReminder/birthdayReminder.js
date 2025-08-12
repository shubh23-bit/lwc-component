import { LightningElement, track, wire } from 'lwc';
import getUpcomingBirthdays from '@salesforce/apex/BirthdayReminderController.getUpcomingBirthdays';


export default class BirthdayReminder extends LightningElement {
    @track contacts = [];
    @track error;

    @wire(getUpcomingBirthdays)
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data.map(c => ({
                ...c,
                daysLeft: this.calculateDaysLeft(c.Birthdate)
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = [];
        }
    }

    calculateDaysLeft(birthdate) {
        if (!birthdate) return null;
        const today = new Date();
        const thisYearBirthday = new Date(today.getFullYear(), new Date(birthdate).getMonth(), new Date(birthdate).getDate());
        
        let diffTime = thisYearBirthday - today;
        if (diffTime < 0) {
            const nextYearBirthday = new Date(today.getFullYear() + 1, new Date(birthdate).getMonth(), new Date(birthdate).getDate());
            diffTime = nextYearBirthday - today;
        }
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

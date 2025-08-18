import { LightningElement, track, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentService.getStudents';
import createStudentApex from '@salesforce/apex/StudentService.createStudent';

export default class StudentManager extends LightningElement {
    @track students;
    name;
    age;
    email;
    course;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Age', fieldName: 'Age__c' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Course', fieldName: 'Course__c' }
    ];

    @wire(getStudents)//whenever we get data from backend salesforce we use @wire decorator
    wiredStudents({ data, error }) {//@wire take 2 argument data and error
        if (data) {
            this.students = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleChange(event) {
        const field = event.target.label.toLowerCase();
        this[field] = event.target.value;
    }

    createStudent() {
        createStudentApex({ name: this.name, age: parseInt(this.age), email: this.email, course: this.course })
            .then(() => {
                return refreshApex(this.students);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

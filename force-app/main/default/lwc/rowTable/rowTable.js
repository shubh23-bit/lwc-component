import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';



export default class rowTable extends LightningElement {
    @track showModal = false;
    @track accountList = [];

    @track data = [
        { id: 1 }, { id: 2 }, { id: 3 },{ id: 4 },{ id: 5 }
    ];

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accountList = data;
        } else if (error) {
            this.accountList = [];
        }
    }

    handleOpen() {
        this.showModal = true;
    }
    handleCloseModal() {
        this.showModal = false;
    }
    handleEdit() {
        alert('Edit clicked!');
    }
}

import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class rowTable extends LightningElement {
    @track showModal = false;
    @track selectedAccount = null;
    @track accountList = [];

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accountList = data;
        } else {
            this.accountList = [];
        }
    }

    handleOpen(event) {
        const recordId = event.target.dataset.id;
        this.selectedAccount = this.accountList.find(acc => acc.Id === recordId);
        this.showModal = true;
    }

    handleCloseModal() {
        this.showModal = false;
        this.selectedAccount = null;
    }

    handleEdit() {
        alert('Edit clicked!');
    }
}

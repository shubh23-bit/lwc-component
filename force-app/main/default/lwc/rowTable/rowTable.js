import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import updateAccount from '@salesforce/apex/AccountController.updateAccount';

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

    handleFieldChange(event) {
        const field = event.target.dataset.field;
        const value = event.target.value;
        this.selectedAccount = { ...this.selectedAccount, [field]: value };
    }

    async handleSaveModal() {
        try {
            const updated = await updateAccount({ acc: this.selectedAccount });
            // Update accountList with new data
            this.accountList = this.accountList.map(acc => acc.Id === updated.Id ? updated : acc);
            this.showModal = false;
            this.selectedAccount = null;
        } catch (error) {
            alert('Error saving account: ' + (error.body && error.body.message ? error.body.message : error.message));
        }
    }
}

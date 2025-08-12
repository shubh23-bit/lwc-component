// import { LightningElement, wire, track } from 'lwc';
// import getAccountList from '@salesforce/apex/AccountController.getAccountList';
// import updateAccount from '@salesforce/apex/AccountController.updateAccount';

// export default class rowTable extends LightningElement {
//     @track showModal = false;
//     @track selectedAccount = null;
//     @track accountList = [];
//     @track isEditMode = false;

//     @wire(getAccountList)
//     wiredAccounts({ data, error }) {
//         if (data) {
//             this.accountList = data;
//         } else {
//             this.accountList = [];
//         }
//     }

//     handleOpen(event) {
//         const recordId = event.target.dataset.id;
//         this.selectedAccount = this.accountList.find(acc => acc.Id === recordId);
//         this.isEditMode = false;
//         this.showModal = true;
//     }
 
//     handleEdit(event) {
//         const recordId = event.target.dataset.id;
//         this.selectedAccount = this.accountList.find(acc => acc.Id === recordId);
//         this.isEditMode = true;
//         this.showModal = true;
//     }

//     handleCloseModal() {
//         this.showModal = false;
//         this.selectedAccount = null;
//         this.isEditMode = false;
//     }

//     handleEditInModal() {
//         this.isEditMode = true;
//     }

//     handleFieldChange(event) {
//         const field = event.target.dataset.field;
//         const value = event.target.value;
//         this.selectedAccount = { ...this.selectedAccount, [field]: value };
//     }

//     async handleSaveModal() {
//         try {
//             const updated = await updateAccount({ acc: this.selectedAccount });
//             // Update accountList with new data
//             this.accountList = this.accountList.map(acc => acc.Id === updated.Id ? updated : acc);
//             this.showModal = false;
//             this.selectedAccount = null;
//             this.isEditMode = false;
//         } catch (error) {
//             alert('Error saving account: ' + (error.body && error.body.message ? error.body.message : error.message));
//         }
//     }

//     handleFieldChange(event) {
//         const field = event.target.dataset.field;
//         const value = event.target.value;
//         this.selectedAccount = { ...this.selectedAccount, [field]: value };
//     }

//     async handleSaveModal() {
//         try {
//             const updated = await updateAccount({ acc: this.selectedAccount });
//             // Update accountList with new data
//             this.accountList = this.accountList.map(acc => acc.Id === updated.Id ? updated : acc);
//             this.showModal = false;
//             this.selectedAccount = null;
//         } catch (error) {
//             alert('Error saving account: ' + (error.body && error.body.message ? error.body.message : error.message));
//         }
//     }
// }
import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import updateAccount from '@salesforce/apex/AccountController.updateAccount';
import { refreshApex } from '@salesforce/apex';

export default class RowTable extends LightningElement {
    @track showModal = false;
    @track selectedAccount = null;
    @track isEditMode = false;
    wiredAccountsResult;

    @wire(getAccountList)
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accountList = result.data;
        } else {
            this.accountList = [];
        }
    }

    handleOpen(event) {
        const recordId = event.target.dataset.id;
        this.selectedAccount = this.accountList.find(acc => acc.Id === recordId);
        this.isEditMode = false;
        this.showModal = true;
    }

    handleEdit(event) {
        const recordId = event.target.dataset.id;
        this.selectedAccount = this.accountList.find(acc => acc.Id === recordId);
        this.isEditMode = true;
        this.showModal = true;
    }

    handleCloseModal() {
        this.showModal = false;
        this.selectedAccount = null;
        this.isEditMode = false;
    }

    handleEditInModal() {
        this.isEditMode = true;
    }

    handleFieldChange(event) {
        const field = event.target.dataset.field;
        const value = event.target.value;
        this.selectedAccount = { ...this.selectedAccount, [field]: value };
    }

    async handleSaveModal() {
        try {
            await updateAccount({ acc: this.selectedAccount });//check selected account data
            await refreshApex(this.wiredAccountsResult); // Refresh list from server
            this.showModal = false;
            this.selectedAccount = null;
            this.isEditMode = false;
        } catch (error) {
            alert('Error saving account: ' + (error.body?.message || error.message));
        }
    }
}

import { LightningElement, track, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class AccountSearchCombobox extends LightningElement {
    @track searchKey = '';
    @track accounts = [];
    @track isDropdownOpen = false;
    @track selectedAccount;
    @track focused = false;
    @track showOnlyFour = false;

    // Wire Apex method for live search
    @wire(searchAccounts, { searchKey: '$searchKey' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else {
            this.accounts = [];
        }
    }

    // For dropdown limit: 4 if via button, all if typing/searching
    get limitedResults() {
        return this.showOnlyFour ? this.accounts.slice(0, 4) : this.accounts;
    }

    // Computed results annotated with selection state and classes for template binding
    get computedResults() {
        const selectedId = this.selectedAccount ? this.selectedAccount.Id : undefined;
        return (this.showOnlyFour ? this.accounts.slice(0, 4) : this.accounts).map((account) => {
            const isSelected = selectedId === account.Id;
            return {
                ...account,
                isSelected,
                itemClass: isSelected ? 'result-item selected' : 'result-item'
            };
        });
    }

    // When input changes (typing)
    handleInputChange(event) {
        this.searchKey = event.target.value;
        this.isDropdownOpen = true;
        this.showOnlyFour = false;
    }

    // When user selects an account from dropdown
    handleSelect(event) {
        const accountId = event.currentTarget.dataset.id;
        const accountName = event.currentTarget.dataset.name;
        this.selectedAccount = { Id: accountId, Name: accountName };
        this.isDropdownOpen = false;
        this.searchKey = accountName;
    }

    // Toggle dropdown on arrow click (limit to 4 shown)
    handleDropdownClick(event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
        this.showOnlyFour = true;
    }

    // Show all/matching on input box click
    handleInputBoxClick(event) {
        this.isDropdownOpen = true;
        this.showOnlyFour = false;
    }

    handleFocus() {
        this.focused = true;
    }

    handleBlur() {
        this.focused = false;
        setTimeout(() => { this.isDropdownOpen = false; }, 150);
    }

    handleHover(event) {
        event.currentTarget.classList.add('hover-red');
    }

    handleMouseOut(event) {
        event.currentTarget.classList.remove('hover-red');
    }

}
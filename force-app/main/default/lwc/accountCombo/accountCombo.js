import { LightningElement, track, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class AccountSearchCombobox extends LightningElement {
    @track searchKey = '';
    @track accounts = [];
    @track isDropdownOpen = false;
    @track selectedAccount;
    @track focused = false;
    @track showOnlyFour = false;
    @track effectiveSearchKey = '';
    @track activeIndex = -1;

    debounceTimeout;

    // Wire Apex method for live search (debounced via effectiveSearchKey)
    @wire(searchAccounts, { searchKey: '$effectiveSearchKey' })
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
        return this.limitedResults.map((account, index) => {
            const isSelected = selectedId === account.Id;
            const isActive = index === this.activeIndex;
            let itemClass = 'result-item';
            if (isSelected) itemClass += ' selected';
            if (isActive) itemClass += ' active';
            return {
                ...account,
                isSelected,
                isActive,
                index,
                itemClass,
                optionId: `account-option-${index}`
            };
        });
    }

    // Empty state for results list
    get isResultsEmpty() {
        return !this.accounts || this.accounts.length === 0;
    }

    // Input class: remove left padding when a value is selected (no search icon)
    get inputClass() {
        return this.selectedAccount ? 'search-input compact-left' : 'search-input';
    }

    // ARIA id for listbox and active option
    get listboxId() {
        return 'account-combo-listbox';
    }

    get activeOptionId() {
        return this.activeIndex >= 0 ? `account-option-${this.activeIndex}` : null;
    }

    // When input changes (typing)
    handleInputChange(event) {
        this.searchKey = event.target.value;
        this.isDropdownOpen = true;
        this.showOnlyFour = false;
        this.activeIndex = -1;

        if (this.selectedAccount && this.searchKey !== this.selectedAccount.Name) {
            this.selectedAccount = undefined;
        }

        window.clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            this.effectiveSearchKey = (this.searchKey || '').trim();
        }, 250);
    }

    // When user selects an account from dropdown
    handleSelect(event) {
        const accountId = event.currentTarget.dataset.id;
        const accountName = event.currentTarget.dataset.name;
        this.selectedAccount = { Id: accountId, Name: accountName };
        this.isDropdownOpen = false;
        this.searchKey = accountName;
        this.effectiveSearchKey = accountName;
        this.activeIndex = -1;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { id: accountId, name: accountName },
            bubbles: true,
            composed: true
        }));
    }

    // Toggle dropdown on arrow click (limit to 4 shown)
    handleDropdownClick(event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
        this.showOnlyFour = true;
        if (this.isDropdownOpen) {
            this.activeIndex = -1;
        }
    }

    // Show all/matching on input box click
    handleInputBoxClick(event) {
        this.isDropdownOpen = true;
        this.showOnlyFour = false;
        this.activeIndex = -1;
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

    // Keyboard navigation and control
    handleKeydown(event) {
        if (!this.isDropdownOpen && (event.key === 'ArrowDown' || event.key === 'Enter')) {
            this.isDropdownOpen = true;
            this.showOnlyFour = false;
        }

        const maxIndex = this.computedResults.length - 1;
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (maxIndex >= 0) {
                    this.activeIndex = Math.min(maxIndex, this.activeIndex + 1);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (maxIndex >= 0) {
                    this.activeIndex = Math.max(0, this.activeIndex - 1);
                }
                break;
            case 'Enter':
                if (this.isDropdownOpen && this.activeIndex >= 0 && this.activeIndex <= maxIndex) {
                    const item = this.computedResults[this.activeIndex];
                    if (item) {
                        this.selectedAccount = { Id: item.Id, Name: item.Name };
                        this.searchKey = item.Name;
                        this.effectiveSearchKey = item.Name;
                        this.isDropdownOpen = false;
                        this.activeIndex = -1;
                        this.dispatchEvent(new CustomEvent('change', {
                            detail: { id: item.Id, name: item.Name },
                            bubbles: true,
                            composed: true
                        }));
                    }
                }
                break;
            case 'Escape':
                this.isDropdownOpen = false;
                this.activeIndex = -1;
                break;
            default:
                break;
        }
    }

}
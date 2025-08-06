import { LightningElement ,track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountSearch extends LightningElement {
    @track searchKey='';
    @track account;
    @track error;

    handleSearchKeyChange(event){
        this.searchKey=event.target.value
        this.fetchAccounts()
    

    }
    fetchAccounts(){
        getAccounts({searchKey:this.searchKey})
        .then(result=>{
            this.accounts=result;
            this.error=undefined;

        })
        .catch(error=>{
            this.error=error.body.message
            this.accounts=undefined
        })
    }


}
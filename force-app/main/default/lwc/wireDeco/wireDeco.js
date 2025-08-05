import { LightningElement,wire ,api} from 'lwc';
import callApex from '@salesforce/apex/WireDecorator.ShowMessage'
//import field refernces in lwc
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import Contact_Name from '@salesforce/schema/Contact.Name';
import Contact_Phone from '@salesforce/schema/Contact.Phone';
import Contact_Department from '@salesforce/schema/Contact.Department'

export default class WireDeco extends LightningElement {
@api message;
@api recordId;//record id is public soo we use @api

    @wire(callApex)
    //we use @wire to retrive the data from saleforce and update the data 
    //reactive databinding [jab backend data change ho to frontend (component) automatically refresh ho jaye]
    //@wire is a way in salesforce to get from backend automatically without call manually ,and create componenet reactive.
    wireData({error,data}){
        if(data){
            this.message=data;

        }else if(error){
            this.message="error no data found"

        }
    }
    @wire(getRecord,{recordId:'$recordId',fields:[Contact_Name,Contact_Phone,Contact_Department]})
    record;//this is identifier

    get name(){
        return this.record.data ? getFieldValue(this.record.data,Contact_Name):" ";
    }
     get phone(){
        return this.record.data ? getFieldValue(this.record.data,Contact_Phone):" ";
    }
     get department(){
        return this.record.data ? getFieldValue(this.record.data,Contact_Department):" ";
    }
}
// //@api — "Public Property / Method"
//  Use kyu karte hain?
// @api ka use kisi child component ke variable ya method ko parent component se access karne ke liye hota hai.

//  Think of it like:
// Parent component bolta hai: “Hey child, mujhe tumhara yeh variable chahiye” ya “tumhara yeh method mujhe chalana hai”
// To child bolega: “Theek hai, le lo — maine uss variable/method pe @api laga diya hai.”
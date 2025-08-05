import { LightningElement,track } from 'lwc';

export default class Calculator extends LightningElement {
    @track firstNumber;
    @track secondNumber;
    @track result;
    
    handleChange(event){
        const field=event.target.name;
        if(field==='fnum'){
            this.firstNumber=event.target.value
        }else if(field==='snum'){
            this.secondNumber=event.target.value
        }
    }
    calculation(event){
        const fnum=parseInt(this.firstNumber);
        const snum=parseInt(this.secondNumber);
        if(event.target.name==='add'){
            this.result=fnum+snum
        }else if(event.target.name==='sub'){
            this.result=fnum-snum
        }else if(event.target.name==='mul'){
            this.result=fnum*snum
        }else if(event.target.name==='div'){
            this.result=fnum/snum
        }
    }

}
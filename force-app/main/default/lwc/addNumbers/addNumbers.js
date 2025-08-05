import { LightningElement, track } from 'lwc';
import add from '@salesforce/apex/Calculator.add';

export default class AddNumbers extends LightningElement {
    a = 0;
    b = 0;
    @track result;

    handleA(event) {
        this.a = parseInt(event.target.value, 10);
    }

    handleB(event) {
        this.b = parseInt(event.target.value, 10);
    }

    calculate() {
        add({ a: this.a, b: this.b })
            .then((res) => {
                this.result = res;
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
}

import { LightningElement } from 'lwc';

export default class GetterDemo extends LightningElement {
    comment="hello every one"//show the comment in ui
    firstName="shubham"
    lastName="bisht"
    
    get showResult(){//using getter we can modify the property 
        //@tract and @api only do assign the property if we want to modify the value before pass the pass value in html using getter 
        return this.comment.toUpperCase();

    }

    get fullName(){//full name is getter method that concatenates firstname and lastname.when first name and last name changes.
    // full name automatically re-evaluate the displayed value in the template

        return `${this.firstName} ${this.lastName}`
    }
}
import { LightningElement, track } from 'lwc';
import getJoke from '@salesforce/apex/JokeService.getJoke';

export default class JokeFetcher extends LightningElement {
    @track joke;
 
    // this will tell you joke is a reactive property
    //means whenever a data change then componenet ui render automatically .

    fetchJoke() {
        getJoke()
            .then(data => {
                let parsed = JSON.parse(data);
                this.joke = parsed;
            })
            .catch(error => {
                console.error('Error fetching joke:', error);
            });
    }
}

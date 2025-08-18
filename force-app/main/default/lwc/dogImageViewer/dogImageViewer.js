import { LightningElement, track } from 'lwc';
import getRandomDogImage from '@salesforce/apex/DogController.getRandomDogImage';

export default class DogImageViewer extends LightningElement {
    @track dogImage;

    fetchDog() {
        getRandomDogImage()
            .then(result => {
                this.dogImage = result;
            })
            .catch(error => {
                console.error('Error fetching dog image:', error);
            });
    }
}

import { LightningElement } from 'lwc';

export default class parentComponent extends LightningElement {
    nameValue;
    handleNameValueChange(event) {
        this.nameValue = event.detail;
    }
}

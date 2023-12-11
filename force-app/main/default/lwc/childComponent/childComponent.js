import { LightningElement, api } from 'lwc';

export default class childComponent extends LightningElement {
    @api namevalue;
    @api inputtype;
    @api inputlabel;
    @api inputname;
    handleNameChange(event) {
        const selectedEvent = new CustomEvent('namevaluechange', {
            detail: event.target.value,
        });
        this.dispatchEvent(selectedEvent);
    }
}

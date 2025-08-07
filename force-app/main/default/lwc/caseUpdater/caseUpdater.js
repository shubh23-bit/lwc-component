import { LightningElement,track } from 'lwc';

export default class CaseUpdater extends LightningElement {
@track caseNumber='';
@track caseRecord;
@track subject='';
@track status='';
@track error;

get statusOptions(){
    return [
        {label:"New",value:"New"},
        {label:"Working",value:"Working"},
        {label:"Closed",value:"closed"}
    ]
}
handleSubjectChange(event){
    this.caseNumber=event.target.value

}
    handleSearch() {
        getCaseByNumber({ caseNumber: this.caseNumber })
            .then(result => {
                if (result) {
                    this.caseRecord=result;
                    this.subject=result.Subject;
                    this.status=result.Status
                    this.error=undefined;

                } else {
                    this.caseRecord = null;
                    this.error = 'Case not found';
                }
            })
            .catch(error => {
                this.error=error.body.message;
                this.caseRecord=null
            });
    }
handleSubjectChange(event){
    this.subject=event.target.value

}
handleStatusChange(event){
    this.status=event.detail.value
}
 handleUpdate() {
        updateCaseSubjectStatus({
            caseId: this.caseRecord.Id,
            subject: this.subject,
            status: this.status
        })
        .then(() => {
            this.error = 'Case updated successfully ';
        })
        .catch(error => {
            this.error = error.body.message;
        });
    }


}
public with sharing class CaseUpdaterController {

    @AuraEnabled(cacheable=true)
    public static Case getCaseByNumber(String caseNumber) {
        List<Case> caseList = [SELECT Id, CaseNumber, Subject, Status FROM Case WHERE CaseNumber = :caseNumber LIMIT 1];
        if (!caseList.isEmpty()) {
            return caseList[0];
        }
        return null;
    }

    @AuraEnabled
    public static void updateCaseSubjectStatus(Id caseId, String subject, String status) {
        Case c = [SELECT Id, Subject, Status FROM Case WHERE Id = :caseId LIMIT 1];
        c.Subject = subject;
        c.Status = status;
        update c;
    }
}

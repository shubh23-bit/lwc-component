public with sharing class StudentService {
    @AuraEnabled(cacheable=true)
    public static List<StudentAPI__c> getStudents() {
        return [SELECT Id, Name, Age__c, Email__c, Course__c FROM StudentAPI__c LIMIT 50];
    }

    @AuraEnabled
    public static void createStudent(String name, Integer age, String email, String course) {
        StudentAPI__c s = new StudentAPI__c(Name=name, Age__c=age, Email__c=email, Course__c=course);
        insert s;
    }
}

@RestResource(urlMapping='/students/*')
global with sharing class StudentAPI {

    // GET - Fetch all students
    @HttpGet
    global static List<StudentAPI__c> getStudents() {
        return [SELECT Id, Name, Age__c, Email__c, Course__c FROM StudentAPI__c LIMIT 50];
    }

    // POST - Create new student
    @HttpPost
    global static String createStudent(String name, Integer age, String email, String course) {
        StudentAPI__c s = new StudentAPI__c(
            Name = name,
            Age__c = age,
            Email__c = email,  
            Course__c = course 
        );
        insert s;
        return 'Student created with Id: ' + s.Id;
    }

    // PUT - Update student
    @HttpPut
    global static String updateStudent(String id, String course) {
        StudentAPI__c s = [SELECT Id, Course__c FROM StudentAPI__c WHERE Id = :id LIMIT 1];
        s.Course__c = course;
        update s;
        return 'Student updated: ' + s.Id;
    }

    // DELETE - Delete student
    @HttpDelete
    global static String deleteStudent() {
    RestRequest req = RestContext.request;
    RestResponse res = RestContext.response;

    // get id from query param
    String studentId = req.requestURI.substringAfterLast('/');
    
    Student__c s = [SELECT Id FROM Student__c WHERE Id = :studentId LIMIT 1];
    delete s;
    return 'Student deleted: ' + s.Id;
}
}

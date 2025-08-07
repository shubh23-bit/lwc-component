public with sharing class ContactController {
    @AuraEnabled
    public static String createContact(String accountName, String firstName, String lastName, String email,String title,String department) {
        Account acc = [SELECT Id FROM Account WHERE Name = :accountName LIMIT 1];

        Contact con = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            title = title,
            department = department,
            AccountId = acc.Id
        );

        insert con;
        return 'Contact created with Id: ' + con.Id;
    }
}

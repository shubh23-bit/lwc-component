public with sharing class ContactController {
    @AuraEnabled
    public static String createContact(String accountName, String firstName, String lastName, String email) {
        Account acc = [SELECT Id FROM Account WHERE Name = :accountName LIMIT 1];

        Contact con = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            AccountId = acc.Id
        );

        insert con;
        return 'Contact created with Id: ' + con.Id;
    }
}

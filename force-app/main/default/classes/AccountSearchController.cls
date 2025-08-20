public with sharing class AccountSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey) {
        return [
            SELECT Id, Name
            FROM Account
            WHERE Name LIKE :('%' + searchKey + '%')
            ORDER BY Name
            LIMIT 10
        ];
    }
}

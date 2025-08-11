// //write a aapex code to get account data using search key
// public with sharing class AccountController{
//      @AuraEnabled(cacheable=true)
//     public static List<Account> getAccounts(String searchKey){
//         if (searchKey == null) {
//             searchKey = '';
//     }
//          System.debug('Search Key: ' + searchKey);
//         String key = '%' + searchKey.toLowerCase() + '%';
//         return[
//         SELECT Id,Name,Industry,Phone
//         FROM Account
//         WHERE Name LIKE :Key 
//         LIMIT 20
//         ];


//     }

// }
public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Industry, Phone, Type FROM Account LIMIT 10];
    }

    @AuraEnabled
    public static Account updateAccount(Account acc) {
        update acc;
        return [SELECT Id, Name, Industry, Phone, Type FROM Account WHERE Id = :acc.Id LIMIT 1];
    }
}

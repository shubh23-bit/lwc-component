public with sharing class BirthdayReminderController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getUpcomingBirthdays() {
        Date today = Date.today();
        Date oneMonthLater = today.addMonths(1);

        Integer currentMonth = today.month();
        Integer currentDay = today.day();
        Integer nextMonth = oneMonthLater.month();
        Integer nextDay = oneMonthLater.day();

        List<Contact> contacts = [
            SELECT Id, FirstName, LastName, Birthdate, Email, Phone, Account.Name
            FROM Contact
            WHERE 
                (
                    (CALENDAR_MONTH(Birthdate) = :currentMonth AND DAY_IN_MONTH(Birthdate) >= :currentDay) 
                    OR 
                    (CALENDAR_MONTH(Birthdate) = :nextMonth AND DAY_IN_MONTH(Birthdate) <= :nextDay)
                )
            ORDER BY Birthdate ASC
        ];

        return contacts;
    }
}

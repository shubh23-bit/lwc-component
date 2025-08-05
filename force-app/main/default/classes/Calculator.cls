public with sharing class Calculator {
    @AuraEnabled(cacheable=false)
    public static Integer add(Integer a, Integer b) {
        return a - b;
    }
}

public with sharing class JokeService {
    @AuraEnabled(cacheable=false)
    public static String getJoke() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://official-joke-api.appspot.com/random_joke');
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            return response.getBody();
        } else {
            throw new AuraHandledException('Failed to fetch joke: ' + response.getStatus());
        }
    }
}

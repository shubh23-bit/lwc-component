public with sharing class DogController {
    @AuraEnabled(cacheable=true)
    public static String getRandomDogImage() {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://dog.ceo/api/breeds/image/random');
            request.setMethod('GET');

            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                // Parse JSON response
                Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                // API returns: { "message": "image_url", "status": "success" }
                return (String) result.get('message');
            } else {
                throw new AuraHandledException('API Error: ' + response.getStatus());
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
}

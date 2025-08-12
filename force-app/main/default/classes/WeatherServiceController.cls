public with sharing class WeatherServiceController {
    @AuraEnabled(cacheable=false)
    public static String getWeather(String cityName) {
        if (String.isBlank(cityName)) {
            cityName = 'Delhi';
        }

        // API URL with your API key (replace with your real API key)
        String apiKey = 'adb7f84db9c331b8e423ec1562974b5f';
        String endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' 
                          + EncodingUtil.urlEncode(cityName, 'UTF-8') 
                          + '&appid=' + apiKey 
                          + '&units=metric';

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setTimeout(60000);

        try {
            HttpResponse res = http.send(req);
            if (res.getStatusCode() == 200) {
                // Return API body directly
                return res.getBody();
            } else {
                // Return error as JSON
                Map<String, Object> errMap = new Map<String, Object>();
                errMap.put('error', 'API returned status: ' + res.getStatusCode());
                errMap.put('body', res.getBody());
                return JSON.serialize(errMap);
            }
        } catch (Exception e) {
            Map<String, Object> errMap = new Map<String, Object>();
            errMap.put('error', e.getMessage());
            return JSON.serialize(errMap);
        }
    }
}

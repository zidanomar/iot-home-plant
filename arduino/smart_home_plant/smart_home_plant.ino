#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <FirebaseJson.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define FIREBASE_HOST "FIREBASE_HOST"
#define FIREBASE_AUTH "FIREBASE_AUTH"
#define WIFI_SSID "WIFI_SSID"
#define WIFI_PASSWORD "WIFI_PASSWORD"
#define DHTPIN 5
#define DHTTYPE    DHT11

DHT dht(DHTPIN, DHTTYPE);
WiFiClient client;

const int moisturePin = A0;             // moisteure sensor pin
const int motorPin = D0;
unsigned long interval = 1000;
unsigned long previousMillis = 0;
unsigned long interval1 = 1000;
unsigned long previousMillis1 = 0;
float moisturePercentage;              //moisture reading
float humidity;                  // humidity reading
float temperature;                  //temperature reading
bool motorState;

void setup() {
  Serial.begin(9600);
  
  delay(100);
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, false); // keep motor off initally
  dht.begin();
  
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() { 
  unsigned long currentMillis = millis(); // grab current time

  humidity = dht.readHumidity();           // read humiduty
  temperature = dht.readTemperature();     // read temperature
  moisturePercentage = ( 100.00 - ( (analogRead(moisturePin) / 1023.00) * 100.00 ) );
  motorState = Firebase.getBool("motorState");
  

  if ((unsigned long)(currentMillis - previousMillis1) >= interval1) {    
    previousMillis1 = millis();
  }
  
  if (moisturePercentage < 25 || motorState) {
    digitalWrite(motorPin, true);        //turn on motor pump
  } else {
    digitalWrite(motorPin, false);
  }

  if ((unsigned long)(currentMillis - previousMillis) >= interval) {
    if (isnan(humidity) || isnan(temperature))
    {
      Serial.println(dht.readHumidity());
      return;
    }
    
    Serial.println("send to db");
    previousMillis = millis();
    sendToDB(moisturePercentage, temperature, humidity);
  }
}

void sendToDB(float moisture, float temp, float humid) {

  Firebase.setFloat("currentValue/moisture", moisture);
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }


  Firebase.setFloat("currentValue/temperature", temp);
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }


  Firebase.setFloat("currentValue/humidity", humid);
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }

  // get value 
  Serial.print("moisture: ");
  Serial.println(Firebase.getFloat("currentValue/moisture"));

  Serial.print("temperature: ");
  Serial.println(Firebase.getFloat("currentValue/temperature"));

  Serial.print("humidity: ");
  Serial.println(Firebase.getFloat("currentValue/humidity"));

  Serial.print("wateringState: ");
  Serial.println(Firebase.getBool("motorState"));
  Serial.println();

  Serial.println("===================================");
}

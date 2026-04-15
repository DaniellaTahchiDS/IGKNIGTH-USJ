// SCIE Smart Bin Arduino Controller
// Components needed:
// - Arduino UNO
// - Servo motor (for bin lid)
// - Ultrasonic sensor (to detect when bin is closed)
// - LED (green for open, red for closed, yellow for processing)
// - Resistors (220 ohm for LEDs)
// - Jumper wires
// - Breadboard

#include <Servo.h>

// Pin assignments
const int SERVO_PIN = 9;         // Ultrasonic sensor echo pin
const int GREEN_LED_PIN = 5;   // Green LED indicates bin open
const int RED_LED_PIN = 6;     // Red LED indicates bin closed
const int YELLOW_LED_PIN = 7;  // Yellow LED indicates processing

// Constants
const int SERVO_CLOSED = 55;    // Servo angle when lid is closed
const int SERVO_OPEN = 115;     // Servo angle when lid is open
const int MAX_DISTANCE = 20;   // Maximum distance to detect object in cm
const long TIMEOUT = 30000;    // Timeout for auto-closing (30 seconds)

// Variables
Servo lidServo;                // Servo object for the lid
bool binOpen = false;          // Current bin state
long lastOpenTime = 0;         // Time when bin was last opened

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(YELLOW_LED_PIN, OUTPUT);
  
  // Initialize servo
  lidServo.attach(SERVO_PIN);
  
  // Initialize bin as closed
  closeBin();
  
  Serial.println("SCIE Smart Bin initialized");
  Serial.println("Waiting for commands...");
}

void loop() {
  // Check for commands from web app
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if (command == "OPEN_BIN") {
      openBin();
      Serial.println("BIN_OPENED");
    } 
    else if (command == "CLOSE_BIN") {
      closeBin();
      Serial.println("BIN_CLOSED");
    }
    else if (command == "STATUS") {
      sendStatus();
    }
  }
  
  // Check if bin is open
  
}

// Open the bin lid
void openBin() {
  lidServo.write(SERVO_OPEN);
  digitalWrite(GREEN_LED_PIN, HIGH);
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(YELLOW_LED_PIN, LOW);
  binOpen = true;
  lastOpenTime = millis();
  Serial.println("Bin opened");
}

// Close the bin lid
void closeBin() {
  digitalWrite(YELLOW_LED_PIN, LOW); 
  digitalWrite(YELLOW_LED_PIN, HIGH);  // Processing indicator
  digitalWrite(GREEN_LED_PIN, LOW);
  delay(5000);
  lidServo.write(SERVO_CLOSED);
  digitalWrite(RED_LED_PIN, HIGH);
  binOpen = false;
  Serial.println("Bin closed");
}

// Send current status to web app
void sendStatus() {
  if (binOpen) {
    Serial.println("STATUS:OPEN");
  }  else {
    Serial.println("STATUS:CLOSED");
  }
}
'use strict';
goog.provide('Blockly.Arduino.智慧盒子');
goog.require('Blockly.Arduino');

/************************蜂鸣器*******************/
Blockly.Arduino.Tone = function() {
  var dropdown_tone = this.getFieldValue('tone');
  Blockly.Arduino.setups_['12'] = 'pinMode(12, OUTPUT);\n';
  var code = 'digitalWrite(12,'+dropdown_tone+');\n';
  return code;
};

Blockly.Arduino.Tone2 = function() {
  var dropdown_tone = this.getFieldValue('tone');
  var value_time = Blockly.Arduino.valueToCode(this, 'time', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_de = this.getFieldValue('de');
  Blockly.Arduino.definitions_['include_'+'Tone'] = '#include <NewTone.h>';
  Blockly.Arduino.setups_['12'] = 'pinMode(12, OUTPUT);\n';
  var code = 'NewTone(12,'+dropdown_tone +','+value_time*dropdown_de +');\n';
  return code;
};

/************************RGB*******************/
Blockly.Arduino.RGB = function() {
  var value_RGB1 = Blockly.Arduino.valueToCode(this, 'RGB1', Blockly.Arduino.ORDER_ATOMIC);
  var value_RGB2 = Blockly.Arduino.valueToCode(this, 'RGB2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'RGB'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['function_'+'display'] = 'Adafruit_NeoPixel rgb_display_A2 = Adafruit_NeoPixel(4,A2,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGB'] = 'rgb_display_A2.begin();';
  var code = 'rgb_display_A2.setPixelColor(('+value_RGB1+')-1, '+value_RGB2+');\n'
             + 'rgb_display_A2.show();\n';
  return code;
};

Blockly.Arduino.RGB2 = function() {
  var value_RGB2 = Blockly.Arduino.valueToCode(this, 'RGB2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'RGB'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['function_'+'display'] = 'Adafruit_NeoPixel rgb_display_A2 = Adafruit_NeoPixel(4,A2,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGB'] = 'rgb_display_A2.begin();';
  var code = 'for (int RGB_all_i = 1; RGB_all_i <= 4; RGB_all_i = RGB_all_i + (1)) {\n'
             + '  rgb_display_A2.setPixelColor((RGB_all_i)-1, '+value_RGB2+');\n'
             + '  rgb_display_A2.show();\n'
             + '}\n';
  return code;
};

/************************数码管*******************/
Blockly.Arduino.TM1637 = function() {
  var dropdown_Display = this.getFieldValue('Display');
  Blockly.Arduino.definitions_['include_'+'TM1637'] = '#include <SevenSegmentTM1637.h>';
  Blockly.Arduino.definitions_['var_declare_'+'display'] = 'SevenSegmentTM1637  display(A0,A1);';
  Blockly.Arduino.setups_['begin'] = 'display.begin();\n';
  var code = 'display.'+dropdown_Display +'();\n';
  return code;
};

Blockly.Arduino.TM1637_2 = function() {
  var value_Display2 = Blockly.Arduino.valueToCode(this, 'Display2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'TM1637'] = '#include <SevenSegmentTM1637.h>';
  Blockly.Arduino.definitions_['var_declare_'+'display'] = 'SevenSegmentTM1637  display(A0,A1);';
  Blockly.Arduino.setups_['begin'] = 'display.begin();\n';
  var code = 'display.print('+value_Display2 +');\n';
  return code;
};

Blockly.Arduino.TM1637_3 = function() {
  var value_Display3 = Blockly.Arduino.valueToCode(this, 'Display3', Blockly.Arduino.ORDER_ATOMIC);
  var value_Display4 = Blockly.Arduino.valueToCode(this, 'Display4', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_Display5 = this.getFieldValue('Display5');
  Blockly.Arduino.definitions_['include_'+'TM1637'] = '#include <SevenSegmentTM1637.h>';
  Blockly.Arduino.definitions_['include_'+'Extended'] = '#include <SevenSegmentExtended.h>';
  Blockly.Arduino.definitions_['var_declare_'+'display2'] = 'SevenSegmentExtended  display(A0,A1);';
  Blockly.Arduino.setups_['begin'] = 'display.begin();\n';
  var code = 'display.printTime('+value_Display3 +','+value_Display4 +','+dropdown_Display5 +');\n';
  return code;
};

Blockly.Arduino.TM1637_4 = function() {
  var value_Display6 = Blockly.Arduino.valueToCode(this, 'Display6', Blockly.Arduino.ORDER_ATOMIC);
  var value_Display7 = Blockly.Arduino.valueToCode(this, 'Display7', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'TM1637'] = '#include <SevenSegmentTM1637.h>';
  Blockly.Arduino.definitions_['include_'+'Extended'] = '#include <SevenSegmentExtended.h>';
  Blockly.Arduino.definitions_['var_declare_'+'display'] = 'SevenSegmentExtended  display(A0,A1);';
  Blockly.Arduino.setups_['begin'] = 'display.begin();\n';
  var code = 'display.printTime('+value_Display6 +','+value_Display7 +',false);\n';
  return code;
};

/************************温湿度*******************/
Blockly.Arduino.DHT11 = function() {
  var dropdown_DHT = this.getFieldValue('DHT');
  Blockly.Arduino.definitions_['include_'+'DHT'] = '#include <DHT.h>';
  Blockly.Arduino.definitions_['function_'+'dht4'] = 'DHT dht4(4, 11);';
  Blockly.Arduino.setups_['DHT'] = 'dht4.begin();';
  var code = 'round(dht4.read'+dropdown_DHT+'())';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/************************按键*******************/
Blockly.Arduino.anjian = function() {
  Blockly.Arduino.setups_['AJ'] = 'pinMode(A4, INPUT);';
  var code = 'digitalRead(A4)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.anjian2 = function() {
  var statements_PD = Blockly.Arduino.statementToCode(this, 'PD');
  var dropdown_an = this.getFieldValue('an');
  Blockly.Arduino.setups_['AJ'] = 'pinMode(A4, INPUT);';
  var code = 'if (digitalRead(A4) == '+dropdown_an+') {\n'
             +statements_PD
             + '}\n';
  return code;
};

/************************舵机*******************/
Blockly.Arduino.Servo = function() {
  var dropdown_servo_sel_1 = this.getFieldValue('servo_sel_1');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo'] = 'Servo servo_6;';
  Blockly.Arduino.setups_['attach'] = 'servo_6.attach(6);';
  var code = 'servo_6.write('+dropdown_servo_sel_1 +');\n'
  					 + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo2 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo'] = 'Servo servo_6;';
  Blockly.Arduino.setups_['attach'] = 'servo_6.attach(6);';
  var code = 'servo_6.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Servo3 = function() {
  var dropdown_servo_sel_2 = this.getFieldValue('servo_sel_2');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo2'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['attach2'] = 'servo_8.attach(8);';
  var code = 'servo_8.write('+dropdown_servo_sel_2 +');\n';
  return code;
};

Blockly.Arduino.Servo4 = function() {
  var dropdown_servo_sel_3 = this.getFieldValue('servo_sel_3');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo3'] = 'Servo servo_A0;';
  Blockly.Arduino.setups_['attach3'] = 'servo_A0.attach(A0);';
  var code = 'servo_A0.write('+dropdown_servo_sel_3 +');\n';
  return code;
};

Blockly.Arduino.Servo5 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo2'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['attach2'] = 'servo_8.attach(8);';
  var code = 'servo_8.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Servo6 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo3'] = 'Servo servo_A0;';
  Blockly.Arduino.setups_['attach3'] = 'servo_A0.attach(A0);';
  var code = 'servo_A0.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Servo7 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo8'] = 'volatile int servo1;';
  Blockly.Arduino.definitions_['function_'+'Servo8'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['attach8'] = 'servo1 = 35;\n'
                                       + '  servo_8.attach(8);\n'
                                       + '  servo_8.write(servo1);\n';
  var code = '';
  return code;
};

Blockly.Arduino.Servo8 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo9'] = 'volatile int servo2;';
  Blockly.Arduino.definitions_['function_'+'Servo9'] = 'Servo servo_9;';
  Blockly.Arduino.setups_['attach9'] = 'servo2 = 160;\n'
                                       + '  servo_9.attach(9);\n'
                                       + '  servo_9.write(servo2);\n';
  var code = '';
  return code;
};

Blockly.Arduino.Servo9 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo10'] = 'volatile int servo3;';
  Blockly.Arduino.definitions_['function_'+'Servo10'] = 'Servo servo_10;';
  Blockly.Arduino.setups_['attach10'] = 'servo3 = 130;\n'
                                       + '  servo_10.attach(10);\n'
                                       + '  servo_10.write(servo3);\n';
  var code = '';
  return code;
};

Blockly.Arduino.Servo10 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo8'] = 'volatile int servo1;';
  Blockly.Arduino.definitions_['function_'+'Servo8'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['attach8'] = 'servo1 = 35;\n'
                                       + '  servo_8.attach(8);\n'
                                       + '  servo_8.write(servo1);\n';
  var code = 'servo1 = servo1 + 2;\n'
             + 'servo_8.write(servo1);\n'
             + 'delay(0);\n'
             + 'if (servo1 > 70) {\n'
             + '  servo1 = 70;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo11 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo8'] = 'volatile int servo1;';
  Blockly.Arduino.definitions_['function_'+'Servo8'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['attach8'] = 'servo1 = 35;\n'
                                       + '  servo_8.attach(8);\n'
                                       + '  servo_8.write(servo1);\n';
  var code = 'servo1 = servo1 - 2;\n'
             + 'servo_8.write(servo1);\n'
             + 'delay(0);\n'
             + 'if (servo1 < 0) {\n'
             + '  servo1 = 0;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo12 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo9'] = 'volatile int servo2;';
  Blockly.Arduino.definitions_['function_'+'Servo9'] = 'Servo servo_9;';
  Blockly.Arduino.setups_['attach9'] = 'servo2 = 160;\n'
                                       + '  servo_9.attach(9);\n'
                                       + '  servo_9.write(servo2);\n';
  var code = 'servo2 = servo2 + 5;\n'
             + 'servo_9.write(servo2);\n'
             + 'delay(0);\n'
             + 'if (servo2 > 160) {\n'
             + '  servo2 = 160;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo13 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo9'] = 'volatile int servo2;';
  Blockly.Arduino.definitions_['function_'+'Servo9'] = 'Servo servo_9;';
  Blockly.Arduino.setups_['attach9'] = 'servo2 = 160;\n'
                                       + '  servo_9.attach(9);\n'
                                       + '  servo_9.write(servo2);\n';
  var code = 'servo2 = servo2 - 5;\n'
             + 'servo_9.write(servo2);\n'
             + 'delay(0);\n'
             + 'if (servo2 < 80) {\n'
             + '  servo2 = 80;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo14 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo10'] = 'volatile int servo3;';
  Blockly.Arduino.definitions_['function_'+'Servo10'] = 'Servo servo_10;';
  Blockly.Arduino.setups_['attach10'] = 'servo3 = 130;\n'
                                       + '  servo_10.attach(10);\n'
                                       + '  servo_10.write(servo3);\n';
  var code = 'servo3 = servo3 - 5;\n'
             + 'servo_10.write(servo3);\n'
             + 'delay(0);\n'
             + 'if (servo3 < 100) {\n'
             + '  servo3 = 100;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo15 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_'+'Servo10'] = 'volatile int servo3;';
  Blockly.Arduino.definitions_['function_'+'Servo10'] = 'Servo servo_10;';
  Blockly.Arduino.setups_['attach10'] = 'servo3 = 130;\n'
                                       + '  servo_10.attach(10);\n'
                                       + '  servo_10.write(servo3);\n';
  var code = 'servo3 = servo3 + 5;\n'
             + 'servo_10.write(servo3);\n'
             + 'delay(0);\n'
             + 'if (servo3 > 130) {\n'
             + '  servo3 = 130;\n'
             + '}\n';
  return code;
};

Blockly.Arduino.Servo16 = function() {
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'ServoAll'] = 'Servo servo_A4;\n'
                                                         + 'Servo servo_A2;\n'
                                                         + 'Servo servo_A0;\n'
                                                         + 'Servo servo_4;\n'
                                                         + 'Servo servo_10;\n'
                                                         + 'Servo servo_9;\n'
                                                         + 'Servo servo_8;\n'
                                                         + 'Servo servo_6;\n';
  Blockly.Arduino.setups_['attachAll'] = 'servo_A4.attach(A4);\n'
                                         + '  servo_A2.attach(A2);\n'
                                         + '  servo_A0.attach(A0);\n'
                                         + '  servo_4.attach(4);\n'
                                         + '  servo_10.attach(10);\n'
                                         + '  servo_9.attach(9);\n'
                                         + '  servo_8.attach(8);\n'
                                         + '  servo_6.attach(6);\n'
                                         + '  servo_A4.write(180);\n'
                                         + '  servo_A2.write(180);\n'
                                         + '  servo_A0.write(180);\n'
                                         + '  servo_4.write(180);\n'
                                         + '  servo_10.write(0);\n'
                                         + '  servo_9.write(0);\n'
                                         + '  servo_8.write(0);\n'
                                         + '  servo_6.write(0);\n';
  var code = '';
  return code;
};

Blockly.Arduino.Servo17 = function() {
  var dropdown_ServoA4 = this.getFieldValue('ServoA4');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'ServoA4'] = 'Servo servo_A4;';
  Blockly.Arduino.setups_['ServoA4'] = 'servo_A4.attach(A4);';
  var code = 'servo_A4.write('+dropdown_ServoA4+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo18 = function() {
  var dropdown_ServoA2 = this.getFieldValue('ServoA2');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'ServoA2'] = 'Servo servo_A2;';
  Blockly.Arduino.setups_['ServoA2'] = 'servo_A2.attach(A2);';
  var code = 'servo_A2.write('+dropdown_ServoA2+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo19 = function() {
  var dropdown_ServoA0 = this.getFieldValue('ServoA0');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'ServoA0'] = 'Servo servo_A0;';
  Blockly.Arduino.setups_['ServoA0'] = 'servo_A0.attach(A0);';
  var code = 'servo_A0.write('+dropdown_ServoA0+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo20 = function() {
  var dropdown_Servo4 = this.getFieldValue('Servo4');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo4'] = 'Servo servo_4;';
  Blockly.Arduino.setups_['Servo4'] = 'servo_4.attach(4);';
  var code = 'servo_4.write('+dropdown_Servo4+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo21 = function() {
  var dropdown_Servo10 = this.getFieldValue('Servo10');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo10'] = 'Servo servo_10;';
  Blockly.Arduino.setups_['Servo10'] = 'servo_10.attach(10);';
  var code = 'servo_10.write('+dropdown_Servo10+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo22 = function() {
  var dropdown_Servo9 = this.getFieldValue('Servo9');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo9'] = 'Servo servo_9;';
  Blockly.Arduino.setups_['Servo9'] = 'servo_9.attach(9);';
  var code = 'servo_9.write('+dropdown_Servo9+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo23 = function() {
  var dropdown_Servo8 = this.getFieldValue('Servo8');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo8'] = 'Servo servo_8;';
  Blockly.Arduino.setups_['Servo8'] = 'servo_8.attach(8);';
  var code = 'servo_8.write('+dropdown_Servo8+');\n'
             + 'delay(0);\n';
  return code;
};

Blockly.Arduino.Servo24 = function() {
  var dropdown_Servo6 = this.getFieldValue('Servo6');
  Blockly.Arduino.definitions_['include_'+'servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['function_'+'Servo6'] = 'Servo servo_6;';
  Blockly.Arduino.setups_['Servo6'] = 'servo_6.attach(6);';
  var code = 'servo_6.write('+dropdown_Servo6+');\n'
             + 'delay(0);\n';
  return code;
};

/************************红外测距*******************/
Blockly.Arduino.infrared_ranging_1 = function() {
  Blockly.Arduino.setups_['IR'] = 'pinMode(2, INPUT);';
  var code = '!digitalRead(2)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.infrared_ranging_2 = function() {
  var statements_PD = Blockly.Arduino.statementToCode(this, 'PD');
  var dropdown_an = this.getFieldValue('an');
  Blockly.Arduino.setups_['IR'] = 'pinMode(2, INPUT);';
  var code = 'if (digitalRead(2) == '+dropdown_an+') {\n'
             +statements_PD
             + '}\n';
  return code;
};

/************************其他*******************/
Blockly.Arduino.OLED = function() {
  var text_SSD1306 = this.getFieldValue('SSD1306');
  Blockly.Arduino.definitions_['include_'+'U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['include_'+'Wire.h'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['function_'+'U8G2'] = 'U8G2_SSD1306_128X64_NONAME_1_SW_I2C '+text_SSD1306 +'(U8G2_R0,  A0, A1, U8X8_PIN_NONE);';
  Blockly.Arduino.setups_['OLED'] = text_SSD1306 +'.setI2CAddress(0x3C*2);\n  '
                                    +text_SSD1306 +'.begin();\n';
  var code = '';
  return code;
};

Blockly.Arduino.LCD = function() {
  var value_LCD1 = Blockly.Arduino.valueToCode(this, 'LCD1', Blockly.Arduino.ORDER_ATOMIC);
  var value_LCD2 = Blockly.Arduino.valueToCode(this, 'LCD2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'1602'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['include_'+'iic'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['function_'+'lcd'] = 'LiquidCrystal_SoftI2C mylcd(0x27,16,2,A0,A1);';
  Blockly.Arduino.setups_['LCD'] = 'mylcd.init();\n'
                                   + '  mylcd.backlight();';
  var code = 'mylcd.setCursor(0, 0);\n'
             + 'mylcd.print('+value_LCD1+');\n'
             + 'mylcd.setCursor(0, 1);\n'
             + 'mylcd.print('+value_LCD2+');\n';
  return code;
};

Blockly.Arduino.LCD2 = function() {
  var value_LCD1 = Blockly.Arduino.valueToCode(this, 'LCD1', Blockly.Arduino.ORDER_ATOMIC);
  var value_LCD2 = Blockly.Arduino.valueToCode(this, 'LCD2', Blockly.Arduino.ORDER_ATOMIC);
  var value_Delay = Blockly.Arduino.valueToCode(this, 'Delay', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'1602'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['include_'+'iic'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['function_'+'lcd'] = 'LiquidCrystal_SoftI2C mylcd(0x27,16,2,A0,A1);';
  Blockly.Arduino.setups_['LCD'] = 'mylcd.init();\n'
                                   + '  mylcd.backlight();';
  var code = 'mylcd.clear();\n'
             + 'mylcd.setCursor(0, 0);\n'
             + 'mylcd.print('+value_LCD1+');\n'
             + 'mylcd.setCursor(0, 1);\n'
             + 'mylcd.print('+value_LCD2+');\n'
             + 'delay('+value_Delay+');\n';
  return code;
};

/************************延时模块*******************/
Blockly.Arduino.delay1 = function() {
  var value_de = Blockly.Arduino.valueToCode(this, 'de', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_de1 = this.getFieldValue('de1');
  var code = 'delay('+value_de*dropdown_de1+');\n';
  return code;
};

/************************电机*******************/
Blockly.Arduino.MOTOR1 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR2 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR3 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR4 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR5 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR6 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR7 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR8 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR9 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR10 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR11 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR12 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR13 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};
/************************超声波*******************/
Blockly.Arduino.CSB = function() {
  Blockly.Arduino.definitions_['function_'+'checkdistance_2_3'] = 'float checkdistance_2_3() {\n'
                                                                  + '  digitalWrite(2, LOW);\n'
                                                                  + '  delayMicroseconds(2);\n'
                                                                  + '  digitalWrite(2, HIGH);\n'
                                                                  + '  delayMicroseconds(10);\n'
                                                                  + '  digitalWrite(2, LOW);\n'
                                                                  + '  float distance = pulseIn(3, HIGH) / 58.00;\n'
                                                                  + '  delay(10);\n'
                                                                  + '  return distance;\n'
                                                                  + '}\n';
  Blockly.Arduino.setups_['CSB'] = 'pinMode(2, OUTPUT);\n'
                                   +'  pinMode(3, INPUT);';
  var code = 'round(checkdistance_2_3())';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.CSB2 = function() {
  var dropdown_PD = this.getFieldValue('PD');
  var number_1024 = this.getFieldValue('1024');
  Blockly.Arduino.definitions_['function_'+'checkdistance_2_3'] = 'float checkdistance_2_3() {\n'
                                                                  + '  digitalWrite(2, LOW);\n'
                                                                  + '  delayMicroseconds(2);\n'
                                                                  + '  digitalWrite(2, HIGH);\n'
                                                                  + '  delayMicroseconds(10);\n'
                                                                  + '  digitalWrite(2, LOW);\n'
                                                                  + '  float distance = pulseIn(3, HIGH) / 58.00;\n'
                                                                  + '  delay(10);\n'
                                                                  + '  return distance;\n'
                                                                  + '}\n';
  Blockly.Arduino.setups_['CSB'] = 'pinMode(2, OUTPUT);\n'
                                   +'  pinMode(3, INPUT);';
  var code = 'round(checkdistance_2_3())'+dropdown_PD+number_1024;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/************************点阵屏*******************/
Blockly.Arduino.MAX7219 = function() {
  var dropdown_D1 = this.getFieldValue('D1');
  Blockly.Arduino.definitions_['include_'+'SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+'Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_['include_'+'Max'] = '#include <Max72xxPanel.h>';
  Blockly.Arduino.definitions_['var_declare_'+'myMatrix'] = 'Max72xxPanel myMatrix = Max72xxPanel(10,1,1);';
  var code = 'myMatrix.setRotation(0,2);\n'
             + 'myMatrix.fillScreen('+dropdown_D1 +');\n'
             + 'myMatrix.write();\n';
  return code;
};

Blockly.Arduino.MAX7219_2 = function() {
  var value_D1 = Blockly.Arduino.valueToCode(this, 'D1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+'Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_['include_'+'Max'] = '#include <Max72xxPanel.h>';
  Blockly.Arduino.definitions_['var_declare_'+'myMatrix'] = 'Max72xxPanel myMatrix = Max72xxPanel(10,1,1);';
  var code = 'myMatrix.setRotation(0,2);\n'
             + 'myMatrix.setCursor(0, 0);\n'
             + 'myMatrix.print('+value_D1+');\n'
             + 'myMatrix.write();\n';
  return code;
};

Blockly.Arduino.MAX7219_3 = function() {
  var value_D1 = Blockly.Arduino.valueToCode(this, 'D1', Blockly.Arduino.ORDER_ATOMIC);
  var value_D2 = Blockly.Arduino.valueToCode(this, 'D2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+'Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_['include_'+'Max'] = '#include <Max72xxPanel.h>';
  Blockly.Arduino.definitions_['var_declare_'+'myMatrix'] = 'Max72xxPanel myMatrix = Max72xxPanel(10,1,1);';
  var code = 'myMatrix.setRotation(0,2);\n'
             + 'myMatrix.scrollMessage('+value_D1 +','+value_D2 +');\n';
  return code;
};

Blockly.Arduino.MAX7219_4 = function() {
  var value_D3 = Blockly.Arduino.valueToCode(this, 'D3', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+'Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_['include_'+'Max'] = '#include <Max72xxPanel.h>';
  Blockly.Arduino.definitions_['var_declare_'+'myMatrix'] = 'Max72xxPanel myMatrix = Max72xxPanel(10,1,1);';
  Blockly.Arduino.definitions_['var_declare_'+'LEDArray'] = 'uint8_t  LEDArray[8];';
  var code = 'myMatrix.setRotation(0,2);\n'
             + 'memcpy_P(&LEDArray, &'+value_D3 +', 8);\n'
             + 'for(int index_i=0; index_i<8; index_i++)\n'
             + '{\n'
             + '  for(int index_j=0*8; index_j<0*8+8; index_j++)\n'
             + '  {\n'
             + '    if((LEDArray[index_i]&0x01)>0)\n'
             + '      myMatrix.drawPixel(index_j, 7-index_i,1);\n'
             + '    else\n'
             + '      myMatrix.drawPixel(index_j, 7-index_i,0);\n'
             + '    LEDArray[index_i] = LEDArray[index_i]>>1;\n'
             + '  }\n'
             + '}\n'
             + 'myMatrix.write();\n';
  return code;
};

Blockly.Arduino.MAX7219_5 = function() {
  var value_D4 = Blockly.Arduino.valueToCode(this, 'D4', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_'+'SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+'Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_['include_'+'Max'] = '#include <Max72xxPanel.h>';
  Blockly.Arduino.definitions_['var_declare_'+'myMatrix'] = 'Max72xxPanel myMatrix = Max72xxPanel(10,1,1);';
  Blockly.Arduino.definitions_['var_declare_'+'LEDArray'] = 'uint8_t  LEDArray[8];';
  var code = 'myMatrix.setRotation(0,2);\n'
             + 'memcpy_P(&LEDArray, &'+value_D4 +', 8);\n'
             + 'for(int index_i=0; index_i<8; index_i++)\n'
             + '{\n'
             + '  for(int index_j=0*8; index_j<0*8+8; index_j++)\n'
             + '  {\n'
             + '    if((LEDArray[index_i]&0x01)>0)\n'
             + '      myMatrix.drawPixel(index_j, 7-index_i,1);\n'
             + '    else\n'
             + '      myMatrix.drawPixel(index_j, 7-index_i,0);\n'
             + '    LEDArray[index_i] = LEDArray[index_i]>>1;\n'
             + '  }\n'
             + '}\n'
             + 'myMatrix.write();\n';
  return code;
};

/************************路面*******************/
Blockly.Arduino.Ground = function() {
  var dropdown_cho1 = this.getFieldValue('cho1');
  var dropdown_cho2 = this.getFieldValue('cho2');
  Blockly.Arduino.setups_['pin'] = 'pinMode('+dropdown_cho1+', INPUT);\n';
  var code = 'digitalRead('+dropdown_cho1 +') == '+dropdown_cho2 +'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/************************寻迹*******************/
Blockly.Arduino.Tracing = function() {
  var dropdown_cho1 = this.getFieldValue('cho1');
  var dropdown_cho2 = this.getFieldValue('cho2');
  Blockly.Arduino.setups_['pin'] = 'pinMode('+dropdown_cho1+', INPUT);\n';
  var code = 'digitalRead('+dropdown_cho1 +') == '+dropdown_cho2 +'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/************************激光*******************/
Blockly.Arduino.F1 = function() {
  var dropdown_digital = this.getFieldValue('digital');
  Blockly.Arduino.setups_['OUTPUT'] = 'pinMode(8, OUTPUT);\n';
  var code = 'digitalWrite(8,'+dropdown_digital +');\n';
  return code;
};

/************************电机2*******************/
Blockly.Arduino.MOTOR2_1 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR2_2 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR2_3 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR2_4 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR2_5 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR2_6 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR2_7 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR2_8 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR2_9 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR2_10 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR2_11 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR2_12 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR2_13 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

/************************风扇*******************/
Blockly.Arduino.F2 = function() {
  var dropdown_digital = this.getFieldValue('digital');
  Blockly.Arduino.setups_['OUTPUT'] = 'pinMode(10, OUTPUT);\n';
  var code = 'digitalWrite(10,'+dropdown_digital +');\n';
  return code;
};

/************************红外遥控*******************/
Blockly.Arduino.control_1 = function() {
  var statements_control = Blockly.Arduino.statementToCode(this, 'control');
  Blockly.Arduino.definitions_['include_'+'IR'] = '#include <IRremote.h>';
  Blockly.Arduino.definitions_['var_declare_'+'IR'] = 'const String IR_PROTOCOL_TYPE[] = {   "UNKNOWN",   "PULSE_DISTANCE",   "PULSE_WIDTH",   "DENON",   "DISH",   "JVC",   "LG",   "LG2",   "NEC",   "PANASONIC",   "KASEIKYO",   "KASEIKYO_JVC",   "KASEIKYO_DENON",   "KASEIKYO_SHARP",   "KASEIKYO_MITSUBISHI",   "RC5",   "RC6",   "SAMSUNG",   "SHARP",   "SONY",   "ONKYO",   "APPLE",   "BOSEWAVE",   "LEGO_PF",   "MAGIQUEST",   "WHYNTER" };';
  Blockly.Arduino.definitions_['function_'+'IR'] = 'IRrecv irrecv_11(11);';
  Blockly.Arduino.setups_['enable'] = 'irrecv_11.enableIRIn();';
  var code = 'if (irrecv_11.decode()) {\n'
             + '  struct IRData *pIrData = &irrecv_11.decodedIRData;\n'
             + '  long ir_item = pIrData->decodedRawData;\n'
             + '  String irProtocol = IR_PROTOCOL_TYPE[pIrData->protocol];\n'
             + '  Serial.print("IR TYPE:" + irProtocol + "\tVALUE:");\n'
             + '  Serial.println(ir_item, HEX);\n'
             + '  irrecv_11.resume();\n'
             + statements_control 
             + '} else {\n'
             + '}\n';
  return code;
};

Blockly.Arduino.control_2 = function() {
  var statements_control2 = Blockly.Arduino.statementToCode(this, 'control2');
  var dropdown_item1 = this.getFieldValue('item1');
  var code = 'if (ir_item == '+dropdown_item1 +') {\n'
             + '  '+statements_control2 
             + '}\n';
  return code;
};

/************************语音播报*******************/
Blockly.Arduino.Voice = function() {
  var dropdown_sel = this.getFieldValue('sel');
  Blockly.Arduino.definitions_['include_'+'send'] = 'void send_data(int addr) {\n'
                                                    + '  int i;\n'
                                                    + '  digitalWrite(9, LOW);\n'
                                                    + '  delay(4); //>2ms\n'
                                                    + '  for (i = 0; i < 8; i++) {\n'
                                                    + '    digitalWrite(9, HIGH);\n'
                                                    + '    if (addr & 1) {\n'
                                                    + '      delayMicroseconds(2400); //>2400us\n'
                                                    + '      digitalWrite(9, LOW);\n'
                                                    + '      delayMicroseconds(800);\n'
                                                    + '    } //>800us\n'
                                                    + '    else {\n'
                                                    + '      delayMicroseconds(800); //>800us\n'
                                                    + '      digitalWrite(9, LOW);\n'
                                                    + '      delayMicroseconds(2400);\n'
                                                    + '    } //>2400us\n'
                                                    + '    addr >>= 1;\n'
                                                    + '  }\n'
                                                    + '  digitalWrite(9, HIGH);\n'
                                                    + '}\n';
  Blockly.Arduino.setups_['pin9'] = 'pinMode(9, OUTPUT);\n';
  var code = 'send_data('+dropdown_sel+'); //volume control 0xE0-E7;\n';
  return code;
};

/************************电机3*******************/
Blockly.Arduino.MOTOR3_1 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR3_2 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR3_3 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR3_4 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR3_5 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR3_6 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR3_7 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 255);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

Blockly.Arduino.MOTOR3_8 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 185);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 55);\n';
  return code;
};

Blockly.Arduino.MOTOR3_9 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 118);\n'
             + 'digitalWrite(7,HIGH);\n'
             + 'analogWrite(6, 100);\n';
  return code;
};

Blockly.Arduino.MOTOR3_10 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 255);\n';
  return code;
};

Blockly.Arduino.MOTOR3_11 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 55);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 185);\n';
  return code;
};

Blockly.Arduino.MOTOR3_12 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,HIGH);\n'
             + 'analogWrite(5, 100);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 118);\n';
  return code;
};

Blockly.Arduino.MOTOR3_13 = function() {
  Blockly.Arduino.setups_['mode'] = 'pinMode(4, OUTPUT);\n'
                                    + '  pinMode(5, OUTPUT);\n'
                                    + '  pinMode(7, OUTPUT);\n'
                                    + '  pinMode(6, OUTPUT);\n';
  var code = 'digitalWrite(4,LOW);\n'
             + 'analogWrite(5, 0);\n'
             + 'digitalWrite(7,LOW);\n'
             + 'analogWrite(6, 0);\n';
  return code;
};

/************************遥控手柄*******************/
Blockly.Arduino.PS2_1 = function() {
  var dropdown_PS_1 = this.getFieldValue('PS_1');
  var code = ' ps2x.Analog'+dropdown_PS_1 +'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.PS2_2 = function() {
  var dropdown_PS_2 = this.getFieldValue('PS_2');
  Blockly.Arduino.setups_['ps2_2'] = 'pinMode(4, OUTPUT);\n'
                                     + '  pinMode(5, OUTPUT);\n'
                                     + '  pinMode(7, OUTPUT);\n'
                                     + '  pinMode(6, OUTPUT);\n';
  var code = 'if (ps2x.Analog(PSS_'+dropdown_PS_2 +'X) < 125) {\n'
             + '  digitalWrite(4,LOW);\n'
             + '  analogWrite(5, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'X), 0, 125, 255, 0)));\n'
             + '  digitalWrite(7,HIGH);\n'
             + '  analogWrite(6, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'X), 0, 125, 0, 255)));\n'
             + '} else if (ps2x.Analog(PSS_'+dropdown_PS_2 +'X) > 130) {\n'
             + '  digitalWrite(4,HIGH);\n'
             + '  analogWrite(5, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'X), 130, 255, 255, 0)));\n'
             + '  digitalWrite(7,LOW);\n'
             + '  analogWrite(6, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'X), 130, 255, 0, 255)));\n'
             + '} else if (ps2x.Analog(PSS_'+dropdown_PS_2 +'Y) < 125) {\n'
             + '  digitalWrite(4,LOW);\n'
             + '  analogWrite(5, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'Y), 0, 125, 255, 0)));\n'
             + '  digitalWrite(7,LOW);\n'
             + '  analogWrite(6, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'Y), 0, 125, 255, 0)));\n'
             + '} else if (ps2x.Analog(PSS_'+dropdown_PS_2 +'Y) > 130) {\n'
             + '  digitalWrite(4,HIGH);\n'
             + '  analogWrite(5, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'Y), 130, 255, 255, 0)));\n'
             + '  digitalWrite(7,HIGH);\n'
             + '  analogWrite(6, (map(ps2x.Analog(PSS_'+dropdown_PS_2 +'Y), 130, 255, 255, 0)));\n'
             + '} else {\n'
             + '  digitalWrite(4,HIGH);\n'
             + '  analogWrite(5, 255);\n'
             + '  digitalWrite(7,HIGH);\n'
             + '  analogWrite(6, 255);\n'
             + '}\n';
  return code;
};

Blockly.Arduino.PS2_3 = function() {
  Blockly.Arduino.definitions_['include_'+'PS2X'] = '#include <PS2X_lib.h>';
  Blockly.Arduino.definitions_['var_declare_'+'PS2'] = 'PS2X ps2x;';
  Blockly.Arduino.setups_['ps2_3'] = 'ps2x.config_gamepad(3,A5,2,A4, true, true);\n'
                                     + '  delay(300);\n';
  var code = 'ps2x.read_gamepad(false, 0);\n'
             + '  delay(30);\n';
  return code;
};

/************************光敏传感器*******************/
Blockly.Arduino.light_1 = function() {
  var dropdown_light = this.getFieldValue('light');
  Blockly.Arduino.setups_['pinA0'] = 'pinMode(A0, INPUT);\n';
  var code = ''+dropdown_light+'digitalRead(A0)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
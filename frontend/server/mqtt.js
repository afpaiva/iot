import mqtt from "mqtt";
import { brokerMessageHandlers } from "./BrokerMessageHandler.js";

const MQTT_HOST = "mqtt://test.mosquitto.org";
export const TOPIC = "com.stonkstoys.game.genius";

const client = mqtt.connect(MQTT_HOST);

client.on("connect", () => {
  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error("MQTT Subscription Error!", err);
      return;
    }
  });
});

client.on("message", (_topic, message) => {
  message = message.toString(); // message is Buffer

  console.log("MQTT says", message);

  brokerMessageHandlers.forEach((handler) => {
    handler.emit(message);
  });

  // client.end();
});

export { client as mqttClient };

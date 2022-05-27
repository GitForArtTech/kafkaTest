const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:29092"],
});
const producer = kafka.producer();
const topic = "dorm";

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      {
        key: "5001",
        value: "自強5舍,false",
      },
    ],
  });

  await producer.disconnect();
};
run().catch(console.error);

const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:29092"],
});
const producer = kafka.producer();
const topic = "dorm_input";
const topic2 = "dorm";

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      {
        key: "11123123",
        value: "XXXX,XX系,自強2舍,2001",
      },
    ],
  });
  await producer.send({
    topic: topic2,
    messages: [
      {
        key: "2001",
        value: "自強2舍,false",
      },
    ],
  });

  await producer.disconnect();
};
run().catch(console.error);

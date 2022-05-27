const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:29092"],
});
const topic = "USERS";
const consumer = kafka.consumer({ groupId: "test-group" });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
  // get message from begining -> see
  // https://github.com/tulios/kafkajs/issues/139 consumer.seek({ topic, partition: 0, offset: -2 });
};
run().catch(console.error);

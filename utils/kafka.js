const { Kafka } = require("kafkajs");
const transaction = require("../services/transaction-service");
let consumer = null;
let producer = null;

const KAFKA_BROKERS = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : [];

const kafka = new Kafka({
  clientId: "transcation",
  brokers: KAFKA_BROKERS,
});
const transactionComplete = () => {
  return async ({ topic, partition, message }) => {
    const { transactionAmount, userId } = JSON.parse(message.value.toString());
    result = await transaction.transactionApi({ transactionAmount, userId });
  };
};

const connectKafkaConsumer = async () => {
  consumer = kafka.consumer({ groupId: "transcation-group" });
  await consumer.connect();
  return consumer;
};

const getConsumer = () => {
  if (!consumer) {
    throw new Error("Consumer not available!");
  }
  return consumer;
};

const subscribeTopic = async (topic, eachMessageHandler) => {
  const consumer = getConsumer();
  await consumer.stop();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: eachMessageHandler,
  });
};

const connectKafkaProducer = async () => {
  producer = kafka.producer();
  await producer.connect();
  return producer;
};

const getProducer = () => {
  if (!producer) {
    throw new Error("Producer not available!");
  }
  return producer;
};

const sendTopic = async (topic, message) => {
  const producer = getProducer();
  return producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = {
  connectKafkaConsumer,
  subscribeTopic,
  connectKafkaProducer,
  sendTopic,
  transactionComplete,
};

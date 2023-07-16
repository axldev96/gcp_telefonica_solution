'use strict';

import { Telegraf } from 'telegraf';
import {PubSub} from '@google-cloud/pubsub';
import express from 'express';
import { message } from 'telegraf/filters';
import simpleLog from 'simple-node-logger';
import { configDotenv } from "dotenv";

configDotenv();

const log = simpleLog.createSimpleLogger()
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

log.setLevel(process.env.LOG_LEVEL);

const gcp_project_name= process.env.GCP_PROJECT_NAME;
const topic_name = process.env.TOPIC_NAME;
const pubsub = new PubSub({projectId: gcp_project_name});
const topic = pubsub.topic(topic_name);

bot.start((ctx) => ctx.reply("Bienvenido al chat de Telefonica!!"));

bot.on(message('text'), async (ctx) => {
    log.info("Text message received");

    const pubsub_message = JSON.stringify({
        chat_id: ctx.chat.id,
        user: ctx.from.username ? ctx.from.username : 'N.A.',
        timestamp: Date.now() / 1000,
        messageType: "TextMessageReceived",
        message_text: ctx.message.text
    });

    const dataBuffer = Buffer.from(pubsub_message);
    const messageId = await topic.publishMessage({data: dataBuffer});

    log.debug(`Message sent to pub/sub with id: ${messageId}`);
    ctx.reply("Gracias por tu mensaje, lo estamos procesando.");
});

const app = express();

app.use(express.json());
app.post('/', (req, res) => {
    if(req.headers['content-type'] !== 'application/json'){
        return res.status(400).send('Bad request');
    }
    res.status(204).end();
});

bot.launch();
export default app;

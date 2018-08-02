'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion, Suggestions, LinkOutSuggestion} = require('dialogflow-fulfillment');
const { Carousel, BrowseCarousel, BrowseCarouselItem, Image } = require('actions-on-google');
const medicos = require("./medicos");
const howto = require("./howto");

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.intents = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  //Mapa de Intencoes
  let intentMap = new Map();
  //Buscar Especialidades intencao
  intentMap.set('busca_especialidade_servico', medicos.busca );

  intentMap.set('como_funciona', howto.help);

  agent.handleRequest(intentMap);
});

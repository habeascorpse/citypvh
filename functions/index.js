'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion, Suggestions, LinkOutSuggestion} = require('dialogflow-fulfillment');
const { Carousel, BrowseCarousel, BrowseCarouselItem, Image } = require('actions-on-google');
const buscaMedico = require("./busca_medico.js");

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  let intentMap = new Map();


  //Buscar Especialidades intencao
  intentMap.set('busca_especialidade_servico', buscaMedico.buscaProfissional(agent) );

  intentMap.set('como_funciona', (agent) =>  {
  	let conv = agent.conv();
    agent.add('Certo, aqui estão algumas sugestões');
    agent.add(new Suggestion('encotrar um pediatra'));
  });

  agent.handleRequest(intentMap);
});

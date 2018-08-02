const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion, Suggestions, LinkOutSuggestion} = require('dialogflow-fulfillment');
const { Carousel, BrowseCarousel, BrowseCarouselItem, Image } = require('actions-on-google');

const howto = (agent) => {

    let conv = agent.conv();
    agent.add('Certo, aqui estão algumas sugestões');
    agent.add(new Suggestion('encotrar um pediatra'));

}

module.exports.help = howto;
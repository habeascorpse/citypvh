const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion, Suggestions, LinkOutSuggestion} = require('dialogflow-fulfillment');
const { Carousel, BrowseCarousel, BrowseCarouselItem, Image } = require('actions-on-google');
const db = require("./db.js").db;


module.exports = {

  buscaProfissional : (agent) =>  {
    let conv = agent.conv();
    let profissional = agent.parameters.profissional;

    let items = db.filter(i => i.especialidades.includes(profissional));


    if (items.length === 0) {
      agent.add(`verifiquei aqui, mas não encontrei nenhum ${profissional} neste momento`);
    }


    if (items.length === 1) {
      agent.add(`Temos disponivel ${profissional} na seguinte unidade de saúde`);
      agent.add(new Card(
        {
          title: items[0].nome,
          subtitle: items[0].logradouro,
          imageUrl: items[0].imagem,
          text: items[0].horarioAtendimento,
          buttonText: 'Ligar',
          buttonUrl: `http://bit.ly/Oao79812h`
        }
      ));

    }

    if (items.length > 1) {

      conv.ask(`Temos disponivel ${profissional}s nas seguintes unidades de saúde:`);
      let c_items = [];

      items.forEach((item) => {
        let _bci = new BrowseCarouselItem({
          title: item.nome,
          url: `http://bit.ly/Lassfiu89`,
          description: item.horarioAtendimento,
          image: new Image({
            url: item.imagem,
            alt: 'Foto unidade'
          }),
          footer: item.logradouro,
        });
        c_items.push(_bci);
      });

      // Create a browse carousel
      conv.ask(new BrowseCarousel({
        items: c_items,
      }));

      agent.add(conv);
    }

    return agent;
  }
}

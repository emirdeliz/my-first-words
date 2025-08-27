export interface Language {
  code: string;
  name: string;
  speechCode: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'es', name: 'Español', speechCode: 'es-ES' },
  { code: 'pt', name: 'Português', speechCode: 'pt-PT' },
  { code: 'pt-BR', name: 'Português (Brasil)', speechCode: 'pt-BR' },
  { code: 'de', name: 'Deutsch', speechCode: 'de-DE' },
];

export interface Translation {
  appTitle: string;
  back: string;
  categories: {
    basic: string;
    emotions: string;
    activities: string;
    social: string;
  };
  basicNeeds: {
    hungry: string;
    thirsty: string;
    tired: string;
    bathroom: string;
    help: string;
    break: string;
  };
  emotions: {
    happy: string;
    sad: string;
    angry: string;
    scared: string;
    excited: string;
    calm: string;
  };
  activities: {
    play: string;
    read: string;
    music: string;
    outside: string;
    tv: string;
    draw: string;
  };
  social: {
    hello: string;
    goodbye: string;
    please: string;
    thankyou: string;
    sorry: string;
    yes: string;
    no: string;
  };
}

export const TRANSLATIONS: Record<string, Translation> = {
  en: {
    appTitle: 'AAC Communicator',
    back: 'Back',
    categories: {
      basic: 'Basic Needs',
      emotions: 'Feelings',
      activities: 'Activities',
      social: 'Social',
    },
    basicNeeds: {
      hungry: 'I am hungry',
      thirsty: 'I am thirsty',
      tired: 'I am tired',
      bathroom: 'I need the bathroom',
      help: 'I need help',
      break: 'I need a break',
    },
    emotions: {
      happy: 'I feel happy',
      sad: 'I feel sad',
      angry: 'I feel angry',
      scared: 'I feel scared',
      excited: 'I feel excited',
      calm: 'I feel calm',
    },
    activities: {
      play: 'I want to play',
      read: 'I want to read',
      music: 'I want music',
      outside: 'I want to go outside',
      tv: 'I want to watch TV',
      draw: 'I want to draw',
    },
    social: {
      hello: 'Hello',
      goodbye: 'Goodbye',
      please: 'Please',
      thankyou: 'Thank you',
      sorry: 'Sorry',
      yes: 'Yes',
      no: 'No',
    },
  },
  es: {
    appTitle: 'Comunicador CAA',
    back: 'Atrás',
    categories: {
      basic: 'Necesidades Básicas',
      emotions: 'Sentimientos',
      activities: 'Actividades',
      social: 'Social',
    },
    basicNeeds: {
      hungry: 'Tengo hambre',
      thirsty: 'Tengo sed',
      tired: 'Estoy cansado',
      bathroom: 'Necesito ir al baño',
      help: 'Necesito ayuda',
      break: 'Necesito un descanso',
    },
    emotions: {
      happy: 'Me siento feliz',
      sad: 'Me siento triste',
      angry: 'Me siento enojado',
      scared: 'Tengo miedo',
      excited: 'Me siento emocionado',
      calm: 'Me siento tranquilo',
    },
    activities: {
      play: 'Quiero jugar',
      read: 'Quiero leer',
      music: 'Quiero música',
      outside: 'Quiero salir afuera',
      tv: 'Quiero ver televisión',
      draw: 'Quiero dibujar',
    },
    social: {
      hello: 'Hola',
      goodbye: 'Adiós',
      please: 'Por favor',
      thankyou: 'Gracias',
      sorry: 'Lo siento',
      yes: 'Sí',
      no: 'No',
    },
  },
  pt: {
    appTitle: 'Comunicador CAA',
    back: 'Voltar',
    categories: {
      basic: 'Necessidades Básicas',
      emotions: 'Sentimentos',
      activities: 'Atividades',
      social: 'Social',
    },
    basicNeeds: {
      hungry: 'Tenho fome',
      thirsty: 'Tenho sede',
      tired: 'Estou cansado',
      bathroom: 'Preciso da casa de banho',
      help: 'Preciso de ajuda',
      break: 'Preciso de uma pausa',
    },
    emotions: {
      happy: 'Sinto-me feliz',
      sad: 'Sinto-me triste',
      angry: 'Sinto-me zangado',
      scared: 'Tenho medo',
      excited: 'Sinto-me animado',
      calm: 'Sinto-me calmo',
    },
    activities: {
      play: 'Quero brincar',
      read: 'Quero ler',
      music: 'Quero música',
      outside: 'Quero ir lá fora',
      tv: 'Quero ver televisão',
      draw: 'Quero desenhar',
    },
    social: {
      hello: 'Olá',
      goodbye: 'Adeus',
      please: 'Por favor',
      thankyou: 'Obrigado',
      sorry: 'Desculpa',
      yes: 'Sim',
      no: 'Não',
    },
  },
  'pt-BR': {
    appTitle: 'Comunicador CAA',
    back: 'Voltar',
    categories: {
      basic: 'Necessidades Básicas',
      emotions: 'Sentimentos',
      activities: 'Atividades',
      social: 'Social',
    },
    basicNeeds: {
      hungry: 'Estou com fome',
      thirsty: 'Estou com sede',
      tired: 'Estou cansado',
      bathroom: 'Preciso do banheiro',
      help: 'Preciso de ajuda',
      break: 'Preciso de uma pausa',
    },
    emotions: {
      happy: 'Me sinto feliz',
      sad: 'Me sinto triste',
      angry: 'Me sinto bravo',
      scared: 'Estou com medo',
      excited: 'Estou animado',
      calm: 'Me sinto calmo',
    },
    activities: {
      play: 'Quero brincar',
      read: 'Quero ler',
      music: 'Quero música',
      outside: 'Quero ir lá fora',
      tv: 'Quero assistir TV',
      draw: 'Quero desenhar',
    },
    social: {
      hello: 'Oi',
      goodbye: 'Tchau',
      please: 'Por favor',
      thankyou: 'Obrigado',
      sorry: 'Desculpa',
      yes: 'Sim',
      no: 'Não',
    },
  },
  de: {
    appTitle: 'UK Kommunikator',
    back: 'Zurück',
    categories: {
      basic: 'Grundbedürfnisse',
      emotions: 'Gefühle',
      activities: 'Aktivitäten',
      social: 'Soziales',
    },
    basicNeeds: {
      hungry: 'Ich bin hungrig',
      thirsty: 'Ich bin durstig',
      tired: 'Ich bin müde',
      bathroom: 'Ich muss auf die Toilette',
      help: 'Ich brauche Hilfe',
      break: 'Ich brauche eine Pause',
    },
    emotions: {
      happy: 'Ich fühle mich glücklich',
      sad: 'Ich fühle mich traurig',
      angry: 'Ich bin wütend',
      scared: 'Ich habe Angst',
      excited: 'Ich bin aufgeregt',
      calm: 'Ich fühle mich ruhig',
    },
    activities: {
      play: 'Ich möchte spielen',
      read: 'Ich möchte lesen',
      music: 'Ich möchte Musik',
      outside: 'Ich möchte nach draußen',
      tv: 'Ich möchte fernsehen',
      draw: 'Ich möchte malen',
    },
    social: {
      hello: 'Hallo',
      goodbye: 'Auf Wiedersehen',
      please: 'Bitte',
      thankyou: 'Danke',
      sorry: 'Entschuldigung',
      yes: 'Ja',
      no: 'Nein',
    },
  },
};
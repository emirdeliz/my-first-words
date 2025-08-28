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
  // Traduções por nível de aprendizado
  basicNeedsLevel1: {
    hungry: string;
    thirsty: string;
    tired: string;
    bathroom: string;
    help: string;
    break: string;
  };
  emotionsLevel1: {
    happy: string;
    sad: string;
    angry: string;
    scared: string;
    excited: string;
    calm: string;
  };
  activitiesLevel1: {
    play: string;
    read: string;
    music: string;
    outside: string;
    tv: string;
    draw: string;
  };
  socialLevel1: {
    hello: string;
    goodbye: string;
    please: string;
    thankyou: string;
    sorry: string;
    yes: string;
    no: string;
  };
  // Novas traduções para configurações
  settings: {
    title: string;
    language: {
      title: string;
      subtitle: string;
      current: string;
      code: string;
      changeButton: string;
    };
    learningLevel: {
      title: string;
      subtitle: string;
      current: string;
      active: string;
      features: string;
      changeButton: string;
      levels: {
        level1: string;
        level2: string;
        level3: string;
        level1Desc: string;
        level2Desc: string;
        level3Desc: string;
        level1Features: string[];
        level2Features: string[];
        level3Features: string[];
      };
    };
    audio: {
      title: string;
      subtitle: string;
      volumeButton: string;
    };
    about: {
      title: string;
      subtitle: string;
      version: string;
      developer: string;
      description: string;
    };
    modal: {
      selectLanguage: string;
      selectLevel: string;
      close: string;
      cancel: string;
    };
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
    // Traduções do nível 1 (palavras simples)
    basicNeedsLevel1: {
      hungry: 'Hungry',
      thirsty: 'Thirsty',
      tired: 'Tired',
      bathroom: 'Bathroom',
      help: 'Help',
      break: 'Break',
    },
    emotionsLevel1: {
      happy: 'Happy',
      sad: 'Sad',
      angry: 'Angry',
      scared: 'Scared',
      excited: 'Excited',
      calm: 'Calm',
    },
    activitiesLevel1: {
      play: 'Play',
      read: 'Read',
      music: 'Music',
      outside: 'Outside',
      tv: 'TV',
      draw: 'Draw',
    },
    socialLevel1: {
      hello: 'Hello',
      goodbye: 'Goodbye',
      please: 'Please',
      thankyou: 'Thanks',
      sorry: 'Sorry',
      yes: 'Yes',
      no: 'No',
    },
    settings: {
      title: 'Settings',
      language: {
        title: 'Language / Idioma',
        subtitle: 'Choose the interface language',
        current: 'Current Language',
        code: 'Code',
        changeButton: 'Change Language',
      },
      learningLevel: {
        title: 'Learning Level',
        subtitle: 'Choose the level that best fits your learning',
        current: 'Current Level',
        active: 'Active',
        features: 'Features of this level:',
        changeButton: 'Change Level',
        levels: {
          level1: 'Level 1',
          level2: 'Level 2',
          level3: 'Level 3',
          level1Desc: 'Basic Level - Words only',
          level2Desc: 'Intermediate Level - Words and simple phrases',
          level3Desc: 'Advanced Level - Words, phrases and complex sentences',
          level1Features: [
            'Individual word sounds',
            'Clear and slow pronunciation',
            'Focus on basic understanding'
          ],
          level2Features: [
            'Individual word sounds',
            'Simple phrases (2-3 words)',
            'Moderate speed',
            'Basic context'
          ],
          level3Features: [
            'Individual word sounds',
            'Complete and complex phrases',
            'Natural speed',
            'Rich and varied context',
            'Idiomatic expressions'
          ],
        },
      },
      audio: {
        title: 'Audio & Sound',
        subtitle: 'Audio settings and sound feedback',
        volumeButton: 'Configure Volume',
      },
      about: {
        title: 'About the App',
        subtitle: 'Application information and version',
        version: 'Version',
        developer: 'Developed by',
        description: 'Description',
      },
      modal: {
        selectLanguage: 'Select Language / Seleccionar Idioma',
        selectLevel: 'Learning Level',
        close: 'Close',
        cancel: 'Cancel',
      },
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
    // Traduções do nível 1 (palavras simples)
    basicNeedsLevel1: {
      hungry: 'Hambre',
      thirsty: 'Sed',
      tired: 'Cansado',
      bathroom: 'Baño',
      help: 'Ayuda',
      break: 'Descanso',
    },
    emotionsLevel1: {
      happy: 'Feliz',
      sad: 'Triste',
      angry: 'Enojado',
      scared: 'Miedo',
      excited: 'Emocionado',
      calm: 'Tranquilo',
    },
    activitiesLevel1: {
      play: 'Jugar',
      read: 'Leer',
      music: 'Música',
      outside: 'Afuera',
      tv: 'TV',
      draw: 'Dibujar',
    },
    socialLevel1: {
      hello: 'Hola',
      goodbye: 'Adiós',
      please: 'Por favor',
      thankyou: 'Gracias',
      sorry: 'Lo siento',
      yes: 'Sí',
      no: 'No',
    },
    settings: {
      title: 'Configuración',
      language: {
        title: 'Idioma / Language',
        subtitle: 'Elige el idioma de la interfaz',
        current: 'Idioma Actual',
        code: 'Código',
        changeButton: 'Cambiar Idioma',
      },
      learningLevel: {
        title: 'Nivel de Aprendizaje',
        subtitle: 'Elige el nivel que mejor se adapte a tu aprendizaje',
        current: 'Nivel Actual',
        active: 'Activo',
        features: 'Características de este nivel:',
        changeButton: 'Cambiar Nivel',
        levels: {
          level1: 'Nivel 1',
          level2: 'Nivel 2',
          level3: 'Nivel 3',
          level1Desc: 'Nivel Básico - Solo palabras',
          level2Desc: 'Nivel Intermedio - Palabras y frases simples',
          level3Desc: 'Nivel Avanzado - Palabras, frases y oraciones complejas',
          level1Features: [
            'Sonidos de palabras individuales',
            'Pronunciación clara y lenta',
            'Enfoque en comprensión básica'
          ],
          level2Features: [
            'Sonidos de palabras individuales',
            'Frases simples (2-3 palabras)',
            'Velocidad moderada',
            'Contexto básico'
          ],
          level3Features: [
            'Sonidos de palabras individuales',
            'Frases completas y complejas',
            'Velocidad natural',
            'Contexto rico y variado',
            'Expresiones idiomáticas'
          ],
        },
      },
      audio: {
        title: 'Audio y Sonido',
        subtitle: 'Configuración de audio y retroalimentación sonora',
        volumeButton: 'Configurar Volumen',
      },
      about: {
        title: 'Sobre la App',
        subtitle: 'Información de la aplicación y versión',
        version: 'Versión',
        developer: 'Desarrollado por',
        description: 'Descripción',
      },
      modal: {
        selectLanguage: 'Seleccionar Idioma / Select Language',
        selectLevel: 'Nivel de Aprendizaje',
        close: 'Cerrar',
        cancel: 'Cancelar',
      },
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
    // Traduções do nível 1 (palavras simples)
    basicNeedsLevel1: {
      hungry: 'Fome',
      thirsty: 'Sede',
      tired: 'Cansado',
      bathroom: 'Casa de banho',
      help: 'Ajuda',
      break: 'Pausa',
    },
    emotionsLevel1: {
      happy: 'Feliz',
      sad: 'Triste',
      angry: 'Zangado',
      scared: 'Medo',
      excited: 'Animado',
      calm: 'Calmo',
    },
    activitiesLevel1: {
      play: 'Brincar',
      read: 'Ler',
      music: 'Música',
      outside: 'Lá fora',
      tv: 'TV',
      draw: 'Desenhar',
    },
    socialLevel1: {
      hello: 'Olá',
      goodbye: 'Adeus',
      please: 'Por favor',
      thankyou: 'Obrigado',
      sorry: 'Desculpa',
      yes: 'Sim',
      no: 'Não',
    },
    settings: {
      title: 'Configurações',
      language: {
        title: 'Idioma / Language',
        subtitle: 'Escolha o idioma da interface',
        current: 'Idioma Atual',
        code: 'Código',
        changeButton: 'Alterar Idioma',
      },
      learningLevel: {
        title: 'Nível de Aprendizagem',
        subtitle: 'Escolha o nível que melhor se adapta à sua aprendizagem',
        current: 'Nível Atual',
        active: 'Ativo',
        features: 'Características deste nível:',
        changeButton: 'Alterar Nível',
        levels: {
          level1: 'Nível 1',
          level2: 'Nível 2',
          level3: 'Nível 3',
          level1Desc: 'Nível Básico - Apenas palavras',
          level2Desc: 'Nível Intermédio - Palavras e frases simples',
          level3Desc: 'Nível Avançado - Palavras, frases e frases complexas',
          level1Features: [
            'Sons de palavras individuais',
            'Pronúncia clara e lenta',
            'Foco na compreensão básica'
          ],
          level2Features: [
            'Sons de palavras individuais',
            'Frases simples (2-3 palavras)',
            'Velocidade moderada',
            'Contexto básico'
          ],
          level3Features: [
            'Sons de palavras individuais',
            'Frases completas e complexas',
            'Velocidade natural',
            'Contexto rico e variado',
            'Expressões idiomáticas'
          ],
        },
      },
      audio: {
        title: 'Áudio e Som',
        subtitle: 'Configurações de áudio e retroação sonora',
        volumeButton: 'Configurar Volume',
      },
      about: {
        title: 'Sobre a App',
        subtitle: 'Informações sobre a aplicação e versão',
        version: 'Versão',
        developer: 'Desenvolvido por',
        description: 'Descrição',
      },
      modal: {
        selectLanguage: 'Selecionar Idioma / Select Language',
        selectLevel: 'Nível de Aprendizagem',
        close: 'Fechar',
        cancel: 'Cancelar',
      },
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
    // Traduções do nível 1 (palavras simples)
    basicNeedsLevel1: {
      hungry: 'Fome',
      thirsty: 'Sede',
      tired: 'Cansado',
      bathroom: 'Banheiro',
      help: 'Ajuda',
      break: 'Pausa',
    },
    emotionsLevel1: {
      happy: 'Feliz',
      sad: 'Triste',
      angry: 'Bravo',
      scared: 'Medo',
      excited: 'Animado',
      calm: 'Calmo',
    },
    activitiesLevel1: {
      play: 'Brincar',
      read: 'Ler',
      music: 'Música',
      outside: 'Lá fora',
      tv: 'TV',
      draw: 'Desenhar',
    },
    socialLevel1: {
      hello: 'Oi',
      goodbye: 'Tchau',
      please: 'Por favor',
      thankyou: 'Obrigado',
      sorry: 'Desculpa',
      yes: 'Sim',
      no: 'Não',
    },
    settings: {
      title: 'Configurações',
      language: {
        title: 'Idioma / Language',
        subtitle: 'Escolha o idioma da interface',
        current: 'Idioma Atual',
        code: 'Código',
        changeButton: 'Alterar Idioma',
      },
      learningLevel: {
        title: 'Nível de Aprendizagem',
        subtitle: 'Escolha o nível que melhor se adapta à sua aprendizagem',
        current: 'Nível Atual',
        active: 'Ativo',
        features: 'Características deste nível:',
        changeButton: 'Alterar Nível',
        levels: {
          level1: 'Nível 1',
          level2: 'Nível 2',
          level3: 'Nível 3',
          level1Desc: 'Nível Básico - Apenas palavras',
          level2Desc: 'Nível Intermediário - Palavras e frases simples',
          level3Desc: 'Nível Avançado - Palavras, frases e frases complexas',
          level1Features: [
            'Sons de palavras individuais',
            'Pronúncia clara e lenta',
            'Foco na compreensão básica'
          ],
          level2Features: [
            'Sons de palavras individuais',
            'Frases simples (2-3 palavras)',
            'Velocidade moderada',
            'Contexto básico'
          ],
          level3Features: [
            'Sons de palavras individuais',
            'Frases completas e complexas',
            'Velocidade natural',
            'Contexto rico e variado',
            'Expressões idiomáticas'
          ],
        },
      },
      audio: {
        title: 'Áudio e Som',
        subtitle: 'Configurações de áudio e feedback sonoro',
        volumeButton: 'Configurar Volume',
      },
      about: {
        title: 'Sobre o App',
        subtitle: 'Informações sobre a aplicação e versão',
        version: 'Versão',
        developer: 'Desenvolvido por',
        description: 'Descrição',
      },
      modal: {
        selectLanguage: 'Selecionar Idioma / Select Language',
        selectLevel: 'Nível de Aprendizagem',
        close: 'Fechar',
        cancel: 'Cancelar',
      },
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
    // Traduções do nível 1 (palavras simples)
    basicNeedsLevel1: {
      hungry: 'Hunger',
      thirsty: 'Durst',
      tired: 'Müde',
      bathroom: 'Toilette',
      help: 'Hilfe',
      break: 'Pause',
    },
    emotionsLevel1: {
      happy: 'Glücklich',
      sad: 'Traurig',
      angry: 'Wütend',
      scared: 'Angst',
      excited: 'Aufgeregt',
      calm: 'Ruhig',
    },
    activitiesLevel1: {
      play: 'Spielen',
      read: 'Lesen',
      music: 'Musik',
      outside: 'Draußen',
      tv: 'TV',
      draw: 'Malen',
    },
    socialLevel1: {
      hello: 'Hallo',
      goodbye: 'Auf Wiedersehen',
      please: 'Bitte',
      thankyou: 'Danke',
      sorry: 'Entschuldigung',
      yes: 'Ja',
      no: 'Nein',
    },
    settings: {
      title: 'Einstellungen',
      language: {
        title: 'Sprache / Language',
        subtitle: 'Wählen Sie die Interface-Sprache',
        current: 'Aktuelle Sprache',
        code: 'Code',
        changeButton: 'Sprache ändern',
      },
      learningLevel: {
        title: 'Lernniveau',
        subtitle: 'Wählen Sie das Niveau, das am besten zu Ihrem Lernen passt',
        current: 'Aktuelles Niveau',
        active: 'Aktiv',
        features: 'Merkmale dieses Niveaus:',
        changeButton: 'Niveau ändern',
        levels: {
          level1: 'Niveau 1',
          level2: 'Niveau 2',
          level3: 'Niveau 3',
          level1Desc: 'Grundniveau - Nur Wörter',
          level2Desc: 'Mittleres Niveau - Wörter und einfache Sätze',
          level3Desc: 'Fortgeschrittenes Niveau - Wörter, Sätze und komplexe Sätze',
          level1Features: [
            'Einzelne Wortlaute',
            'Klare und langsame Aussprache',
            'Fokus auf grundlegendes Verständnis'
          ],
          level2Features: [
            'Einzelne Wortlaute',
            'Einfache Sätze (2-3 Wörter)',
            'Moderate Geschwindigkeit',
            'Grundlegender Kontext'
          ],
          level3Features: [
            'Einzelne Wortlaute',
            'Vollständige und komplexe Sätze',
            'Natürliche Geschwindigkeit',
            'Reicher und vielfältiger Kontext',
            'Redewendungen'
          ],
        },
      },
      audio: {
        title: 'Audio & Ton',
        subtitle: 'Audioeinstellungen und Ton-Feedback',
        volumeButton: 'Lautstärke konfigurieren',
      },
      about: {
        title: 'Über die App',
        subtitle: 'Anwendungsinformationen und Version',
        version: 'Version',
        developer: 'Entwickelt von',
        description: 'Beschreibung',
      },
      modal: {
        selectLanguage: 'Sprache auswählen / Select Language',
        selectLevel: 'Lernniveau',
        close: 'Schließen',
        cancel: 'Abbrechen',
      },
    },
  },
};
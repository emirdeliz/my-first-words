import { Platform } from 'react-native';

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
  // Learning level translations
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
  // Parental configuration translations
  parentalConfig: {
    noAudioConfigured: string;
    goToSettings: string;
    title: string;
    instructions: {
      title: string;
      subtitle: string;
    };
    actions: {
      enableAll: string;
      disableAll: string;
      close: string;
    };
    items: {
      enabled: string;
      category: string;
    };
  };
  // New translations for settings
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
      scared: 'I am scared',
      excited: 'I am excited',
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
    // Level 1 translations (simple words)
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
      thankyou: 'Thank you',
      sorry: 'Sorry',
      yes: 'Yes',
      no: 'No',
    },
    parentalConfig: {
      noAudioConfigured: 'No Audio Configured',
      goToSettings: 'Go to Settings - Parental Configuration to activate some audios.',
      title: 'Parental Configuration',
      instructions: {
        title: 'Configure Available Audio Items',
        subtitle: 'Select which audio items your child can access. Only enabled items will appear in the main app.',
      },
      actions: {
        enableAll: 'Enable All',
        disableAll: 'Disable All',
        close: 'Close',
      },
      items: {
        enabled: 'items enabled',
        category: 'Category',
      },
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
            'Single word sounds',
            'Clear and slow pronunciation',
            'Focus on basic understanding'
          ],
          level2Features: [
            'Single word sounds',
            'Simple phrases (2-3 words)',
            'Moderate speed',
            'Basic context'
          ],
          level3Features: [
            'Single word sounds',
            'Complete and complex sentences',
            'Natural speed',
            'Rich and diverse context',
            'Idioms'
          ],
        },
      },
      audio: {
        title: 'Audio & Sound',
        subtitle: 'Audio settings and sound feedback',
        volumeButton: 'Configure volume',
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
    // Level 1 translations (simple words)
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
    parentalConfig: {
      noAudioConfigured: 'Nenhum Áudio Configurado',
      goToSettings: 'Vá para Configurações - Configuração Parental para ativar alguns áudios.',
      title: 'Configuração Parental',
      instructions: {
        title: 'Configurar Itens de Áudio Disponíveis',
        subtitle: 'Selecione quais itens de áudio seu filho pode acessar. Apenas os itens ativados aparecerão no app principal.',
      },
      actions: {
        enableAll: 'Ativar Todos',
        disableAll: 'Desativar Todos',
        close: 'Fechar',
      },
      items: {
        enabled: 'itens ativados',
        category: 'Categoria',
      },
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
            'Contexto rico e diversificado',
            'Expressões idiomáticas'
          ],
        },
      },
      audio: {
        title: 'Áudio & Som',
        subtitle: 'Configurações de áudio e feedback sonoro',
        volumeButton: 'Configurar volume',
      },
      about: {
        title: 'Sobre o App',
        subtitle: 'Informações da aplicação e versão',
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
};
const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '..', 'locales');

const remainingTranslations = {
  "it": {
    "page": {
      "title": "Assistente di risposta AI per venditori online",
      "description": "Risposte AI ai messaggi degli acquirenti per Etsy, eBay, Shopify, ecc. Estensione Chrome gratuita."
    },
    "hero": {
      "eyebrow": "ESTENSIONE CHROME",
      "title": "Rispondi ai messaggi degli acquirenti in pochi secondi.",
      "subtitle": "SellerDesk AI aiuta i venditori online a rispondere più velocemente con risposte generate dall'IA, direttamente nel browser.",
      "buttonPrimary": "Aggiungi a Chrome — Gratis",
      "buttonSecondary": "Scopri come funziona ↓",
      "disclaimer": "🔒 Funziona sul dispositivo — le tue conversazioni rimangono locali"
    },
    "howItWorks": {
      "sectionTitle": "Come funziona",
      "step1": {
        "title": "1. Salva le politiche del negozio",
        "description": "Memorizza i dettagli del tuo negozio e le risposte frequenti nel tuo profilo."
      },
      "step2": {
        "title": "2. Apri i messaggi",
        "description": "Funziona direttamente in Etsy, eBay, Facebook Marketplace, Shopify e nella tua casella di posta."
      },
      "step3": {
        "title": "3. L'IA redige la risposta",
        "description": "SellerDesk legge la domanda e le tue politiche per redigere istantaneamente una risposta professionale."
      }
    },
    "features": {
      "sectionTitle": "Funzionalità",
      "feature1": {
        "title": "Funziona dove vendi",
        "description": "Compatibile con Etsy, eBay, Facebook Marketplace, Shopify, Mercari, Gmail, Outlook."
      },
      "feature2": {
        "title": "Risparmia tempo sulle domande ripetitive",
        "description": "Riutilizza le risposte salvate per spedizioni, resi, disponibilità, ecc."
      },
      "feature3": {
        "title": "Mantieni un tono coerente",
        "description": "Scegli come vuoi sembrare: amichevole, professionale, utile o deciso."
      },
      "feature4": {
        "title": "Design orientato alla privacy",
        "description": "Nessun server SellerDesk elabora le tue conversazioni. Supporta l'IA sul dispositivo."
      }
    },
    "pricing": {
      "sectionTitle": "Prezzi semplici.",
      "free": {
        "title": "Gratis",
        "price": "0 €",
        "features": {
          "f1": "5 risposte AI al giorno",
          "f2": "5 modelli salvati",
          "f3": "1 profilo venditore",
          "f4": "Funziona su tutte le piattaforme",
          "f5": "Nessun account richiesto",
          "f6": "IA Chrome sul dispositivo"
        },
        "button": "Aggiungi a Chrome"
      },
      "proMonthly": {
        "title": "Pro (Mensile)",
        "price": "9,99 $/mese",
        "features": {
          "f1": "Risposte AI illimitate",
          "f2": "Modelli illimitati",
          "f3": "Profili negozio multipli",
          "f4": "Toni di risposta avanzati",
          "f5": "Strumenti di ottimizzazione",
          "f6": "Approfondimenti di mercato",
          "f7": "Strumenti di importazione/esportazione",
          "f8": "Supporto prioritario"
        },
        "button": "Abbonati mensilmente"
      },
      "proLifetime": {
        "title": "Pro (A vita)",
        "price": "149 $",
        "tagline": "Paga una volta, usa per sempre",
        "features": {
          "f1": "Tutto in Pro Mensile",
          "f2": "Nessun costo ricorrente",
          "f3": "Aggiornamenti futuri inclusi",
          "f4": "Prezzo per i primi utenti"
        },
        "button": "Pass a vita"
      }
    },
    "faq": {
      "sectionTitle": "Domande Frequenti",
      "q1": {
        "question": "I dati dei miei clienti sono al sicuro?",
        "answer": "Sì. Tutti i profili sono archiviati localmente. Nessun dato viene archiviato sui server di Donbrico."
      },
      "q2": {
        "question": "Supporta il mio marketplace specifico?",
        "answer": "Sì. Funziona con Etsy, eBay, Facebook Marketplace, Shopify, ecc."
      },
      "q3": {
        "question": "Come funziona 'Porta la tua chiave' (BYOK)?",
        "answer": "Puoi collegare la tua chiave API di OpenAI, Anthropic, ecc. nelle impostazioni."
      },
      "moreQuestions": "Hai altre domande?",
      "viewFullLink": "Leggi le nostre FAQ complete →"
    }
  },
  "hi": {
    "page": {
      "title": "ऑनलाइन विक्रेताओं के लिए AI उत्तर सहायक",
      "description": "Etsy, eBay, Shopify आदि के लिए AI-संचालित उत्तर। निःशुल्क क्रोम एक्सटेंशन।"
    },
    "hero": {
      "eyebrow": "क्रोम एक्सटेंशन",
      "title": "सेकंडों में खरीदार के संदेशों का उत्तर दें।",
      "subtitle": "SellerDesk AI ऑनलाइन विक्रेताओं को सीधे आपके ब्राउज़र में AI-जनरेटेड उत्तरों के साथ तेज़ी से जवाब देने में मदद करता है।",
      "buttonPrimary": "Chrome में जोड़ें — निःशुल्क",
      "buttonSecondary": "देखें यह कैसे काम करता है ↓",
      "disclaimer": "🔒 आपके डिवाइस पर काम करता है — आपकी बातचीत स्थानीय रहती है"
    },
    "howItWorks": {
      "sectionTitle": "यह कैसे काम करता है",
      "step1": {
        "title": "1. स्टोर नीतियां सहेजें",
        "description": "अपने स्टोर विवरण और वापसी नीतियों को एक बार सहेजें।"
      },
      "step2": {
        "title": "2. संदेश खोलें",
        "description": "Etsy, eBay, Shopify और आपके इनबॉक्स में सीधे काम करता है।"
      },
      "step3": {
        "title": "3. AI उत्तर का प्रारूप तैयार करता है",
        "description": "SellerDesk खरीदार के प्रश्न को पढ़ता है और तुरंत पेशेवर उत्तर तैयार करता है।"
      }
    },
    "features": {
      "sectionTitle": "विशेषताएं",
      "feature1": {
        "title": "जहां आप बेचते हैं वहां काम करता है",
        "description": "Etsy, eBay, Facebook Marketplace, Shopify, Gmail आदि के साथ संगत।"
      },
      "feature2": {
        "title": "बार-बार पूछे जाने वाले सवालों पर समय बचाएं",
        "description": "शिपिंग, रिटर्न आदि के लिए सहेजे गए उत्तरों का पुन: उपयोग करें।"
      },
      "feature3": {
        "title": "अपना लहजा सुसंगत रखें",
        "description": "चुनें कि आप कैसे दिखना चाहते हैं: मैत्रीपूर्ण, पेशेवर, मददगार।"
      },
      "feature4": {
        "title": "गोपनीयता-प्रथम डिज़ाइन",
        "description": "कोई भी SellerDesk सर्वर आपकी बातचीत को संसाधित नहीं करता है।"
      }
    },
    "pricing": {
      "sectionTitle": "सरल मूल्य निर्धारण।",
      "free": {
        "title": "निःशुल्क",
        "price": "$0",
        "features": {
          "f1": "प्रति दिन 5 AI उत्तर",
          "f2": "5 सहेजे गए टेम्प्लेट",
          "f3": "1 विक्रेता प्रोफ़ाइल",
          "f4": "सभी समर्थित प्लेटफ़ॉर्म पर काम करता है",
          "f5": "किसी खाते की आवश्यकता नहीं",
          "f6": "ऑन-डिवाइस क्रोम AI"
        },
        "button": "Chrome में जोड़ें"
      },
      "proMonthly": {
        "title": "प्रो (मासिक)",
        "price": "$9.99/माह",
        "features": {
          "f1": "असीमित AI उत्तर",
          "f2": "असीमित सहेजे गए टेम्प्लेट",
          "f3": "कई विक्रेता प्रोफाइल",
          "f4": "उन्नत उत्तर लहजे",
          "f5": "सूची अनुकूलन उपकरण",
          "f6": "बाजार अंतर्दृष्टि",
          "f7": "आयात/निर्यात उपकरण",
          "f8": "प्राथमिकता समर्थन"
        },
        "button": "मासिक सदस्यता लें"
      },
      "proLifetime": {
        "title": "प्रो (आजीवन)",
        "price": "$149",
        "tagline": "एक बार भुगतान करें, हमेशा उपयोग करें",
        "features": {
          "f1": "प्रो मासिक में सब कुछ",
          "f2": "कोई आवर्ती शुल्क नहीं",
          "f3": "भविष्य के अपडेट शामिल",
          "f4": "प्रारंभिक उपयोगकर्ता मूल्य निर्धारण"
        },
        "button": "आजीवन पास"
      }
    },
    "faq": {
      "sectionTitle": "अक्सर पूछे जाने वाले प्रश्न",
      "q1": {
        "question": "क्या मेरे ग्राहक का डेटा सुरक्षित है?",
        "answer": "हाँ। सभी प्रोफ़ाइल स्थानीय रूप से संग्रहीत हैं। Donbrico सर्वर पर कुछ भी संग्रहीत नहीं है।"
      },
      "q2": {
        "question": "क्या यह मेरे बाज़ार का समर्थन करता है?",
        "answer": "हाँ। यह Etsy, eBay, Shopify आदि के साथ काम करता है।"
      },
      "q3": {
        "question": "BYOK कैसे काम करता है?",
        "answer": "आप सेटिंग्स में OpenAI, Anthropic आदि की अपनी API कुंजी कनेक्ट कर सकते हैं।"
      },
      "moreQuestions": "क्या आपके और प्रश्न हैं?",
      "viewFullLink": "हमारे पूर्ण FAQ पढ़ें →"
    }
  },
  "ru": {
    "page": {
      "title": "ИИ-помощник для онлайн-продавцов",
      "description": "ИИ-ответы на сообщения покупателей для Etsy, eBay, Shopify. Бесплатное расширение Chrome."
    },
    "hero": {
      "eyebrow": "РАСШИРЕНИЕ CHROME",
      "title": "Отвечайте покупателям за секунды.",
      "subtitle": "SellerDesk AI помогает онлайн-продавцам быстрее отвечать на вопросы с помощью ИИ прямо в браузере.",
      "buttonPrimary": "Добавить в Chrome — Бесплатно",
      "buttonSecondary": "Как это работает ↓",
      "disclaimer": "🔒 Работает на устройстве — ваши диалоги остаются локальными"
    },
    "howItWorks": {
      "sectionTitle": "Как это работает",
      "step1": {
        "title": "1. Сохраните правила магазина",
        "description": "Один раз сохраните данные вашего магазина и политику возврата."
      },
      "step2": {
        "title": "2. Откройте сообщения",
        "description": "Работает прямо в Etsy, eBay, Facebook Marketplace, Shopify и почте."
      },
      "step3": {
        "title": "3. ИИ пишет ответ",
        "description": "SellerDesk мгновенно пишет профессиональный ответ на основе ваших правил."
      }
    },
    "features": {
      "sectionTitle": "Особенности",
      "feature1": {
        "title": "Работает там, где вы продаете",
        "description": "Совместимо с Etsy, eBay, Facebook Marketplace, Shopify, Gmail и др."
      },
      "feature2": {
        "title": "Экономьте время на вопросах",
        "description": "Используйте шаблоны для доставки, возвратов и т. д."
      },
      "feature3": {
        "title": "Соблюдайте единый тон",
        "description": "Выберите тон: дружелюбный, профессиональный, строгий."
      },
      "feature4": {
        "title": "Конфиденциальность",
        "description": "Наши серверы не обрабатывают ваши сообщения."
      }
    },
    "pricing": {
      "sectionTitle": "Простые цены.",
      "free": {
        "title": "Бесплатно",
        "price": "$0",
        "features": {
          "f1": "5 ИИ-ответов в день",
          "f2": "5 сохраненных шаблонов",
          "f3": "1 профиль продавца",
          "f4": "Работает на всех платформах",
          "f5": "Аккаунт не требуется",
          "f6": "Локальный ИИ Chrome"
        },
        "button": "Добавить в Chrome"
      },
      "proMonthly": {
        "title": "Pro (Ежемесячно)",
        "price": "$9.99/мес",
        "features": {
          "f1": "Безлимитные ИИ-ответы",
          "f2": "Безлимитные шаблоны",
          "f3": "Несколько профилей магазина",
          "f4": "Продвинутые тональности",
          "f5": "Инструменты оптимизации",
          "f6": "Аналитика маркетплейсов",
          "f7": "Инструменты импорта/экспорта",
          "f8": "Приоритетная поддержка"
        },
        "button": "Подписаться"
      },
      "proLifetime": {
        "title": "Pro (Навсегда)",
        "price": "$149",
        "tagline": "Заплати один раз, пользуйся всегда",
        "features": {
          "f1": "Все из Pro Monthly",
          "f2": "Никаких регулярных платежей",
          "f3": "Включает будущие обновления",
          "f4": "Цена для ранних пользователей"
        },
        "button": "Пожизненный доступ"
      }
    },
    "faq": {
      "sectionTitle": "Часто задаваемые вопросы",
      "q1": {
        "question": "Безопасны ли данные моих клиентов?",
        "answer": "Да. Все профили хранятся локально. На серверах Donbrico ничего не сохраняется."
      },
      "q2": {
        "question": "Поддерживается ли мой маркетплейс?",
        "answer": "Да. Работает с Etsy, eBay, Shopify и др."
      },
      "q3": {
        "question": "Как работает свой ключ (BYOK)?",
        "answer": "Вы можете подключить свой API-ключ от OpenAI, Anthropic и др."
      },
      "moreQuestions": "Остались вопросы?",
      "viewFullLink": "Читайте полный FAQ →"
    }
  },
  "ko": {
    "page": {
      "title": "온라인 판매자를 위한 AI 답변 어시스턴트",
      "description": "Etsy, eBay, Shopify 등을 위한 AI 답변. 무료 Chrome 확장 프로그램."
    },
    "hero": {
      "eyebrow": "CHROME 확장 프로그램",
      "title": "몇 초 만에 구매자의 메시지에 답변하세요.",
      "subtitle": "SellerDesk AI는 브라우저 내에서 전문적인 AI 답변을 생성하여 더 빠르게 응답할 수 있도록 돕습니다.",
      "buttonPrimary": "Chrome에 추가 — 무료",
      "buttonSecondary": "작동 방식 보기 ↓",
      "disclaimer": "🔒 기기 내에서 작동 — 대화 내용은 로컬에 유지됩니다"
    },
    "howItWorks": {
      "sectionTitle": "작동 방식",
      "step1": {
        "title": "1. 스토어 정책 저장",
        "description": "상점 세부 정보 및 반품 정책을 한 번 저장하세요."
      },
      "step2": {
        "title": "2. 메시지 열기",
        "description": "Etsy, eBay, Shopify 및 받은 편지함에서 직접 작동합니다."
      },
      "step3": {
        "title": "3. AI가 답변 초안 작성",
        "description": "SellerDesk는 질문과 스토어 정책을 읽고 전문적인 답변을 즉시 작성합니다."
      }
    },
    "features": {
      "sectionTitle": "기능",
      "feature1": {
        "title": "판매하는 곳에서 작동합니다",
        "description": "Etsy, eBay, Shopify, Gmail 등과 호환됩니다."
      },
      "feature2": {
        "title": "반복적인 질문에 시간을 절약하세요",
        "description": "배송, 반품 등을 위해 저장된 템플릿을 재사용하세요."
      },
      "feature3": {
        "title": "일관된 어조 유지",
        "description": "친근한, 전문적인, 단호한 어조 중에서 선택하세요."
      },
      "feature4": {
        "title": "개인 정보 보호 설계",
        "description": "SellerDesk 서버는 귀하의 대화를 처리하지 않습니다."
      }
    },
    "pricing": {
      "sectionTitle": "간단한 가격 책정.",
      "free": {
        "title": "무료",
        "price": "$0",
        "features": {
          "f1": "하루 5회 AI 답변",
          "f2": "저장된 템플릿 5개",
          "f3": "판매자 프로필 1개",
          "f4": "모든 플랫폼에서 작동",
          "f5": "계정 불필요",
          "f6": "온디바이스 Chrome AI"
        },
        "button": "Chrome에 추가"
      },
      "proMonthly": {
        "title": "Pro (월간)",
        "price": "$9.99/월",
        "features": {
          "f1": "무제한 AI 답변",
          "f2": "무제한 저장된 템플릿",
          "f3": "여러 스토어 프로필",
          "f4": "고급 답변 어조",
          "f5": "리스팅 최적화 도구",
          "f6": "마켓플레이스 인사이트",
          "f7": "가져오기/내보내기 도구",
          "f8": "우선 지원"
        },
        "button": "월간 구독"
      },
      "proLifetime": {
        "title": "Pro (평생)",
        "price": "$149",
        "tagline": "한 번 결제하고 영구 사용",
        "features": {
          "f1": "Pro 월간의 모든 기능",
          "f2": "반복되는 수수료 없음",
          "f3": "향후 업데이트 포함",
          "f4": "초기 사용자 가격"
        },
        "button": "평생 패스"
      }
    },
    "faq": {
      "sectionTitle": "자주 묻는 질문",
      "q1": {
        "question": "고객 데이터는 안전합니까?",
        "answer": "예. 모든 프로필은 로컬에 저장됩니다. Donbrico 서버에는 아무것도 저장되지 않습니다."
      },
      "q2": {
        "question": "내 특정 마켓플레이스를 지원합니까?",
        "answer": "예. Etsy, eBay, Shopify 등에서 작동합니다."
      },
      "q3": {
        "question": "BYOK는 어떻게 작동합니까?",
        "answer": "설정에서 OpenAI, Anthropic 등의 자체 API 키를 연결할 수 있습니다."
      },
      "moreQuestions": "더 궁금한 점이 있으신가요?",
      "viewFullLink": "전체 FAQ 읽기 →"
    }
  }
};

const files = fs.readdirSync(localesDir);
files.forEach(file => {
  if (file.endsWith('.json')) {
    const localePath = path.join(localesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));
      const lang = file.replace('.json', '');
      
      let trans = remainingTranslations[lang];
      
      if (trans) {
        data.sellerDesk = trans;
        fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated sellerDesk page translation for ' + lang);
      }
    } catch (e) {
      console.error('Error on ' + file);
    }
  }
});

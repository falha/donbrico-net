const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '..', 'locales');

const pageTranslations = {
  "es": {
    "page": {
      "title": "Asistente de respuestas con IA para vendedores online — Respuestas más rápidas",
      "description": "Respuestas a mensajes de compradores con IA para Etsy, eBay, Facebook Marketplace, Shopify y más. Extensión de Chrome gratuita."
    },
    "hero": {
      "eyebrow": "EXTENSIÓN DE CHROME",
      "title": "Responde mensajes de compradores en segundos.",
      "subtitle": "SellerDesk AI ayuda a los vendedores online a responder preguntas más rápido con IA, generando respuestas profesionales y personales directamente en tu navegador.",
      "buttonPrimary": "Añadir a Chrome — Gratis",
      "buttonSecondary": "Ver cómo funciona ↓",
      "disclaimer": "🔒 Funciona en tu dispositivo — tus conversaciones con los compradores se mantienen locales"
    },
    "howItWorks": {
      "sectionTitle": "Cómo funciona",
      "step1": {
        "title": "1. Guarda las políticas de la tienda",
        "description": "Almacena los detalles de tu tienda, políticas de devolución y respuestas frecuentes una sola vez en tu perfil de vendedor."
      },
      "step2": {
        "title": "2. Abre los mensajes de los compradores",
        "description": "Funciona directamente dentro de Etsy, eBay, Facebook Marketplace, Shopify y tu bandeja de entrada de correo electrónico."
      },
      "step3": {
        "title": "3. La IA redacta la respuesta",
        "description": "SellerDesk lee la pregunta del comprador y las políticas de tu tienda para redactar una respuesta profesional al instante."
      }
    },
    "features": {
      "sectionTitle": "Características",
      "feature1": {
        "title": "Funciona donde vendes",
        "description": "Compatible con Etsy, eBay, Facebook Marketplace, Shopify, Mercari, Poshmark, Gmail, Outlook y Yahoo Mail."
      },
      "feature2": {
        "title": "Ahorra tiempo en preguntas repetitivas",
        "description": "Reutiliza respuestas guardadas para envíos, ofertas, devoluciones, disponibilidad, recogida, paquetes y más."
      },
      "feature3": {
        "title": "Mantén un tono consistente",
        "description": "Elige cómo quieres sonar: amigable, profesional, servicial o firme."
      },
      "feature4": {
        "title": "Diseño centrado en la privacidad",
        "description": "Ningún servidor de SellerDesk procesa tus conversaciones. Soporta IA en el dispositivo con Gemini Nano y proveedores de IA opcionales BYOK."
      }
    },
    "pricing": {
      "sectionTitle": "Precios simples. Sin comisiones ocultas.",
      "free": {
        "title": "Gratis",
        "price": "$0",
        "features": {
          "f1": "5 respuestas de IA por día",
          "f2": "5 respuestas/plantillas guardadas",
          "f3": "1 perfil de vendedor",
          "f4": "Funciona en todas las plataformas compatibles",
          "f5": "No requiere cuenta",
          "f6": "IA en el dispositivo de Chrome"
        },
        "button": "Añadir a Chrome"
      },
      "proMonthly": {
        "title": "Pro (Mensual)",
        "price": "$9.99/mes",
        "features": {
          "f1": "Respuestas de IA ilimitadas",
          "f2": "Plantillas guardadas ilimitadas",
          "f3": "Múltiples perfiles de vendedor/tienda",
          "f4": "Tonos de respuesta avanzados",
          "f5": "Herramientas de optimización de listados",
          "f6": "Insights del mercado",
          "f7": "Herramientas de importación/exportación",
          "f8": "Soporte prioritario"
        },
        "button": "Suscribirse mensualmente"
      },
      "proLifetime": {
        "title": "Pro (De por vida)",
        "price": "$149",
        "tagline": "Paga una vez, úsalo para siempre",
        "features": {
          "f1": "Todo lo incluido en Pro Mensual",
          "f2": "Sin cuotas recurrentes",
          "f3": "Actualizaciones futuras incluidas",
          "f4": "Precio especial para primeros usuarios"
        },
        "button": "Pase de por vida"
      }
    },
    "faq": {
      "sectionTitle": "Preguntas Frecuentes",
      "q1": {
        "question": "¿Están seguros los datos de mis clientes con SellerDesk AI?",
        "answer": "Sí. Todos los detalles guardados y perfiles de negocios se almacenan en el almacenamiento local de Chrome en tu dispositivo. La extensión envía notas directamente a tu proveedor de IA elegido (o se ejecuta en el dispositivo a través de Gemini Nano). Nada se almacena en los servidores de Donbrico."
      },
      "q2": {
        "question": "¿Es compatible con mi mercado específico?",
        "answer": "Sí. SellerDesk AI está creado para funcionar perfectamente con Etsy, eBay, Facebook Marketplace, Shopify, Mercari, Poshmark, así como con proveedores de correo electrónico habituales como Gmail, Outlook y Yahoo Mail."
      },
      "q3": {
        "question": "¿Cómo funciona 'Trae tu propia clave' (BYOK)?",
        "answer": "Puedes conectar tu propia clave API de OpenAI, Anthropic, Groq u OpenRouter en la configuración. Esto te proporciona una generación de IA ultrarrápida e ilimitada y garantiza que tengas respuestas de la mejor calidad para tus clientes."
      },
      "moreQuestions": "¿Tienes más preguntas?",
      "viewFullLink": "Lee nuestras preguntas frecuentes completas →"
    }
  },
  "fr": {
    "page": {
      "title": "Assistant de réponse IA pour les vendeurs en ligne",
      "description": "Réponses générées par l'IA pour Etsy, eBay, Facebook Marketplace, Shopify, etc. Extension Chrome gratuite."
    },
    "hero": {
      "eyebrow": "EXTENSION CHROME",
      "title": "Répondez aux messages de vos acheteurs en quelques secondes.",
      "subtitle": "SellerDesk AI aide les vendeurs en ligne à répondre plus rapidement aux questions avec des réponses professionnelles et personnelles — directement dans le navigateur.",
      "buttonPrimary": "Ajouter à Chrome — Gratuit",
      "buttonSecondary": "Voir comment ça marche ↓",
      "disclaimer": "🔒 Fonctionne sur l'appareil — vos conversations restent locales"
    },
    "howItWorks": {
      "sectionTitle": "Comment ça marche",
      "step1": {
        "title": "1. Enregistrez vos politiques",
        "description": "Stockez les détails de votre boutique, les politiques de retour et les réponses fréquentes."
      },
      "step2": {
        "title": "2. Ouvrez les messages",
        "description": "Fonctionne directement dans Etsy, eBay, Facebook Marketplace, Shopify et votre boîte mail."
      },
      "step3": {
        "title": "3. L'IA rédige la réponse",
        "description": "SellerDesk lit la question et vos politiques pour rédiger instantanément une réponse professionnelle."
      }
    },
    "features": {
      "sectionTitle": "Fonctionnalités",
      "feature1": {
        "title": "Fonctionne où vous vendez",
        "description": "Compatible avec Etsy, eBay, Facebook Marketplace, Shopify, Mercari, Poshmark, Gmail, Outlook et Yahoo Mail."
      },
      "feature2": {
        "title": "Gagnez du temps sur les questions répétitives",
        "description": "Réutilisez les réponses enregistrées pour l'expédition, les offres, les retours, la disponibilité, etc."
      },
      "feature3": {
        "title": "Gardez un ton cohérent",
        "description": "Choisissez comment vous voulez sonner : amical, professionnel, serviable ou ferme."
      },
      "feature4": {
        "title": "Conception axée sur la confidentialité",
        "description": "Aucun serveur SellerDesk ne traite vos conversations. Prend en charge l'IA sur l'appareil (Gemini Nano) ou BYOK."
      }
    },
    "pricing": {
      "sectionTitle": "Tarification simple.",
      "free": {
        "title": "Gratuit",
        "price": "0 $",
        "features": {
          "f1": "5 réponses IA par jour",
          "f2": "5 modèles enregistrés",
          "f3": "1 profil de vendeur",
          "f4": "Fonctionne sur toutes les plateformes",
          "f5": "Aucun compte requis",
          "f6": "IA Chrome sur l'appareil"
        },
        "button": "Ajouter à Chrome"
      },
      "proMonthly": {
        "title": "Pro (Mensuel)",
        "price": "9,99 $/mois",
        "features": {
          "f1": "Réponses IA illimitées",
          "f2": "Modèles enregistrés illimités",
          "f3": "Plusieurs profils de vendeur",
          "f4": "Tons de réponse avancés",
          "f5": "Outils d'optimisation",
          "f6": "Aperçus du marché",
          "f7": "Outils d'importation/exportation",
          "f8": "Support prioritaire"
        },
        "button": "S'abonner mensuellement"
      },
      "proLifetime": {
        "title": "Pro (À vie)",
        "price": "149 $",
        "tagline": "Payez une fois, utilisez pour toujours",
        "features": {
          "f1": "Tout dans Pro Mensuel",
          "f2": "Pas de frais récurrents",
          "f3": "Mises à jour futures incluses",
          "f4": "Tarification pour les premiers adoptants"
        },
        "button": "Pass à vie"
      }
    },
    "faq": {
      "sectionTitle": "Questions Fréquentes",
      "q1": {
        "question": "Mes données sont-elles en sécurité ?",
        "answer": "Oui. Tous les profils sont stockés localement. Rien n'est stocké sur les serveurs de Donbrico."
      },
      "q2": {
        "question": "Cela prend-il en charge mon marché spécifique ?",
        "answer": "Oui. SellerDesk AI est conçu pour fonctionner avec Etsy, eBay, Facebook Marketplace, Shopify, etc."
      },
      "q3": {
        "question": "Comment fonctionne 'Apportez votre propre clé' (BYOK) ?",
        "answer": "Vous pouvez connecter votre propre clé API d'OpenAI, Anthropic, etc. dans les paramètres."
      },
      "moreQuestions": "Vous avez d'autres questions ?",
      "viewFullLink": "Lisez notre FAQ complète →"
    }
  },
  "de": {
    "page": {
      "title": "KI-Antwortassistent für Online-Verkäufer",
      "description": "KI-gestützte Antworten auf Käufernachrichten für Etsy, eBay, Facebook Marketplace, Shopify. Kostenlose Erweiterung."
    },
    "hero": {
      "eyebrow": "CHROME-ERWEITERUNG",
      "title": "Beantworten Sie Käufernachrichten in Sekunden.",
      "subtitle": "SellerDesk AI hilft Online-Verkäufern, schneller mit KI-generierten, professionellen Antworten zu reagieren.",
      "buttonPrimary": "Zu Chrome hinzufügen — Kostenlos",
      "buttonSecondary": "So funktioniert es ↓",
      "disclaimer": "🔒 Funktioniert auf dem Gerät — Ihre Gespräche bleiben lokal"
    },
    "howItWorks": {
      "sectionTitle": "Wie es funktioniert",
      "step1": {
        "title": "1. Shop-Richtlinien speichern",
        "description": "Speichern Sie Ihre Shop-Details und Rückgaberichtlinien einmalig in Ihrem Profil."
      },
      "step2": {
        "title": "2. Nachrichten öffnen",
        "description": "Funktioniert direkt in Etsy, eBay, Facebook Marketplace, Shopify und in Ihrem Posteingang."
      },
      "step3": {
        "title": "3. KI entwirft die Antwort",
        "description": "SellerDesk liest die Frage und Ihre Richtlinien, um sofort eine professionelle Antwort zu verfassen."
      }
    },
    "features": {
      "sectionTitle": "Funktionen",
      "feature1": {
        "title": "Funktioniert dort, wo Sie verkaufen",
        "description": "Kompatibel mit Etsy, eBay, Facebook Marketplace, Shopify, Mercari, Gmail, Outlook und mehr."
      },
      "feature2": {
        "title": "Sparen Sie Zeit bei wiederholten Fragen",
        "description": "Verwenden Sie gespeicherte Antworten für Versand, Angebote, Rückgaben und mehr wieder."
      },
      "feature3": {
        "title": "Konsistenter Tonfall",
        "description": "Wählen Sie, wie Sie klingen möchten: freundlich, professionell, hilfsbereit oder bestimmt."
      },
      "feature4": {
        "title": "Datenschutzfreundlich",
        "description": "Ihre Gespräche werden nicht auf SellerDesk-Servern verarbeitet."
      }
    },
    "pricing": {
      "sectionTitle": "Einfache Preisgestaltung.",
      "free": {
        "title": "Kostenlos",
        "price": "0 $",
        "features": {
          "f1": "5 KI-Antworten pro Tag",
          "f2": "5 gespeicherte Vorlagen",
          "f3": "1 Verkäuferprofil",
          "f4": "Auf allen Plattformen",
          "f5": "Kein Konto erforderlich",
          "f6": "On-Device Chrome-KI"
        },
        "button": "Zu Chrome hinzufügen"
      },
      "proMonthly": {
        "title": "Pro (Monatlich)",
        "price": "9,99 $/Monat",
        "features": {
          "f1": "Unbegrenzte KI-Antworten",
          "f2": "Unbegrenzte Vorlagen",
          "f3": "Mehrere Profile",
          "f4": "Erweiterte Antwort-Töne",
          "f5": "Optimierungstools",
          "f6": "Marktplatz-Einblicke",
          "f7": "Import/Export",
          "f8": "Prioritäts-Support"
        },
        "button": "Monatlich abonnieren"
      },
      "proLifetime": {
        "title": "Pro (Lebenslang)",
        "price": "149 $",
        "tagline": "Einmal zahlen, für immer nutzen",
        "features": {
          "f1": "Alles in Pro Monatlich",
          "f2": "Keine wiederkehrenden Gebühren",
          "f3": "Zukünftige Updates inklusive",
          "f4": "Early-Adopter-Preis"
        },
        "button": "Lebenslanger Pass"
      }
    },
    "faq": {
      "sectionTitle": "Häufig gestellte Fragen",
      "q1": {
        "question": "Sind meine Kundendaten sicher?",
        "answer": "Ja. Alle Profile werden lokal gespeichert. Nichts wird auf Donbrico-Servern gespeichert."
      },
      "q2": {
        "question": "Unterstützt es meinen Marktplatz?",
        "answer": "Ja. Funktioniert mit Etsy, eBay, Facebook Marketplace, Shopify usw."
      },
      "q3": {
        "question": "Wie funktioniert Bring Your Own Key (BYOK)?",
        "answer": "Sie können Ihren eigenen API-Schlüssel von OpenAI, Anthropic usw. in den Einstellungen verbinden."
      },
      "moreQuestions": "Noch Fragen?",
      "viewFullLink": "Lesen Sie unsere vollständigen FAQs →"
    }
  },
  "ja": {
    "page": {
      "title": "オンライン販売者向け AI 返信アシスタント",
      "description": "Etsy、eBay、Shopify など向けの AI による返信。無料の Chrome 拡張機能。"
    },
    "hero": {
      "eyebrow": "CHROME 拡張機能",
      "title": "数秒で購入者のメッセージに返信します。",
      "subtitle": "SellerDesk AI は、ブラウザ内で直接、AI が生成した専門的かつ個人的な返信を提供し、購入者の質問にすばやく対応できるようにします。",
      "buttonPrimary": "Chrome に追加 — 無料",
      "buttonSecondary": "仕組みを見る ↓",
      "disclaimer": "🔒 デバイス上で動作 — 会話はローカルに保持されます"
    },
    "howItWorks": {
      "sectionTitle": "仕組み",
      "step1": {
        "title": "1. ストアのポリシーを保存する",
        "description": "ショップの詳細、返品ポリシー、よくある質問の回答を一度だけ保存します。"
      },
      "step2": {
        "title": "2. メッセージを開く",
        "description": "Etsy、eBay、Facebook Marketplace、Shopify などの内部で直接動作します。"
      },
      "step3": {
        "title": "3. AI が返信を作成する",
        "description": "SellerDesk は購入者の質問とストアのポリシーを読み取り、即座に返信を作成します。"
      }
    },
    "features": {
      "sectionTitle": "特徴",
      "feature1": {
        "title": "販売する場所で動作します",
        "description": "Etsy、eBay、Shopify、Mercari、Gmail、Outlook などと互換性があります。"
      },
      "feature2": {
        "title": "繰り返しの質問にかかる時間を節約",
        "description": "配送、オファー、返品、在庫状況などの保存された返信を再利用します。"
      },
      "feature3": {
        "title": "トーンを一定に保つ",
        "description": "フレンドリー、プロフェッショナル、親切、きっぱりとした態度から選びます。"
      },
      "feature4": {
        "title": "プライバシーを重視した設計",
        "description": "SellerDesk サーバーは会話を処理しません。ローカル AI または BYOK をサポートします。"
      }
    },
    "pricing": {
      "sectionTitle": "シンプルな料金設定",
      "free": {
        "title": "無料",
        "price": "0 ドル",
        "features": {
          "f1": "1日あたり5回のAI返信",
          "f2": "5つの保存済みテンプレート",
          "f3": "1つの販売者プロファイル",
          "f4": "すべてのプラットフォームで動作",
          "f5": "アカウント不要",
          "f6": "デバイス上の Chrome AI"
        },
        "button": "Chrome に追加"
      },
      "proMonthly": {
        "title": "Pro (月額)",
        "price": "9.99 ドル/月",
        "features": {
          "f1": "無制限の AI 返信",
          "f2": "無制限のテンプレート",
          "f3": "複数のプロファイル",
          "f4": "高度な返信トーン",
          "f5": "最適化ツール",
          "f6": "マーケットプレイスのインサイト",
          "f7": "インポート/エクスポート",
          "f8": "優先サポート"
        },
        "button": "月額プランを購読する"
      },
      "proLifetime": {
        "title": "Pro (ライフタイム)",
        "price": "149 ドル",
        "tagline": "一度の支払いで永久に使用",
        "features": {
          "f1": "Pro 月額のすべて",
          "f2": "定期的な費用なし",
          "f3": "将来のアップデートが含まれます",
          "f4": "早期採用者価格"
        },
        "button": "ライフタイム パス"
      }
    },
    "faq": {
      "sectionTitle": "よくある質問",
      "q1": {
        "question": "顧客データは安全ですか?",
        "answer": "はい。すべてのプロファイルはローカルに保存されます。Donbrico サーバーには何も保存されません。"
      },
      "q2": {
        "question": "特定のマーケットプレイスをサポートしていますか?",
        "answer": "はい。Etsy、eBay、Shopify などで動作します。"
      },
      "q3": {
        "question": "Bring Your Own Key (BYOK) とは何ですか?",
        "answer": "設定で OpenAI や Anthropic などの独自の API キーを接続できます。"
      },
      "moreQuestions": "さらに質問がありますか?",
      "viewFullLink": "完全な FAQ を読む →"
    }
  },
  "pt_BR": {
    "page": {
      "title": "Assistente de Resposta de IA para Vendedores",
      "description": "Respostas com tecnologia de IA para mensagens no Etsy, eBay, Shopify e mais. Extensão gratuita do Chrome."
    },
    "hero": {
      "eyebrow": "EXTENSÃO DO CHROME",
      "title": "Responda às mensagens dos compradores em segundos.",
      "subtitle": "O SellerDesk AI ajuda os vendedores online a responder às perguntas mais rapidamente com respostas geradas por IA.",
      "buttonPrimary": "Adicionar ao Chrome — Grátis",
      "buttonSecondary": "Veja como funciona ↓",
      "disclaimer": "🔒 Funciona no dispositivo — suas conversas permanecem locais"
    },
    "howItWorks": {
      "sectionTitle": "Como funciona",
      "step1": {
        "title": "1. Salve as políticas da loja",
        "description": "Armazene os detalhes da sua loja, políticas de devolução e respostas frequentes."
      },
      "step2": {
        "title": "2. Abra as mensagens",
        "description": "Funciona diretamente no Etsy, eBay, Facebook Marketplace, Shopify e na sua caixa de entrada."
      },
      "step3": {
        "title": "3. A IA redige a resposta",
        "description": "O SellerDesk lê a pergunta e as políticas da sua loja para redigir uma resposta profissional instantaneamente."
      }
    },
    "features": {
      "sectionTitle": "Recursos",
      "feature1": {
        "title": "Funciona onde você vende",
        "description": "Compatível com Etsy, eBay, Shopify, Mercari, Poshmark, Gmail, Outlook e mais."
      },
      "feature2": {
        "title": "Economize tempo em perguntas repetitivas",
        "description": "Reutilize respostas salvas para envios, ofertas, devoluções, disponibilidade e mais."
      },
      "feature3": {
        "title": "Mantenha seu tom consistente",
        "description": "Escolha como você quer soar: amigável, profissional, útil ou firme."
      },
      "feature4": {
        "title": "Design focado na privacidade",
        "description": "Nenhum servidor do SellerDesk processa suas conversas. Suporta IA local ou provedores de IA opcionais BYOK."
      }
    },
    "pricing": {
      "sectionTitle": "Preço simples.",
      "free": {
        "title": "Grátis",
        "price": "US$ 0",
        "features": {
          "f1": "5 respostas de IA por dia",
          "f2": "5 modelos salvos",
          "f3": "1 perfil de vendedor",
          "f4": "Funciona em todas as plataformas",
          "f5": "Não requer conta",
          "f6": "IA do Chrome no dispositivo"
        },
        "button": "Adicionar ao Chrome"
      },
      "proMonthly": {
        "title": "Pro (Mensal)",
        "price": "US$ 9,99/mês",
        "features": {
          "f1": "Respostas de IA ilimitadas",
          "f2": "Modelos salvos ilimitados",
          "f3": "Vários perfis de loja",
          "f4": "Tons de resposta avançados",
          "f5": "Ferramentas de otimização",
          "f6": "Insights de mercado",
          "f7": "Ferramentas de importação/exportação",
          "f8": "Suporte prioritário"
        },
        "button": "Assinar mensalmente"
      },
      "proLifetime": {
        "title": "Pro (Vitalício)",
        "price": "US$ 149",
        "tagline": "Pague uma vez, use para sempre",
        "features": {
          "f1": "Tudo no Pro Mensal",
          "f2": "Sem taxas recorrentes",
          "f3": "Atualizações futuras incluídas",
          "f4": "Preço para primeiros usuários"
        },
        "button": "Passe vitalício"
      }
    },
    "faq": {
      "sectionTitle": "Perguntas Frequentes",
      "q1": {
        "question": "Meus dados de clientes estão seguros?",
        "answer": "Sim. Todos os perfis são armazenados localmente. Nada é armazenado nos servidores da Donbrico."
      },
      "q2": {
        "question": "É compatível com o meu mercado específico?",
        "answer": "Sim. Funciona com Etsy, eBay, Facebook Marketplace, Shopify, etc."
      },
      "q3": {
        "question": "Como funciona o Traga sua própria chave (BYOK)?",
        "answer": "Você pode conectar sua própria chave de API da OpenAI, Anthropic, etc. nas configurações."
      },
      "moreQuestions": "Tem mais perguntas?",
      "viewFullLink": "Leia nosso FAQ completo →"
    }
  },
  "zh_CN": {
    "page": {
      "title": "在线卖家AI回复助手",
      "description": "适用于Etsy、eBay、Shopify等平台的买家消息AI回复。免费的Chrome扩展程序。"
    },
    "hero": {
      "eyebrow": "CHROME扩展程序",
      "title": "只需几秒钟即可回复买家消息。",
      "subtitle": "SellerDesk AI 帮助在线卖家使用直接在浏览器中生成的专业AI回复更快地响应买家的问题。",
      "buttonPrimary": "添加到 Chrome — 免费",
      "buttonSecondary": "了解其工作原理 ↓",
      "disclaimer": "🔒 在设备上运行 — 您的买家对话保留在本地"
    },
    "howItWorks": {
      "sectionTitle": "工作原理",
      "step1": {
        "title": "1. 保存商店政策",
        "description": "在卖家个人资料中保存您的商店详细信息、退货政策和常见答案。"
      },
      "step2": {
        "title": "2. 打开买家消息",
        "description": "直接在 Etsy、eBay、Facebook Marketplace、Shopify 和您的电子邮件收件箱内工作。"
      },
      "step3": {
        "title": "3. AI 起草回复",
        "description": "SellerDesk 阅读买家的问题和您的商店政策，立即起草专业的回复。"
      }
    },
    "features": {
      "sectionTitle": "功能",
      "feature1": {
        "title": "在您销售的地方工作",
        "description": "兼容 Etsy、eBay、Facebook Marketplace、Shopify、Mercari、Gmail、Outlook 等。"
      },
      "feature2": {
        "title": "在重复问题上节省时间",
        "description": "重复使用保存的回复来处理运输、报价、退货、可用性、取件等。"
      },
      "feature3": {
        "title": "保持一致的语气",
        "description": "选择您的语气：友好、专业、乐于助人或坚定。"
      },
      "feature4": {
        "title": "隐私优先设计",
        "description": "没有 SellerDesk 服务器处理您的对话。支持本地 AI 和 BYOK AI 提供商。"
      }
    },
    "pricing": {
      "sectionTitle": "简单的定价。",
      "free": {
        "title": "免费",
        "price": "$0",
        "features": {
          "f1": "每天5次AI回复",
          "f2": "5个保存的模板",
          "f3": "1个卖家档案",
          "f4": "在所有支持的平台上工作",
          "f5": "无需帐户",
          "f6": "设备端 Chrome AI"
        },
        "button": "添加到 Chrome"
      },
      "proMonthly": {
        "title": "专业版 (月付)",
        "price": "$9.99/月",
        "features": {
          "f1": "无限AI回复",
          "f2": "无限保存的模板",
          "f3": "多个卖家档案",
          "f4": "高级回复语气",
          "f5": "列表优化工具",
          "f6": "市场洞察",
          "f7": "导入/导出工具",
          "f8": "优先支持"
        },
        "button": "按月订阅"
      },
      "proLifetime": {
        "title": "专业版 (终身)",
        "price": "$149",
        "tagline": "一次付费，永久使用",
        "features": {
          "f1": "月度专业版中的所有内容",
          "f2": "无经常性费用",
          "f3": "包括未来的更新",
          "f4": "早期采用者定价"
        },
        "button": "终身通行证"
      }
    },
    "faq": {
      "sectionTitle": "常见问题",
      "q1": {
        "question": "我的客户数据安全吗？",
        "answer": "是的。所有个人资料都在本地存储。Donbrico 服务器上不存储任何内容。"
      },
      "q2": {
        "question": "它支持我特定的市场吗？",
        "answer": "是的。它与 Etsy、eBay、Facebook Marketplace、Shopify 等兼容。"
      },
      "q3": {
        "question": "自带密钥 (BYOK) 是如何工作的？",
        "answer": "您可以在设置中连接来自 OpenAI、Anthropic 等的自己的 API 密钥。"
      },
      "moreQuestions": "还有其他问题吗？",
      "viewFullLink": "阅读我们完整的常见问题解答 →"
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
      
      // We mapped es, fr, de, ja, pt_BR, zh_CN. 
      // For languages not in pageTranslations (like it, zh_TW, hi, ru, ko), we can copy an appropriate fallback (like zh_CN for zh_TW, or just leave English).
      // Let's copy from specific translations if available
      let trans = pageTranslations[lang];
      if (!trans) {
         if (lang === 'zh_TW') trans = pageTranslations['zh_CN'];
      }
      
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

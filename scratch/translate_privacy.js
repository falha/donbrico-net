const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '..', 'locales');

const privacyTranslations = {
  "es": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Qué datos recopilamos",
        "paragraph": "Ninguno. Los perfiles de su tienda, las respuestas guardadas y la configuración se almacenan localmente en el almacenamiento de Chrome en su dispositivo. No se transmiten datos a los servidores de Donbrico."
      },
      "howStored": {
        "sectionTitle": "Cómo se almacenan sus datos",
        "paragraph": "Los perfiles y las plantillas de la tienda se almacenan en el almacenamiento local de Chrome. Estos datos nunca salen de su dispositivo a menos que use un proveedor de IA de terceros."
      },
      "thirdPartyAI": {
        "sectionTitle": "Proveedores de IA de terceros (Traiga su propia clave)",
        "paragraph": "Si configura un proveedor de Traiga su propia clave, como OpenAI, el mensaje del comprador y los detalles del perfil de su tienda se envían a ese proveedor externo para generar una respuesta. Si usa Gemini Nano, todo el procesamiento se realiza en el dispositivo. Donbrico no almacena ni registra ninguna solicitud de IA."
      },
      "permissions": {
        "sectionTitle": "Permisos utilizados",
        "paragraph": "almacenamiento (para perfiles de tienda y configuración), activeTab (para detectar campos de texto), scripting (para inyectar la barra de herramientas de respuesta)."
      },
      "dataDeletion": {
        "sectionTitle": "Eliminación de datos",
        "paragraph": "Desinstalar la extensión elimina todos los detalles de la tienda y la configuración almacenados localmente. No se retienen datos en los servidores de Donbrico."
      }
    }
  },
  "fr": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Quelles données nous collectons",
        "paragraph": "Aucune. Les profils de votre boutique, les réponses enregistrées et les paramètres sont stockés localement dans le stockage Chrome de votre appareil. Aucune donnée n'est transmise aux serveurs de Donbrico."
      },
      "howStored": {
        "sectionTitle": "Comment vos données sont stockées",
        "paragraph": "Les profils et modèles de boutique sont stockés dans le stockage local de Chrome. Ces données ne quittent jamais votre appareil à moins que vous n'utilisiez un fournisseur d'IA tiers."
      },
      "thirdPartyAI": {
        "sectionTitle": "Fournisseurs d'IA tiers (Apportez votre propre clé)",
        "paragraph": "Si vous configurez un fournisseur tel qu'OpenAI, le message de l'acheteur et les détails de votre profil de boutique sont envoyés à ce fournisseur tiers pour générer une réponse. Si vous utilisez Gemini Nano, tout le traitement s'effectue sur l'appareil. Donbrico ne stocke ni ne journalise aucune demande d'IA."
      },
      "permissions": {
        "sectionTitle": "Autorisations utilisées",
        "paragraph": "stockage (pour les profils de boutique et les paramètres), activeTab (pour détecter les champs de texte), scripting (pour injecter la barre d'outils de réponse)."
      },
      "dataDeletion": {
        "sectionTitle": "Suppression des données",
        "paragraph": "La désinstallation de l'extension supprime tous les détails de la boutique et les paramètres stockés localement. Aucune donnée n'est conservée sur les serveurs de Donbrico."
      }
    }
  },
  "de": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Welche Daten wir sammeln",
        "paragraph": "Keine. Ihre Shop-Profile, gespeicherten Antworten und Einstellungen werden lokal im Chrome-Speicher auf Ihrem Gerät gespeichert. Es werden keine Daten an Donbrico-Server übermittelt."
      },
      "howStored": {
        "sectionTitle": "Wie Ihre Daten gespeichert werden",
        "paragraph": "Shop-Profile und Vorlagen werden im lokalen Chrome-Speicher gespeichert. Diese Daten verlassen niemals Ihr Gerät, es sei denn, Sie verwenden einen Drittanbieter-KI-Anbieter."
      },
      "thirdPartyAI": {
        "sectionTitle": "Drittanbieter-KI-Anbieter (Bring Your Own Key)",
        "paragraph": "Wenn Sie einen Anbieter wie OpenAI konfigurieren, werden die Käufernachricht und Ihre Shop-Profildetails an diesen Drittanbieter gesendet, um eine Antwort zu generieren. Wenn Sie Gemini Nano verwenden, erfolgt die gesamte Verarbeitung auf dem Gerät. Donbrico speichert oder protokolliert keine KI-Anfragen."
      },
      "permissions": {
        "sectionTitle": "Verwendete Berechtigungen",
        "paragraph": "Speicher (für Shop-Profile und Einstellungen), activeTab (zur Erkennung von Textfeldern), Scripting (zum Einfügen der Antwort-Symbolleiste)."
      },
      "dataDeletion": {
        "sectionTitle": "Datenlöschung",
        "paragraph": "Bei der Deinstallation der Erweiterung werden alle lokal gespeicherten Shop-Details und Einstellungen gelöscht. Auf Donbrico-Servern werden keine Daten gespeichert."
      }
    }
  },
  "it": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Quali dati raccogliamo",
        "paragraph": "Nessuno. I profili del tuo negozio, le risposte salvate e le impostazioni sono archiviati localmente nella memoria di Chrome sul tuo dispositivo. Nessun dato viene trasmesso ai server di Donbrico."
      },
      "howStored": {
        "sectionTitle": "Come vengono archiviati i tuoi dati",
        "paragraph": "I profili e i modelli del negozio sono archiviati nella memoria locale di Chrome. Questi dati non lasciano mai il tuo dispositivo a meno che tu non utilizzi un fornitore di intelligenza artificiale di terze parti."
      },
      "thirdPartyAI": {
        "sectionTitle": "Fornitori di intelligenza artificiale di terze parti (Porta la tua chiave)",
        "paragraph": "Se configuri un fornitore come OpenAI, il messaggio dell'acquirente e i dettagli del profilo del tuo negozio vengono inviati a quel fornitore di terze parti per generare una risposta. Se utilizzi Gemini Nano, tutta l'elaborazione avviene sul dispositivo. Donbrico non archivia né registra alcuna richiesta di intelligenza artificiale."
      },
      "permissions": {
        "sectionTitle": "Autorizzazioni utilizzate",
        "paragraph": "archiviazione (per profili negozio e impostazioni), activeTab (per rilevare campi di testo), scripting (per inserire la barra degli strumenti di risposta)."
      },
      "dataDeletion": {
        "sectionTitle": "Cancellazione dei dati",
        "paragraph": "La disinstallazione dell'estensione elimina tutti i dettagli del negozio e le impostazioni archiviati localmente. Nessun dato viene conservato sui server di Donbrico."
      }
    }
  },
  "pt_BR": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Quais dados nós coletamos",
        "paragraph": "Nenhum. Os perfis da sua loja, respostas salvas e configurações são armazenados localmente no armazenamento do Chrome no seu dispositivo. Nenhum dado é transmitido aos servidores da Donbrico."
      },
      "howStored": {
        "sectionTitle": "Como seus dados são armazenados",
        "paragraph": "Os perfis e modelos de loja são armazenados no armazenamento local do Chrome. Esses dados nunca saem do seu dispositivo, a menos que você use um provedor de IA de terceiros."
      },
      "thirdPartyAI": {
        "sectionTitle": "Provedores de IA de terceiros (Traga sua própria chave)",
        "paragraph": "Se você configurar um provedor como OpenAI, a mensagem do comprador e os detalhes do perfil da sua loja serão enviados a esse provedor terceirizado para gerar uma resposta. Se você usar o Gemini Nano, todo o processamento será no dispositivo. A Donbrico não armazena nem registra nenhuma solicitação de IA."
      },
      "permissions": {
        "sectionTitle": "Permissões usadas",
        "paragraph": "armazenamento (para perfis e configurações da loja), activeTab (para detectar campos de texto), scripting (para injetar a barra de ferramentas de resposta)."
      },
      "dataDeletion": {
        "sectionTitle": "Exclusão de dados",
        "paragraph": "A desinstalação da extensão exclui todos os detalhes da loja e configurações armazenados localmente. Nenhum dado é retido nos servidores da Donbrico."
      }
    }
  },
  "ja": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "収集するデータ",
        "paragraph": "なし。ストアプロファイル、保存された返信、設定は、デバイス上のChromeのストレージにローカルに保存されます。Donbricoサーバーに送信されるデータはありません。"
      },
      "howStored": {
        "sectionTitle": "データの保存方法",
        "paragraph": "ストアプロファイルとテンプレートはChromeのローカルストレージに保存されます。サードパーティのAIプロバイダーを使用しない限り、このデータがデバイスを離れることはありません。"
      },
      "thirdPartyAI": {
        "sectionTitle": "サードパーティAIプロバイダー（Bring Your Own Key）",
        "paragraph": "OpenAIなどのプロバイダーを設定すると、購入者のメッセージとストアプロファイルの詳細がそのサードパーティプロバイダーに送信され、返信が生成されます。Gemini Nanoを使用する場合、すべての処理はデバイス上で行われます。DonbricoはAIリクエストを保存またはログに記録しません。"
      },
      "permissions": {
        "sectionTitle": "使用される権限",
        "paragraph": "ストレージ（ストアプロファイルと設定用）、activeTab（テキストフィールドの検出用）、スクリプト（返信ツールバーの挿入用）。"
      },
      "dataDeletion": {
        "sectionTitle": "データの削除",
        "paragraph": "拡張機能をアンインストールすると、ローカルに保存されているすべてのストアの詳細と設定が削除されます。Donbricoサーバーに保持されるデータはありません。"
      }
    }
  },
  "zh_CN": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "我们收集哪些数据",
        "paragraph": "没有。您的商店个人资料、保存的回复和设置都本地存储在您设备上的Chrome存储中。没有任何数据传输到Donbrico服务器。"
      },
      "howStored": {
        "sectionTitle": "您的数据如何存储",
        "paragraph": "商店个人资料和模板存储在Chrome的本地存储中。除非您使用第三方AI提供商，否则此数据永远不会离开您的设备。"
      },
      "thirdPartyAI": {
        "sectionTitle": "第三方AI提供商（自带密钥）",
        "paragraph": "如果您配置了像OpenAI这样的自带密钥提供商，买家消息和您的商店个人资料详细信息将发送到该第三方提供商以生成回复。如果您使用Gemini Nano，所有处理都在设备上进行。Donbrico不存储或记录任何AI请求。"
      },
      "permissions": {
        "sectionTitle": "使用的权限",
        "paragraph": "存储（用于商店个人资料和设置），activeTab（用于检测文本字段），脚本（用于注入回复工具栏）。"
      },
      "dataDeletion": {
        "sectionTitle": "数据删除",
        "paragraph": "卸载扩展程序会删除所有本地存储的商店详细信息和设置。Donbrico服务器上不保留任何数据。"
      }
    }
  },
  "zh_TW": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "我們收集哪些資料",
        "paragraph": "沒有。您的商店個人資料、儲存的對話和設定都儲存在您裝置上的Chrome儲存空間中。沒有任何資料會傳送到Donbrico伺服器。"
      },
      "howStored": {
        "sectionTitle": "您的資料如何儲存",
        "paragraph": "商店個人資料和範本儲存在Chrome的本機儲存空間中。除非您使用第三方AI提供者，否則此資料永遠不會離開您的裝置。"
      },
      "thirdPartyAI": {
        "sectionTitle": "第三方AI提供者（自帶金鑰）",
        "paragraph": "如果您設定了像OpenAI這樣的自帶金鑰提供者，買家訊息和您的商店個人資料詳細資訊將傳送到該第三方提供者以產生回覆。如果您使用Gemini Nano，所有處理都在裝置上進行。Donbrico不儲存或記錄任何AI請求。"
      },
      "permissions": {
        "sectionTitle": "使用的權限",
        "paragraph": "儲存（用於商店個人資料和設定），activeTab（用於偵測文字欄位），指令碼（用於注入回覆工具列）。"
      },
      "dataDeletion": {
        "sectionTitle": "資料刪除",
        "paragraph": "解除安裝擴充功能會刪除所有本機儲存的商店詳細資訊和設定。Donbrico伺服器上不保留任何資料。"
      }
    }
  },
  "hi": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "हम क्या डेटा एकत्र करते हैं",
        "paragraph": "कुछ नहीं। आपके स्टोर प्रोफ़ाइल, सहेजे गए उत्तर, और सेटिंग्स आपके डिवाइस पर Chrome के स्टोरेज में स्थानीय रूप से संग्रहीत हैं। Donbrico सर्वर पर कोई डेटा प्रेषित नहीं होता है।"
      },
      "howStored": {
        "sectionTitle": "आपका डेटा कैसे संग्रहीत है",
        "paragraph": "स्टोर प्रोफ़ाइल और टेम्प्लेट Chrome के स्थानीय संग्रहण में संग्रहीत हैं। जब तक आप किसी तृतीय-पक्ष AI प्रदाता का उपयोग नहीं करते हैं, यह डेटा आपके डिवाइस को कभी नहीं छोड़ता है।"
      },
      "thirdPartyAI": {
        "sectionTitle": "तृतीय-पक्ष AI प्रदाता (अपनी स्वयं की कुंजी लाएं)",
        "paragraph": "यदि आप OpenAI जैसे प्रदाता को कॉन्फ़िगर करते हैं, तो खरीदार का संदेश और आपके स्टोर प्रोफ़ाइल विवरण प्रतिक्रिया उत्पन्न करने के लिए उस तृतीय-पक्ष प्रदाता को भेजे जाते हैं। यदि आप Gemini Nano का उपयोग करते हैं, तो सभी प्रसंस्करण ऑन-डिवाइस होता है। Donbrico किसी भी AI अनुरोध को संग्रहीत या लॉग नहीं करता है।"
      },
      "permissions": {
        "sectionTitle": "उपयोग की गई अनुमतियां",
        "paragraph": "संग्रहण (स्टोर प्रोफाइल और सेटिंग्स के लिए), activeTab (टेक्स्ट फ़ील्ड का पता लगाने के लिए), स्क्रिप्टिंग (उत्तर टूलबार को इंजेक्ट करने के लिए)।"
      },
      "dataDeletion": {
        "sectionTitle": "डेटा हटाना",
        "paragraph": "एक्सटेंशन को अनइंस्टॉल करने से सभी स्थानीय रूप से सहेजे गए स्टोर विवरण और सेटिंग्स हट जाते हैं। Donbrico सर्वर पर कोई डेटा नहीं रखा गया है।"
      }
    }
  },
  "ru": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "Какие данные мы собираем",
        "paragraph": "Никакие. Профили вашего магазина, сохраненные ответы и настройки хранятся локально в хранилище Chrome на вашем устройстве. Данные не передаются на серверы Donbrico."
      },
      "howStored": {
        "sectionTitle": "Как хранятся ваши данные",
        "paragraph": "Профили магазинов и шаблоны хранятся в локальном хранилище Chrome. Эти данные никогда не покидают ваше устройство, если вы не используете стороннего поставщика ИИ."
      },
      "thirdPartyAI": {
        "sectionTitle": "Сторонние провайдеры ИИ (Принеси свой ключ)",
        "paragraph": "Если вы настроите провайдера, такого как OpenAI, сообщение покупателя и данные профиля вашего магазина отправляются этому стороннему провайдеру для создания ответа. Если вы используете Gemini Nano, вся обработка происходит на устройстве. Donbrico не хранит и не регистрирует запросы ИИ."
      },
      "permissions": {
        "sectionTitle": "Используемые разрешения",
        "paragraph": "хранилище (для профилей магазина и настроек), activeTab (для обнаружения текстовых полей), сценарии (для внедрения панели инструментов ответов)."
      },
      "dataDeletion": {
        "sectionTitle": "Удаление данных",
        "paragraph": "Удаление расширения приводит к удалению всех локально сохраненных данных и настроек магазина. На серверах Donbrico данные не сохраняются."
      }
    }
  },
  "ko": {
    "nav": { "sellerDesk": "SellerDesk AI" },
    "sellerDesk": {
      "sectionTitle": "SellerDesk AI",
      "whatWeCollect": {
        "sectionTitle": "우리가 수집하는 데이터",
        "paragraph": "없음. 스토어 프로필, 저장된 답변 및 설정은 기기의 Chrome 저장소에 로컬로 저장됩니다. Donbrico 서버로 데이터가 전송되지 않습니다."
      },
      "howStored": {
        "sectionTitle": "데이터 저장 방식",
        "paragraph": "스토어 프로필과 템플릿은 Chrome 로컬 저장소에 저장됩니다. 타사 AI 제공업체를 사용하지 않는 한 이 데이터는 기기를 떠나지 않습니다."
      },
      "thirdPartyAI": {
        "sectionTitle": "타사 AI 제공업체(Bring Your Own Key)",
        "paragraph": "OpenAI와 같은 제공업체를 설정하면 구매자 메시지와 스토어 프로필 세부 정보가 해당 타사 제공업체로 전송되어 답변이 생성됩니다. Gemini Nano를 사용하는 경우 모든 처리가 기기 내에서 이루어집니다. Donbrico는 AI 요청을 저장하거나 기록하지 않습니다."
      },
      "permissions": {
        "sectionTitle": "사용된 권한",
        "paragraph": "저장소(스토어 프로필 및 설정용), activeTab(텍스트 필드 감지용), 스크립팅(답변 도구 모음 삽입용)."
      },
      "dataDeletion": {
        "sectionTitle": "데이터 삭제",
        "paragraph": "확장 프로그램을 제거하면 로컬에 저장된 모든 스토어 세부 정보 및 설정이 삭제됩니다. Donbrico 서버에는 데이터가 보관되지 않습니다."
      }
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
      
      if (privacyTranslations[lang]) {
        if (!data.privacyPolicy) data.privacyPolicy = {};
        if (!data.privacyPolicy.nav) data.privacyPolicy.nav = {};
        
        data.privacyPolicy.nav.sellerDesk = privacyTranslations[lang].nav.sellerDesk;
        data.privacyPolicy.sellerDesk = privacyTranslations[lang].sellerDesk;
        
        fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated privacy for ' + lang);
      }
    } catch (e) {
      console.error('Error on ' + file);
    }
  }
});

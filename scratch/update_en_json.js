const fs = require('fs');
const enPath = 'c:/dev/donbrico-net/locales/en.json';
const data = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update nav
data.nav.geminiNano = "Gemini Nano";

// Update docs.apiKeys
data.docs = data.docs || {};
data.docs.apiKeys = {
  page: {
    title: "API Keys Guide — Donbrico Autofill AI"
  },
  breadcrumb: {
    home: "Home",
    docs: "Docs",
    title: "API Keys"
  },
  header: {
    badge: "Setup Guide",
    title: "Get your <em>API Keys</em>",
    intro: "Donbrico Autofill AI works best when you connect your own AI provider. Here is how to get your keys from the most popular services.",
    speedNote: {
      title: "Blazing fast.",
      text: "Using your own API key is typically 5-10x faster than the built-in free models and has much higher limits."
    }
  },
  providers: {
    groq: {
      title: "Groq",
      tag: "Fast · Free tier",
      label: "Provider 01",
      url: "console.groq.com",
      pills: {
        free: "Free tier available",
        models: "Llama 3 · Mixtral · Gemma"
      },
      cta: "Create account ↗",
      intro: "Groq runs open-source models on custom silicon (LPUs) — the result is remarkably fast inference. The free tier is generous enough for everyday autofill use at no cost.",
      step1: {
        title: "Sign up for a free Groq account",
        text: "Go to <strong>console.groq.com</strong> and click <strong>Sign up</strong>. Groq supports Google, GitHub, and email signup. No credit card is required for the free tier."
      },
      step2: {
        title: "Create an API key",
        text: "In the left sidebar, click <strong>API Keys</strong>. Click <strong>Create API Key</strong>, enter a name like \"Donbrico\", and click <strong>Submit</strong>.",
        warn: "Copy the key immediately. Groq does not show it again after creation. It begins with <span class=\"code-inline\">gsk_…</span>"
      },
      step3: {
        title: "Paste into the extension",
        text: "Open the extension popup → <strong>Settings → AI Provider → Groq</strong>. Paste your key and save."
      },
      info: "Groq free tier includes rate limits (e.g. 30 requests/minute for Llama 3). For typical autofill usage this is more than enough. If you hit limits, upgrading to a paid plan removes them.",
      table: {
        thModel: "Model",
        thSpeed: "Speed",
        thFree: "Free tier?",
        recommended: "Recommended",
        extremelyFast: "Extremely fast",
        fast: "Fast",
        yes: "Yes",
        yesLower: "Yes (lower limit)"
      }
    },
    openrouter: {
      title: "OpenRouter",
      tag: "100+ models",
      label: "Provider 02",
      url: "openrouter.ai",
      pills: {
        free: "Free models available",
        models: "100+ models from any provider"
      },
      cta: "Create account ↗",
      intro: "OpenRouter is a unified gateway to over 100 AI models — including GPT-4o, Claude, Llama, Mistral, and many more — through a single API key. Several models are permanently free with no credit card required.",
      step1: {
        title: "Create an OpenRouter account",
        text: "Visit <strong>openrouter.ai</strong> and click <strong>Sign In</strong>. OpenRouter supports Google and GitHub sign-in, or you can use an email address."
      },
      step2: {
        title: "Optional: add credits for paid models",
        text: "Go to <strong>Credits</strong> in your account and top up if you want to use paid models like GPT-4o or Claude. For free models only, no payment is needed.",
        tip: "Filter by <strong>Free</strong> on the Models page to see the full list of zero-cost models available right now."
      },
      step3: {
        title: "Create an API key",
        text: "Go to <strong>Keys</strong> in the top navigation. Click <strong>Create Key</strong>, name it \"Donbrico\", and copy the key — it begins with <span class=\"code-inline\">sk-or-…</span>",
        warn: "Copy the key now — it will be hidden after you close this dialog."
      },
      step4: {
        title: "Paste into the extension",
        text: "Open the extension popup → <strong>Settings → AI Provider → OpenRouter</strong>. Paste your key, choose your preferred model, and save."
      },
      table: {
        thModel: "Model",
        thNotes: "Notes",
        thCost: "Cost",
        llamaNote: "Fast, reliable free option",
        mistralNote: "Good for structured outputs",
        gptNote: "Premium quality",
        claudeNote: "Premium quality",
        free: "Free",
        payAsYouGo: "Pay-as-you-go"
      }
    },
    anthropic: {
      title: "Anthropic",
      tag: "Claude",
      label: "Provider 03",
      url: "console.anthropic.com",
      pills: {
        payAsYouGo: "Pay-as-you-go",
        models: "Claude 3.5 Haiku · Claude 3.5 Sonnet"
      },
      cta: "Create account ↗",
      intro: "Anthropic's Claude models are known for following instructions precisely — ideal for generating well-structured cover letters and professional answers.",
      step1: {
        title: "Create an Anthropic account",
        text: "Visit <strong>console.anthropic.com</strong> and click <strong>Sign up</strong>. You can use Google or an email address."
      },
      step2: {
        title: "Add billing information",
        text: "From the Console dashboard, go to <strong>Settings → Billing</strong>. Click <strong>Add credit card</strong> and complete the form. Anthropic is pay-as-you-go with no monthly fee.",
        tip: "You can set a monthly spend limit under Billing → Usage limits to avoid any surprise charges."
      },
      step3: {
        title: "Generate an API key",
        text: "In the left sidebar, click <strong>API Keys</strong>. Click <strong>Create Key</strong>, name it \"Donbrico\", and copy the key — it starts with <span class=\"code-inline\">sk-ant-…</span>",
        warn: "The key is shown only once at creation time. Copy it before closing the dialog."
      },
      step4: {
        title: "Paste into the extension",
        text: "Open the extension popup → <strong>Settings → AI Provider → Anthropic</strong>. Paste your key and save."
      },
      table: {
        thModel: "Model",
        thSpeed: "Speed",
        thCost: "Cost (approx. per autofill)",
        veryFast: "Very fast",
        moderate: "Moderate",
        costHaiku: "~$0.001",
        costSonnet: "~$0.006"
      }
    },
    openai: {
      title: "OpenAI",
      tag: "GPT-4o",
      label: "Provider 04",
      url: "platform.openai.com",
      pills: {
        payAsYouGo: "Pay-as-you-go",
        models: "GPT-4o · GPT-4o mini"
      },
      cta: "Create account ↗",
      intro: "OpenAI is the most widely used provider. GPT-4o mini is fast, accurate, and costs fractions of a cent per autofill.",
      step1: {
        title: "Create a free account",
        text: "Go to <strong>platform.openai.com</strong> and sign up. You can use Google, Microsoft, or email."
      },
      step2: {
        title: "Add a payment method",
        text: "Navigate to <strong>Settings → Billing → Add payment method</strong>. OpenAI requires a credit card before generating API keys. You will only be charged for actual usage — new accounts receive $5 in free credits."
      },
      step3: {
        title: "Create an API key",
        text: "Go to <strong>API Keys</strong> in the left sidebar (or visit <span class=\"code-inline\">platform.openai.com/api-keys</span>). Click <strong>Create new secret key</strong>, give it a name like \"Donbrico\", and click <strong>Create secret key</strong>.",
        warn: "Copy your key immediately — OpenAI only shows it once. Store it somewhere safe."
      },
      step4: {
        title: "Paste the key into the extension",
        text: "Open the Donbrico Autofill AI popup → <strong>Settings → AI Provider → OpenAI</strong>. Paste your key (it starts with <span class=\"code-inline\">sk-…</span>) and click Save."
      },
      table: {
        thModel: "Model",
        thSpeed: "Speed",
        thCost: "Cost (approx. per autofill)",
        costMini: "~$0.001",
        costFull: "~$0.005"
      }
    }
  },
  comparison: {
    title: "Quick comparison",
    thProvider: "Provider",
    thFreeTier: "Free tier?",
    thCardRequired: "Card required?",
    thBestFor: "Best for",
    thKeyPrefix: "Key prefix",
    groqBest: "Fastest responses, no cost",
    openRouterBest: "Flexibility, free models",
    anthropicBest: "Precise instruction-following",
    openaiBest: "Best overall quality",
    signupCredit: "$5 credit on signup",
    no: "No",
    yes: "Yes",
    yesFreeModels: "No (free models)"
  },
  proTip: {
    label: "Pro tip",
    text: "No API key needed at all — if your computer supports it, <strong>Gemini Nano</strong> runs directly in Chrome for free with complete privacy.",
    link: "Check Gemini Nano compatibility →"
  }
};

fs.writeFileSync(enPath, JSON.stringify(data, null, 2) + '\n');
console.log('en.json updated successfully.');

const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, '..', 'locales', 'en.json');
const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// 1. Add nav items
enData.nav = enData.nav || {};
enData.nav.tools = "Tools";
enData.nav.toolsFileWhisperer = "FileWhisperer AI";
enData.nav.toolsReceiptWhisperer = "ReceiptWhisperer AI";
enData.nav.toolsMeetingWhisperer = "MeetingWhisperer AI";

// 2. Add FileWhisperer AI keys
enData.fileWhisperer = {
  page: {
    title: "FileWhisperer AI — Local Offline File Analysis & Summarization",
    description: "Private local file summarization for PDF, text, and documents. Zero cloud data transmission. Uses local Hugging Face Transformers. Download from MS Store.",
    ogTitle: "FileWhisperer AI — Local Offline File Analysis & Summarization",
    ogDescription: "Private local file summarization for PDF, text, and documents. Zero cloud data transmission. Uses local Hugging Face Transformers. Download from MS Store."
  },
  hero: {
    eyebrow: "DESKTOP APPLICATION",
    title: "Summarize files locally.<br>100% private, offline.",
    subtitle: "Extract details, translate, and analyze PDFs, documents, and spreadsheets entirely on your machine. No APIs, no cloud subscriptions, no data leaks.",
    buttonPrimary: "Get on Microsoft Store",
    buttonSecondary: "Get from Gumroad",
    disclaimer: "💻 Runs on Windows 10/11 · Fully offline · Local AI"
  },
  howItWorks: {
    sectionTitle: "How It Works",
    step1: { title: "1. Drag & drop files", description: "Drop PDFs, text files, or Word documents into the clean desktop interface." },
    step2: { title: "2. Process offline", description: "Local Hugging Face transformers parse text and build index vector structures entirely on your device." },
    step3: { title: "3. Ask or summarize", description: "Ask questions in natural language, generate summaries, or translate sections with zero bytes uploaded." }
  },
  features: {
    sectionTitle: "Built for secure environments.",
    worksOffline: { title: "Works 100% offline", description: "Run it in air-gapped systems or on flights. No active internet connection is ever required." },
    privacyFirst: { title: "Privacy by design", description: "Your confidential contracts, medical records, or research papers never leave your disk." },
    batchProcessing: { title: "Batch PDF analysis", description: "Analyze whole directories of reports or documentation in seconds using structured local indexing." },
    customPrompts: { title: "Custom prompts library", description: "Save your recurring prompts for translation, legal clause analysis, or bullet-point summaries." },
    vectorSearch: { title: "Local Vector Search", description: "Find relevant paragraphs across hundreds of pages instantly using offline embedding models." },
    noSubscription: { title: "One-time purchase", description: "No monthly recurring charges. Pay once, run forever on your device." }
  },
  pricing: {
    sectionTitle: "Local AI, direct license.",
    freeTrial: {
      title: "Basic / Trial",
      price: "Free",
      features: { f1: "Process files up to 10 pages", f2: "Standard summarization", f3: "Local Hugging Face runtime", f4: "No internet required" },
      button: "Download Basic"
    },
    proLifetime: {
      title: "Pro Lifetime",
      price: "$29 one-time",
      features: { f1: "Unlimited file pages and sizes", f2: "Advanced vector search & Q&A", f3: "Full custom prompt library", f4: "Priority offline updates", f5: "Priority customer support" },
      button: "Buy Pro Lifetime"
    }
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    q1: { question: "Where are my files uploaded?", answer: "Nowhere. FileWhisperer AI operates entirely on your physical computer. The AI models run in-process using local CPU/GPU acceleration via ONNX runtime, so no text is ever transmitted over the network." },
    q2: { question: "What models does it use?", answer: "It is powered by local, highly-optimized open-source models like Llama-3-8B-Instruct (quantized) and lightweight embedding models from Hugging Face, running in a sandboxed Electron environment." },
    q3: { question: "Is there a monthly subscription?", answer: "No. We believe desktop software should be owned, not rented. FileWhisperer AI is a one-time purchase that includes lifetime updates for that major version." }
  }
};

// 3. Add ReceiptWhisperer AI keys
enData.receiptWhisperer = {
  page: {
    title: "ReceiptWhisperer AI — Private Offline Receipt Scanner & Expense Tracker",
    description: "Scan and track receipts locally with local AI. Private offline expense report generator for Chrome & Windows. Zero server storage.",
    ogTitle: "ReceiptWhisperer AI — Private Offline Receipt Scanner & Expense Tracker",
    ogDescription: "Scan and track receipts locally with local AI. Private offline expense report generator for Chrome & Windows. Zero server storage."
  },
  hero: {
    eyebrow: "DESKTOP APPLICATION",
    title: "Organize expenses.<br>Offline and secure.",
    subtitle: "Extract merchant details, dates, items, tax, and totals from receipt images and PDFs locally. Generate clean reports without any financial data going to the cloud.",
    buttonPrimary: "Get on Microsoft Store",
    buttonSecondary: "Get from Gumroad",
    disclaimer: "💻 Runs on Windows 10/11 · Fully offline · Local OCR"
  },
  howItWorks: {
    sectionTitle: "How It Works",
    step1: { title: "1. Import receipt scans", description: "Import PNG, JPG, or PDF scans of your receipts, invoices, or utility bills in one click." },
    step2: { title: "2. Offline OCR", description: "Lightweight local OCR models analyze text and isolate financial fields entirely on your device." },
    step3: { title: "3. Export sheets", description: "Classify items, tag expense groups, and export clean Excel or CSV reports ready for bookkeeping." }
  },
  features: {
    sectionTitle: "High-accuracy, local accounting.",
    worksOffline: { title: "Zero server dependency", description: "Process your business tax reports offline. No third-party API key, no slow cloud uploads." },
    privacyFirst: { title: "Financial isolation", description: "Keep your sensitive business income and personal expenditure completely secure in your own hands." },
    batchProcessing: { title: "Batch receipt scanning", description: "Import 50+ receipts simultaneously. Let the local pipeline categorize and structure them automatically." },
    customPrompts: { title: "Smart tax tagger", description: "Create rule-based triggers or local heuristics to automatically tag items for IRS/CRA classification." },
    vectorSearch: { title: "Dynamic budget graphing", description: "Visualize monthly costs and product trends offline with direct browser-embedded charting." },
    noSubscription: { title: "Permanent license", description: "No subscription fees. A single, solid desktop license runs on your desktop indefinitely." }
  },
  pricing: {
    sectionTitle: "No subscription, pay once.",
    freeTrial: {
      title: "Basic / Trial",
      price: "Free",
      features: { f1: "Process up to 20 receipts per month", f2: "Basic OCR field parsing", f3: "Single category tagging", f4: "No cloud sync" },
      button: "Download Basic"
    },
    proLifetime: {
      title: "Pro Lifetime",
      price: "$29 one-time",
      features: { f1: "Unlimited receipt uploads and processing", f2: "Full line-item itemization OCR", f3: "Advanced Excel/CSV/JSON exports", f4: "Multi-currency and exchange support", f5: "Priority customer support" },
      button: "Buy Pro Lifetime"
    }
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    q1: { question: "Is my bank information safe?", answer: "Yes. ReceiptWhisperer AI doesn't connect to bank APIs or sync with external servers. It reads documents and scans locally, leaving you in 100% control of your personal bank data." },
    q2: { question: "How does the OCR function?", answer: "It runs an optimized offline Tesseract and CNN pipeline built directly into the application runtime, enabling zero-latency recognition without cloud delays." },
    q3: { question: "Can I use it for tax audits?", answer: "Absolutely. Exported records include precise file links to matching receipt scans stored in your local directory, serving as clean, self-contained documentation for audits." }
  }
};

// 4. Add MeetingWhisperer AI keys
enData.meetingWhisperer = {
  page: {
    title: "MeetingWhisperer AI — Private Local Meeting Transcription & Notes",
    description: "High-accuracy local audio transcription. Convert audio files to text, summarize offline, and search meeting histories locally. Download from MS Store.",
    ogTitle: "MeetingWhisperer AI — Private Local Meeting Transcription & Notes",
    ogDescription: "High-accuracy local audio transcription. Convert audio files to text, summarize offline, and search meeting histories locally. Download from MS Store."
  },
  hero: {
    eyebrow: "DESKTOP APPLICATION",
    title: "Transcribe meetings.<br>Privately, offline.",
    subtitle: "Convert meeting audio, voice notes, and lectures into formatted text locally using Whisper. Generate instant AI summaries and action items with zero cloud storage.",
    buttonPrimary: "Get on Microsoft Store",
    buttonSecondary: "Get from Gumroad",
    disclaimer: "💻 Runs on Windows 10/11 · Fully offline · Local Whisper ASR"
  },
  howItWorks: {
    sectionTitle: "How It Works",
    step1: { title: "1. Import audio or video", description: "Drag and drop MP3, WAV, M4A, or MP4 files directly into the desktop dashboard." },
    step2: { title: "2. Local transcription", description: "Optimized Whisper models transcribe text locally, utilizing your system's hardware acceleration." },
    step3: { title: "3. AI analysis", description: "Generate action items, structure meeting notes, and run semantic search over your entire transcript vault." }
  },
  features: {
    sectionTitle: "Premium transcription, local cost.",
    worksOffline: { title: "Offline Whisper runtime", description: "Powered by whisper.cpp and ONNX acceleration. Get near-instant transcription speeds offline." },
    privacyFirst: { title: "Protected conversations", description: "Transcribe board meetings, strategic reviews, or legal consultations knowing zero voice data is shared." },
    batchProcessing: { title: "Speaker diarization", description: "Detect and label multiple speakers automatically from local acoustic profiles, locally." },
    customPrompts: { title: "Action item generator", description: "Extract clear tasks, deadlines, and responsibilities with preconfigured offline post-processing templates." },
    vectorSearch: { title: "Transcript Vault search", description: "Search all past transcribes using semantic query phrases (e.g. 'what did we decide about pricing?')." },
    noSubscription: { title: "Perpetual ownership", description: "A simple single payment replaces expensive monthly third-party web-based transcribers." }
  },
  pricing: {
    sectionTitle: "Own your transcriber.",
    freeTrial: {
      title: "Basic / Trial",
      price: "Free",
      features: { f1: "Transcribe up to 15 minutes per file", f2: "Standard transcription engine", f3: "Basic markdown export", f4: "No speaker labeling" },
      button: "Download Basic"
    },
    proLifetime: {
      title: "Pro Lifetime",
      price: "$29 one-time",
      features: { f1: "Unlimited transcription length", f2: "High-accuracy Whisper engines", f3: "Automated speaker diarization", f4: "Advanced Vault semantic search", f5: "Priority customer support" },
      button: "Buy Pro Lifetime"
    }
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    q1: { question: "How fast is local transcription?", answer: "It depends on your hardware. On modern laptops with dedicated GPUs or neural accelerators, a 1-hour recording typically transcribes in under 5 minutes. Standard CPUs process it in about 15-20 minutes." },
    q2: { question: "What languages are supported?", answer: "MeetingWhisperer AI supports over 30 languages, including English, Spanish, French, German, Japanese, Portuguese, Chinese, Hindi, Russian, and Korean." },
    q3: { question: "Can it run in the background?", answer: "Yes. Simply minimize the app while the local thread processes your audio queue. A desktop notification will alert you when your transcript is ready." }
  }
};

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');
console.log('Successfully updated locales/en.json');

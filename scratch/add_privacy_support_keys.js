const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, '..', 'locales', 'en.json');
const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// 1. Update privacyPolicy.nav
enData.privacyPolicy = enData.privacyPolicy || {};
enData.privacyPolicy.nav = enData.privacyPolicy.nav || {};
enData.privacyPolicy.nav.fileWhisperer = "FileWhisperer AI";
enData.privacyPolicy.nav.receiptWhisperer = "ReceiptWhisperer AI";
enData.privacyPolicy.nav.meetingWhisperer = "MeetingWhisperer AI";

// 2. Add privacyPolicy section keys
enData.privacyPolicy.fileWhisperer = {
  sectionTitle: "Donbrico FileWhisperer AI",
  whatWeCollect: {
    sectionTitle: "What data we collect",
    paragraph: "None. Your files are analyzed locally on your device. No document text, metadata, or analysis summaries are ever transmitted to Donbrico servers."
  },
  howStored: {
    sectionTitle: "How data is stored",
    paragraph: "All indexed content, embeddings, and chat histories are stored locally in an encrypted database on your personal computer."
  },
  thirdPartyAI: {
    sectionTitle: "Third-party AI providers (Bring Your Own Key)",
    paragraph: "FileWhisperer AI defaults to fully offline local models. If you configure a third-party API key, text segments relevant to your query are securely sent to that provider to generate replies."
  },
  permissions: {
    sectionTitle: "Permissions used",
    paragraph: "Local file system access (to read selected documents and save reports)."
  },
  dataDeletion: {
    sectionTitle: "Data deletion",
    paragraph: "Deleting your project folder or uninstalling the app permanently removes all local databases and indexes."
  }
};

enData.privacyPolicy.receiptWhisperer = {
  sectionTitle: "Donbrico ReceiptWhisperer AI",
  whatWeCollect: {
    sectionTitle: "What data we collect",
    paragraph: "None. Receipt scanning, text recognition, and category matching run fully in-process offline on your computer. Financial data is never shared."
  },
  howStored: {
    sectionTitle: "How data is stored",
    paragraph: "All OCR transactions, receipt paths, and budgeting summaries are stored locally in a local SQLite file."
  },
  thirdPartyAI: {
    sectionTitle: "Third-party AI providers (Bring Your Own Key)",
    paragraph: "Local OCR runs 100% offline. If you connect external models for advanced categorizations, the metadata is processed securely via that provider."
  },
  permissions: {
    sectionTitle: "Permissions used",
    paragraph: "File read/write access (to load receipt scans and write Excel sheets)."
  },
  dataDeletion: {
    sectionTitle: "Data deletion",
    paragraph: "Uninstalling the desktop application clears all local expense records."
  }
};

enData.privacyPolicy.meetingWhisperer = {
  sectionTitle: "Donbrico MeetingWhisperer AI",
  whatWeCollect: {
    sectionTitle: "What data we collect",
    paragraph: "None. All audio files, video files, and voice recordings are processed in-process using local Whisper engines. Your voice data is never sent to the internet."
  },
  howStored: {
    sectionTitle: "How data is stored",
    paragraph: "Meeting transcripts, speaker tags, and summarized text are saved inside the local Vault database on your computer."
  },
  thirdPartyAI: {
    sectionTitle: "Third-party AI providers (Bring Your Own Key)",
    paragraph: "Whisper transcription runs completely offline. If you choose external models for summarizing transcripts, only the text content is shared with that provider."
  },
  permissions: {
    sectionTitle: "Permissions used",
    paragraph: "Audio hardware access (microphone recording) and file read/write permissions."
  },
  dataDeletion: {
    sectionTitle: "Data deletion",
    paragraph: "Deleting a meeting from your local vault or uninstalling the app permanently purges the transcript data."
  }
};

// 3. Add support section keys
enData.support = enData.support || {};
enData.support.fileWhisperer = {
  sectionTitle: "FileWhisperer AI Support",
  subtitle: "Common Issues",
  q1: {
    question: "Why does the model download take so long?",
    answer: "On the first run, FileWhisperer AI downloads highly-optimized Llama-3 models (~2-4GB) to run completely offline. Depending on your internet speed, this might take several minutes, but once downloaded, you'll never need an internet connection again."
  },
  q2: {
    question: "What file types are supported?",
    answer: "Currently, FileWhisperer AI supports PDF documents (.pdf), rich text (.rtf), Word documents (.docx), text files (.txt), markdown (.md), and Excel/CSV spreadsheets."
  }
};

enData.support.receiptWhisperer = {
  sectionTitle: "ReceiptWhisperer AI Support",
  subtitle: "Common Issues",
  q1: {
    question: "The OCR engine skipped some items on my receipt",
    answer: "Extremely blurry scans, crumpled paper, or handwriting can lower OCR accuracy. Try straightening the receipt and scanning under good lighting. You can always manually double-click any parsed field to edit values directly."
  },
  q2: {
    question: "How do I backup my expense data?",
    answer: "Go to Settings in the application and click 'Export Expense Vault'. This exports a self-contained database backup (.db) along with all categorized receipt images in a single ZIP archive."
  }
};

enData.support.meetingWhisperer = {
  sectionTitle: "MeetingWhisperer AI Support",
  subtitle: "Common Issues",
  q1: {
    question: "My video file is taking too long to transcribe",
    answer: "High-definition video files can take longer to load. MeetingWhisperer AI automatically extracts the audio track first to save resources. Check your system's hardware acceleration in Settings — selecting CUDA (NVIDIA) or DirectML can speed up Whisper by up to 5x."
  },
  q2: {
    question: "How do I improve speaker identification?",
    answer: "Local speaker diarization works best when speakers do not overlap or interrupt frequently. You can name detected speaker profiles (e.g. 'Speaker 1' -> 'Alice') in the audio transcript editor to update the names globally."
  }
};

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');
console.log("Successfully updated locales/en.json with privacy and support keys!");

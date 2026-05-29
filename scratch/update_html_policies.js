const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// 1. Update privacy-policy/index.html
const privacyPath = path.join(ROOT, 'privacy-policy', 'index.html');
if (fs.existsSync(privacyPath)) {
  let html = fs.readFileSync(privacyPath, 'utf8');
  
  // Check if already updated
  if (!html.includes('id="file-whisperer"')) {
    // Add subnav items
    const subnavTarget = '<a href="#website" data-i18n="privacyPolicy.nav.website"';
    const subnavAdditions = `<a href="#file-whisperer" data-i18n="privacyPolicy.nav.fileWhisperer">FileWhisperer AI</a>
        <a href="#receipt-whisperer" data-i18n="privacyPolicy.nav.receiptWhisperer">ReceiptWhisperer AI</a>
        <a href="#meeting-whisperer" data-i18n="privacyPolicy.nav.meetingWhisperer">MeetingWhisperer AI</a>\n        `;
    html = html.replace(subnavTarget, subnavAdditions + subnavTarget);
    
    // Add sections before #website
    const sectionTarget = '<section style="padding: var(--spacing-xl) 0" id="website">';
    const sectionAdditions = `    <section style="padding: var(--spacing-xl) 0" id="file-whisperer">
      <div class="container">
        <h2 data-i18n="privacyPolicy.fileWhisperer.sectionTitle">Donbrico FileWhisperer AI</h2>
        <h3 data-i18n="privacyPolicy.fileWhisperer.whatWeCollect.sectionTitle">What data we collect</h3>
        <p data-i18n="privacyPolicy.fileWhisperer.whatWeCollect.paragraph">None. Your files are analyzed locally on your device. No document text, metadata, or analysis summaries are ever transmitted to Donbrico servers.</p>
        <h3 data-i18n="privacyPolicy.fileWhisperer.howStored.sectionTitle">How data is stored</h3>
        <p data-i18n="privacyPolicy.fileWhisperer.howStored.paragraph">All indexed content, embeddings, and chat histories are stored locally in an encrypted database on your personal computer.</p>
        <h3 data-i18n="privacyPolicy.fileWhisperer.thirdPartyAI.sectionTitle">Third-party AI providers (Bring Your Own Key)</h3>
        <p data-i18n="privacyPolicy.fileWhisperer.thirdPartyAI.paragraph">FileWhisperer AI defaults to fully offline local models. If you configure a third-party API key, text segments relevant to your query are securely sent to that provider to generate replies.</p>
        <h3 data-i18n="privacyPolicy.fileWhisperer.permissions.sectionTitle">Permissions used</h3>
        <p data-i18n="privacyPolicy.fileWhisperer.permissions.paragraph">Local file system access (to read selected documents and save reports).</p>
        <h3 data-i18n="privacyPolicy.fileWhisperer.dataDeletion.sectionTitle">Data deletion</h3>
        <p data-i18n="privacyPolicy.fileWhisperer.dataDeletion.paragraph">Deleting your project folder or uninstalling the app permanently removes all local databases and indexes.</p>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0" id="receipt-whisperer">
      <div class="container">
        <h2 data-i18n="privacyPolicy.receiptWhisperer.sectionTitle">Donbrico ReceiptWhisperer AI</h2>
        <h3 data-i18n="privacyPolicy.receiptWhisperer.whatWeCollect.sectionTitle">What data we collect</h3>
        <p data-i18n="privacyPolicy.receiptWhisperer.whatWeCollect.paragraph">None. Receipt scanning, text recognition, and category matching run fully in-process offline on your computer. Financial data is never shared.</p>
        <h3 data-i18n="privacyPolicy.receiptWhisperer.howStored.sectionTitle">How data is stored</h3>
        <p data-i18n="privacyPolicy.receiptWhisperer.howStored.paragraph">All OCR transactions, receipt paths, and budgeting summaries are stored locally in a local SQLite file.</p>
        <h3 data-i18n="privacyPolicy.receiptWhisperer.thirdPartyAI.sectionTitle">Third-party AI providers (Bring Your Own Key)</h3>
        <p data-i18n="privacyPolicy.receiptWhisperer.thirdPartyAI.paragraph">Local OCR runs 100% offline. If you connect external models for advanced categorizations, the metadata is processed securely via that provider.</p>
        <h3 data-i18n="privacyPolicy.receiptWhisperer.permissions.sectionTitle">Permissions used</h3>
        <p data-i18n="privacyPolicy.receiptWhisperer.permissions.paragraph">File read/write access (to load receipt scans and write Excel sheets).</p>
        <h3 data-i18n="privacyPolicy.receiptWhisperer.dataDeletion.sectionTitle">Data deletion</h3>
        <p data-i18n="privacyPolicy.receiptWhisperer.dataDeletion.paragraph">Uninstalling the desktop application clears all local expense records.</p>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0" id="meeting-whisperer">
      <div class="container">
        <h2 data-i18n="privacyPolicy.meetingWhisperer.sectionTitle">Donbrico MeetingWhisperer AI</h2>
        <h3 data-i18n="privacyPolicy.meetingWhisperer.whatWeCollect.sectionTitle">What data we collect</h3>
        <p data-i18n="privacyPolicy.meetingWhisperer.whatWeCollect.paragraph">None. All audio files, video files, and voice recordings are processed in-process using local Whisper engines. Your voice data is never sent to the internet.</p>
        <h3 data-i18n="privacyPolicy.meetingWhisperer.howStored.sectionTitle">How data is stored</h3>
        <p data-i18n="privacyPolicy.meetingWhisperer.howStored.paragraph">Meeting transcripts, speaker tags, and summarized text are saved inside the local Vault database on your computer.</p>
        <h3 data-i18n="privacyPolicy.meetingWhisperer.thirdPartyAI.sectionTitle">Third-party AI providers (Bring Your Own Key)</h3>
        <p data-i18n="privacyPolicy.meetingWhisperer.thirdPartyAI.paragraph">Whisper transcription runs completely offline. If you choose external models for summarizing transcripts, only the text content is shared with that provider.</p>
        <h3 data-i18n="privacyPolicy.meetingWhisperer.permissions.sectionTitle">Permissions used</h3>
        <p data-i18n="privacyPolicy.meetingWhisperer.permissions.paragraph">Audio hardware access (microphone recording) and file read/write permissions.</p>
        <h3 data-i18n="privacyPolicy.meetingWhisperer.dataDeletion.sectionTitle">Data deletion</h3>
        <p data-i18n="privacyPolicy.meetingWhisperer.dataDeletion.paragraph">Deleting a meeting from your local vault or uninstalling the app permanently purges the transcript data.</p>
      </div>
    </section>\n\n    `;
    
    html = html.replace(sectionTarget, sectionAdditions + sectionTarget);
    fs.writeFileSync(privacyPath, html, 'utf8');
    console.log("Successfully updated privacy-policy/index.html!");
  } else {
    console.log("privacy-policy/index.html is already updated.");
  }
}

// 2. Update support/index.html
const supportPath = path.join(ROOT, 'support', 'index.html');
if (fs.existsSync(supportPath)) {
  let html = fs.readFileSync(supportPath, 'utf8');
  
  if (!html.includes('support.fileWhisperer.sectionTitle')) {
    // Inject before nullCarrier support
    const targetSection = '<section style="padding: var(--spacing-xl) 0">\n      <div class="container">\n        <h2 data-i18n="support.nullCarrier.sectionTitle">';
    const newSupportSections = `    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <h2 data-i18n="support.fileWhisperer.sectionTitle">
          FileWhisperer AI Support
        </h2>
        <h3 data-i18n="support.fileWhisperer.subtitle">Common Issues</h3>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.fileWhisperer.q1.question">
            Why does the model download take so long?
          </summary>
          <p data-i18n="support.fileWhisperer.q1.answer">
            On the first run, FileWhisperer AI downloads highly-optimized Llama-3 models (~2-4GB) to run completely offline. Depending on your internet speed, this might take several minutes, but once downloaded, you'll never need an internet connection again.
          </p>
        </details>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.fileWhisperer.q2.question">
            What file types are supported?
          </summary>
          <p data-i18n="support.fileWhisperer.q2.answer">
            Currently, FileWhisperer AI supports PDF documents (.pdf), rich text (.rtf), Word documents (.docx), text files (.txt), markdown (.md), and Excel/CSV spreadsheets.
          </p>
        </details>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <h2 data-i18n="support.receiptWhisperer.sectionTitle">
          ReceiptWhisperer AI Support
        </h2>
        <h3 data-i18n="support.receiptWhisperer.subtitle">Common Issues</h3>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.receiptWhisperer.q1.question">
            The OCR engine skipped some items on my receipt
          </summary>
          <p data-i18n="support.receiptWhisperer.q1.answer">
            Extremely blurry scans, crumpled paper, or handwriting can lower OCR accuracy. Try straightening the receipt and scanning under good lighting. You can always manually double-click any parsed field to edit values directly.
          </p>
        </details>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.receiptWhisperer.q2.question">
            How do I backup my expense data?
          </summary>
          <p data-i18n="support.receiptWhisperer.q2.answer">
            Go to Settings in the application and click 'Export Expense Vault'. This exports a self-contained database backup (.db) along with all categorized receipt images in a single ZIP archive.
          </p>
        </details>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <h2 data-i18n="support.meetingWhisperer.sectionTitle">
          MeetingWhisperer AI Support
        </h2>
        <h3 data-i18n="support.meetingWhisperer.subtitle">Common Issues</h3>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.meetingWhisperer.q1.question">
            My video file is taking too long to transcribe
          </summary>
          <p data-i18n="support.meetingWhisperer.q1.answer">
            High-definition video files can take longer to load. MeetingWhisperer AI automatically extracts the audio track first to save resources. Check your system's hardware acceleration in Settings — selecting CUDA (NVIDIA) or DirectML can speed up Whisper by up to 5x.
          </p>
        </details>
        <details style="margin-bottom: var(--spacing-md)">
          <summary style="cursor: pointer; font-weight: 600" data-i18n="support.meetingWhisperer.q2.question">
            How do I improve speaker identification?
          </summary>
          <p data-i18n="support.meetingWhisperer.q2.answer">
            Local speaker diarization works best when speakers do not overlap or interrupt frequently. You can name detected speaker profiles (e.g. 'Speaker 1' -> 'Alice') in the audio transcript editor to update the names globally.
          </p>
        </details>
      </div>
    </section>\n\n    `;
    
    html = html.replace(targetSection, newSupportSections + targetSection);
    fs.writeFileSync(supportPath, html, 'utf8');
    console.log("Successfully updated support/index.html!");
  } else {
    console.log("support/index.html is already updated.");
  }
}

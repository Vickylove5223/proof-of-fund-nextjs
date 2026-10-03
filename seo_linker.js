const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'content', 'posts');

const internalLinks = [
  { keyword: "Canada study permit", url: "/proof-of-funds-for-canada-student-visa-from-nigeria-complete-guide" },
  { keyword: "Canada Express Entry", url: "/proof-of-funds-for-canada-express-entry-2026" },
  { keyword: "UK student visa", url: "/uk-student-visa-proof-of-funds-nigeria-28-day-rule" },
  { keyword: "Schengen visa", url: "/schengen-visa-bank-statement-requirements-from-nigeria-6-months" },
  { keyword: "Deed of Gift", url: "/how-to-use-a-deed-of-gift-for-your-canada-visa-proof-of-funds" },
  { keyword: "microfinance bank", url: "/why-you-should-never-use-a-microfinance-bank-for-your-study-visa-proof-of-funds" },
  { keyword: "Globus Bank", url: "/globus-bank-proof-of-funds-nairaland" },
  { keyword: "Zenith Bank", url: "/can-i-use-zenith-bank-for-proof-of-funds" },
  { keyword: "Proof of Funds NG", url: "/" }
];

const externalLinks = [
  { keyword: "IRCC", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
  { keyword: "UKVI", url: "https://www.gov.uk/government/organisations/uk-visas-and-immigration" },
  { keyword: "OANDA", url: "https://www.oanda.com/currency-converter/en/" },
  { keyword: "Schengen Area", url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en" },
  { keyword: "Central Bank of Nigeria", url: "https://www.cbn.gov.ng/" }
];

let filesModified = 0;

fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Separate frontmatter and body
    let match = content.match(/^(---\r?\n[\s\S]*?\r?\n---)\r?\n([\s\S]*)$/);
    if (!match) return;

    let front = match[1];
    let body = match[2];

    // 1. Tokenize existing links so we don't mess them up
    let tokens = [];
    body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (fullMatch) => {
      tokens.push(fullMatch);
      return `__LINK_${tokens.length - 1}__`;
    });

    // Tokenize headings so we don't link inside headings
    body = body.replace(/^(#+ .*)$/gm, (fullMatch) => {
      tokens.push(fullMatch);
      return `__LINK_${tokens.length - 1}__`;
    });

    // Tokenize HTML links just in case
    body = body.replace(/<a [^>]+>.*?<\/a>/g, (fullMatch) => {
      tokens.push(fullMatch);
      return `__LINK_${tokens.length - 1}__`;
    });

    // 2. Apply Internal Links (Max 1 per keyword per file)
    internalLinks.forEach(link => {
      const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
      if (regex.test(body)) {
        body = body.replace(regex, (match) => `[${match}](${link.url})`);
      }
    });

    // 3. Apply External Links (Max 1 per keyword per file)
    externalLinks.forEach(link => {
      const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
      if (regex.test(body)) {
        body = body.replace(regex, (match) => `[${match}](${link.url})`);
      }
    });

    // 4. Restore tokens
    for (let i = tokens.length - 1; i >= 0; i--) {
      body = body.replace(`__LINK_${i}__`, tokens[i]);
    }

    content = front + '\n' + body;

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
    }
  }
});

console.log(`Successfully added SEO hyperlinks to ${filesModified} files.`);

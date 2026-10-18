import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://furpony.hachile.org';
export const languages = ['zh', 'en', 'de'];
export const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
export const route = (lang, slug = '') => `${lang === 'zh' ? '/' : `/${lang}/`}${slug ? `articles/${slug}/` : ''}`;
const text = {
  zh: {
    htmlLang:'zh-CN', title:'Furpony Institute / Furry 与 Brony 文化札记', description:'研究 Furry 与 Brony 的文化异同，以及两者之间的关系。一个开放投稿的独立文化博客。',
    skip:'跳到正文', journal:'文章', about:'关于', contribute:'投稿', eyebrow:'独立文化札记 / EST. 2026', hero:'在 Furry 与 Brony 之间，<br><em>寻找共同的问题。</em>', intro:'关于两种文化的相似与差异，关于它们如何相遇。Furpony Institute 从文章开始，记录社群、创作与认同，也为不同的经验留出位置。', browse:'阅读文化札记', diagram:'两个社群 / 一场持续的对话', latest:'文章与观察', count:'篇文章', read:'阅读全文', minutes:'分钟阅读', culture:'文化观察', aboutLabel:'关于这个计划', aboutTitle:'从社群出发，<br>把问题留在桌面上。', aboutCopy:'Furpony Institute 是一个独立的文化写作与讨论计划，关注 Furry 与 Brony 的文化异同，以及两者之间的关系。这里既容纳参与者的个人观察，也欢迎文化比较、创作记录、访谈与回应文章。我们希望让经验成为讨论的起点，让观点之间发生对话。', topics:['身份与归属','消费与创作','社群与边界','Furry × Brony'], submitLabel:'开放投稿', submitTitle:'来信，投稿，<br>或者一起提问。', submitCopy:'欢迎分享你的文章、观察和不同意见。投稿请附标题、正文、希望使用的署名，以及需要保留的出处或参考资料。请在来信中说明是否同意公开发布和翻译。', email:'投稿邮箱', group:'Furpony Institüt / QQ 交流群', qq:'直接联系 / QQ', copy:'点击复制', copied:'已复制', manual:'请手动复制', contactNote:'邮件为主要投稿入口。群号和 QQ 号码可点击复制。', home:'Gunpowder 的主页', project:'Hachile 站点目录', feed:'订阅 RSS', back:'返回文章列表', original:'中文原文', translated:'本页为中文原文的译文。', reply:'欢迎回应本文，或向我们投稿。', contactLink:'联系 Furpony Institute', editorial:'文化札记', field:'关于归属的笔记', footer:'独立文化写作与讨论', published:'发布于'
  },
  en: {
    htmlLang:'en', title:'Furpony Institute / Furry & Brony culture notes', description:'An independent journal exploring similarities, differences, and relationships between Furry and Brony cultures. Open for contributions.',
    skip:'Skip to content', journal:'Journal', about:'About', contribute:'Contribute', eyebrow:'INDEPENDENT CULTURE NOTES / EST. 2026', hero:'Between Furry and Brony.<br><em>Questions in common.</em>', intro:'Two cultures, their differences, and the places they meet. Furpony Institute begins with writing: notes on communities, creativity, and belonging, with room for different experiences.', browse:'Read the journal', diagram:'TWO COMMUNITIES / AN ONGOING CONVERSATION', latest:'Essays & observations', count:'article', read:'Read the essay', minutes:'min read', culture:'Culture notes', aboutLabel:'ABOUT THE PROJECT', aboutTitle:'From within communities.<br>Open to questions.', aboutCopy:'Furpony Institute is an independent writing and discussion project exploring similarities, differences, and relationships between Furry and Brony cultures. We welcome personal observations, cultural comparisons, creative journals, interviews, and responses. Lived experience can start a conversation; different views can keep it going.', topics:['Identity & belonging','Consumption & creativity','Communities & boundaries','Furry × Brony'], submitLabel:'OPEN FOR CONTRIBUTIONS', submitTitle:'Write to us.<br>Or ask a question.', submitCopy:'Essays, observations, and different perspectives are welcome. Please include a title, your text, your preferred byline, and any sources or references. Tell us whether you consent to publication and translation.', email:'SUBMISSIONS', group:'Furpony Institüt / QQ community', qq:'DIRECT CONTACT / QQ', copy:'click to copy', copied:'Copied', manual:'copy manually', contactNote:'Email is the main submission channel. Click the QQ numbers to copy them.', home:'Gunpowder’s homepage', project:'The Hachile Project', feed:'RSS feed', back:'Back to the journal', original:'Chinese original', translated:'Translated from the Chinese original.', reply:'Responses to this essay and new contributions are welcome.', contactLink:'Contact Furpony Institute', editorial:'CULTURE NOTES', field:'Notes on belonging', footer:'Independent cultural writing & discussion', published:'Published'
  },
  de: {
    htmlLang:'de', title:'Furpony Institute / Notizen zu Furry- und Brony-Kultur', description:'Ein unabhängiges Journal über Gemeinsamkeiten, Unterschiede und Beziehungen zwischen Furry- und Brony-Kultur. Beiträge sind willkommen.',
    skip:'Zum Inhalt springen', journal:'Beiträge', about:'Über uns', contribute:'Einreichen', eyebrow:'UNABHÄNGIGE KULTURNOTIZEN / SEIT 2026', hero:'Zwischen Furry und Brony.<br><em>Gemeinsame Fragen.</em>', intro:'Zwei Kulturen, ihre Unterschiede und ihre Berührungspunkte. Das Furpony Institute beginnt mit Texten: über Gemeinschaften, Kreativität und Zugehörigkeit — mit Raum für unterschiedliche Erfahrungen.', browse:'Beiträge lesen', diagram:'ZWEI GEMEINSCHAFTEN / EIN FORTLAUFENDES GESPRÄCH', latest:'Essays & Beobachtungen', count:'Beitrag', read:'Essay lesen', minutes:'Min. Lesezeit', culture:'Kulturbeobachtungen', aboutLabel:'ÜBER DAS PROJEKT', aboutTitle:'Aus den Communitys.<br>Offen für Fragen.', aboutCopy:'Das Furpony Institute ist ein unabhängiges Schreib- und Diskussionsprojekt zu Gemeinsamkeiten, Unterschieden und Beziehungen zwischen Furry- und Brony-Kultur. Persönliche Beobachtungen sind ebenso willkommen wie Kulturvergleiche, Werkstattberichte, Interviews und Erwiderungen. Erfahrungen können ein Gespräch eröffnen; verschiedene Sichtweisen können es weiterführen.', topics:['Identität & Zugehörigkeit','Konsum & Kreativität','Communitys & Grenzen','Furry × Brony'], submitLabel:'BEITRÄGE WILLKOMMEN', submitTitle:'Schreib uns.<br>Oder stell eine Frage.', submitCopy:'Wir freuen uns über Essays, Beobachtungen und andere Perspektiven. Bitte sende Titel, Text, die gewünschte Namensangabe sowie Quellen oder Literaturhinweise. Teile uns mit, ob du einer Veröffentlichung und Übersetzung zustimmst.', email:'BEITRÄGE PER E-MAIL', group:'Furpony Institüt / QQ-Gruppe', qq:'DIREKTER KONTAKT / QQ', copy:'zum Kopieren klicken', copied:'Kopiert', manual:'bitte manuell kopieren', contactNote:'E-Mail ist der wichtigste Weg zum Einreichen. Die QQ-Nummern lassen sich per Klick kopieren.', home:'Gunpowders Homepage', project:'The Hachile Project', feed:'RSS-Feed', back:'Zur Beitragsübersicht', original:'Chinesisches Original', translated:'Aus dem chinesischen Original übersetzt.', reply:'Erwiderungen und neue Beiträge sind willkommen.', contactLink:'Furpony Institute kontaktieren', editorial:'KULTURNOTIZEN', field:'Notizen zur Zugehörigkeit', footer:'Unabhängige Kulturtexte & Diskussion', published:'Veröffentlicht am'
  }
};

export function validatePost(post) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error('Invalid article slug');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(post.date))) throw new Error('Invalid article date');
  for (const lang of languages) {
    const item = post.translations?.[lang];
    if (!item?.title || !item?.description || !Array.isArray(item.body) || !item.body.length) throw new Error(`Missing ${lang} article content`);
    for (const block of item.body) {
      if (typeof block === 'string' && block.trim()) continue;
      if (block && Array.isArray(block.list) && block.list.length && block.list.every(line => typeof line === 'string' && line.trim())) continue;
      throw new Error(`Invalid ${lang} article block`);
    }
  }
}

function readingTime(body, lang) {
  const content = body.flatMap(block => typeof block === 'string' ? block : block.list).join(' ');
  return Math.max(1, Math.ceil(lang === 'zh' ? content.length / 450 : content.split(/\s+/).length / 220));
}

function langLinks(lang, slug) {
  return `<nav class="languages" aria-label="Language">${[['de','DE'],['en','EN'],['zh','中文']].map(([key,label]) => `<a href="${route(key,slug)}" lang="${text[key].htmlLang}" hreflang="${text[key].htmlLang}"${key === lang ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}
function header(lang, slug) {
  const t = text[lang], home = route(lang);
  return `<a class="skip" href="#main">${t.skip}</a><header class="header wrap"><a class="brand" href="${home}" aria-label="Furpony Institute"><img src="/assets/mark.svg" width="43" height="43" alt=""><span><strong>Furpony</strong><small>INSTITUTE</small></span></a><div class="header-right"><nav class="nav" aria-label="${t.journal}"><a href="${home}#journal">${t.journal}</a><a href="${home}#about">${t.about}</a><a href="${home}#contribute">${t.contribute}</a></nav>${langLinks(lang,slug)}</div></header>`;
}
function footer(lang) {
  const t = text[lang];
  return `<footer class="footer wrap"><span>© 2026 Furpony Institute / ${t.footer}</span><div class="footer-links"><a href="https://home.hachile.org/">${t.home}</a><a href="https://site.hachile.org/">${t.project}</a><a href="${route(lang)}feed.xml">${t.feed}</a></div></footer>`;
}
function submission(lang) {
  const t = text[lang];
  return `<section class="submission" id="contribute" aria-labelledby="contribute-title"><div><span class="label">${t.submitLabel}</span><h2 id="contribute-title">${t.submitTitle}</h2><p>${t.submitCopy}</p></div><div><div class="contact-row"><span class="label">${t.email}</span><a href="mailto:hejiale.ai@outlook.com?subject=Furpony%20Institute%20Submission">hejiale.ai@outlook.com</a></div>${[[t.group,'1130961239'],[t.qq,'1213956808']].map(([label,number]) => `<div class="contact-row"><span class="label">${label}</span><button type="button" data-copy="${number}" data-copied="${t.copied}" data-manual="${t.manual}" aria-live="polite">${number} / ${t.copy}</button></div>`).join('')}<p class="contact-note">${t.contactNote}</p></div></section>`;
}
function layout(lang, title, description, content, slug = '') {
  const url = origin + route(lang,slug);
  return `<!doctype html>\n<html lang="${text[lang].htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f5f1e8"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${url}">${languages.map(key => `<link rel="alternate" hreflang="${text[key].htmlLang}" href="${origin}${route(key,slug)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${origin}${route('zh',slug)}"><meta property="og:type" content="${slug ? 'article' : 'website'}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Furpony Institute"><link rel="icon" type="image/svg+xml" href="/assets/mark.svg"><link rel="stylesheet" href="/assets/site.css"><link rel="alternate" type="application/rss+xml" title="Furpony Institute" href="${route(lang)}feed.xml"><script src="/assets/site.js" defer></script></head><body>${header(lang,slug)}${content}${footer(lang)}</body></html>\n`;
}
function homePage(lang, posts) {
  const t = text[lang];
  const cards = posts.map((post,i) => {
    const item = post.translations[lang];
    return `<article class="post-card"><span class="post-number">${String(i+1).padStart(2,'0')}</span><div><div class="post-meta"><span class="category">${t.culture}</span><time datetime="${post.date}">${post.date.replaceAll('-','.')} </time><span>${readingTime(item.body,lang)} ${t.minutes}</span></div><h3><a href="${route(lang,post.slug)}">${escape(item.title)}</a></h3><p class="post-excerpt">${escape(item.description)}</p><a class="text-link" href="${route(lang,post.slug)}">${t.read}</a></div><a class="post-art" href="${route(lang,post.slug)}" tabindex="-1" aria-hidden="true"><span class="label">FURPONY / FIELDNOTES ${String(i+1).padStart(3,'0')}</span><strong>${t.field}</strong><small>IDENTITY. CULTURE. COMMUNITY.</small></a></article>`;
  }).join('');
  return layout(lang,t.title,t.description,`<main class="wrap" id="main"><section class="hero"><div><p class="eyebrow">${t.eyebrow}</p><h1>${t.hero}</h1><p class="intro">${t.intro}</p><a class="text-link" href="#journal">${t.browse}</a></div><div class="field" aria-hidden="true"><div class="field-grid"></div><span class="field-corner">FIG. 01 / A MEETING PLACE</span><div class="field-circle one"></div><div class="field-circle two"></div><span class="field-word furry">Furry</span><span class="field-word brony">Brony</span><span class="field-center">&</span><span class="field-note">${t.diagram}</span></div></section><section id="journal" aria-labelledby="journal-title"><div class="section-bar"><h2 id="journal-title">${t.latest}</h2><span>${String(posts.length).padStart(2,'0')} ${t.count} / VOL. 01</span></div>${cards}</section><section class="about" id="about"><div><span class="label">${t.aboutLabel}</span><h2>${t.aboutTitle}</h2></div><div class="about-copy"><p>${t.aboutCopy}</p><div class="topics">${t.topics.map(topic => `<span>${topic}</span>`).join('')}</div></div></section>${submission(lang)}</main>`);
}
export function articlePage(lang, post, number = 1) {
  const t = text[lang], item = post.translations[lang];
  const body = item.body.map(block => typeof block === 'string' ? `<p>${escape(block)}</p>` : `<ul>${block.list.map(line => `<li>${escape(line)}</li>`).join('')}</ul>`).join('\n');
  return layout(lang,`${item.title} / Furpony Institute`,item.description,`<main class="wrap" id="main"><header class="article-head"><a class="back-link" href="${route(lang)}#journal">← ${t.back}</a><div class="post-meta"><span class="category">${t.culture}</span><time datetime="${post.date}">${t.published} ${post.date.replaceAll('-','.')}</time><span>${readingTime(item.body,lang)} ${t.minutes}</span></div><h1>${escape(item.title)}</h1><p class="dek">${escape(item.description)}</p><div class="translation-note">${lang === 'zh' ? t.original : `${t.translated} <a href="${route('zh',post.slug)}" lang="zh-CN">${t.original}</a>`}</div></header><div class="article-layout"><aside class="article-margin"><strong>${String(number).padStart(2,'0')}</strong><span>FURPONY<br>FIELDNOTES<br>VOL. 01</span></aside><article class="article-body" lang="${t.htmlLang}">${body}<div class="article-end">${t.reply} <a href="${route(lang)}#contribute">${t.contactLink}</a></div></article></div></main>`,post.slug);
}
function feed(lang, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Furpony Institute</title><link>${origin}${route(lang)}</link><description>${escape(text[lang].description)}</description><language>${text[lang].htmlLang}</language>${posts.map(post => `<item><title>${escape(post.translations[lang].title)}</title><link>${origin}${route(lang,post.slug)}</link><guid>${origin}${route(lang,post.slug)}</guid><pubDate>${new Date(`${post.date}T04:00:00Z`).toUTCString()}</pubDate><description>${escape(post.translations[lang].description)}</description></item>`).join('')}</channel></rss>`;
}
function output(path, content) {
  const file = resolve(root,path);
  mkdirSync(dirname(file),{recursive:true});
  writeFileSync(file,content);
}
export function build() {
  const posts = readdirSync(resolve(root,'content/posts')).filter(name => name.endsWith('.json')).map(name => JSON.parse(readFileSync(resolve(root,'content/posts',name),'utf8'))).sort((a,b) => b.date.localeCompare(a.date));
  const slugs = new Set();
  for (const post of posts) { validatePost(post); if (slugs.has(post.slug)) throw new Error('Duplicate article slug'); slugs.add(post.slug); }
  for (const lang of languages) {
    output(`${route(lang).slice(1)}index.html`,homePage(lang,posts));
    output(`${route(lang).slice(1)}feed.xml`,feed(lang,posts));
    posts.forEach((post,i) => output(`${route(lang,post.slug).slice(1)}index.html`,articlePage(lang,post,posts.length-i)));
  }
  const urls = languages.flatMap(lang => [route(lang),...posts.map(post => route(lang,post.slug))]);
  output('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
  output('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Built ${posts.length} article(s) in ${languages.length} languages.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) build();

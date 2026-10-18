import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validatePost, articlePage, languages, route } from './build.mjs';

test('article output preserves source text, escapes HTML, and switches to the same article', () => {
  const post = JSON.parse(readFileSync(new URL('../content/posts/consumption-and-belonging.json',import.meta.url),'utf8'));
  validatePost(post);
  for (const lang of languages) {
    const html = articlePage(lang,post);
    for (const target of languages) assert.ok(html.includes(`href="${route(target,post.slug)}"`));
    assert.ok(html.includes(post.translations[lang].title));
  }
  const hostile = structuredClone(post);
  hostile.translations.zh.body = ['<script>alert("no")</script>'];
  assert.ok(articlePage('zh',hostile).includes('&lt;script&gt;'));
  assert.ok(!articlePage('zh',hostile).includes('<script>alert'));
  assert.throws(() => validatePost({...post,slug:'../escape'}));
  assert.throws(() => validatePost({...post,translations:{zh:post.translations.zh}}));
});

import fs from 'fs';
import path from 'path';
import Sermon from '../models/Sermon';

export const SECTION_BY_CATEGORY = {
  faith: 1, 'the-word': 2, prayer: 3, 'holy-spirit': 4, leadership: 5, ministry: 6,
};

const LABEL = {
  faith: 'Faith', 'the-word': 'The Word', prayer: 'Prayer',
  'holy-spirit': 'The Holy Spirit', leadership: 'Leadership', ministry: 'Ministry',
};

// Files must be named  <category>-<number>.mp3  e.g. faith-01.mp3, the-word-03.mp3
export async function syncSermonsFromAudio() {
  const dir = path.join(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(dir)) return { synced: 0, skipped: [] };

  const files = fs.readdirSync(dir).filter((f) => /\.(mp3|m4a|wav|ogg)$/i.test(f));
  const re = /^(faith|the-word|prayer|holy-spirit|leadership|ministry)-(\d+)\.[a-z0-9]+$/i;
  const parsed = [];
  const skipped = [];

  files.forEach((file) => {
    const m = file.match(re);
    if (!m) return skipped.push(file);
    parsed.push({ file, category: m[1].toLowerCase(), order: parseInt(m[2], 10) });
  });

  parsed.sort(
    (a, b) =>
      SECTION_BY_CATEGORY[a.category] - SECTION_BY_CATEGORY[b.category] || a.order - b.order
  );

  for (let i = 0; i < parsed.length; i++) {
    const p = parsed[i];
    const slug = `${p.category}-${String(p.order).padStart(2, '0')}`;
    await Sermon.updateOne(
      { slug },
      {
        $set: { number: i + 1, audioUrl: `/audio/${p.file}` },
        $setOnInsert: {
          title: `${LABEL[p.category]} — Message ${p.order}`,
          slug,
          speaker: '',
          category: p.category,
          section: SECTION_BY_CATEGORY[p.category],
          order: p.order,
        },
      },
      { upsert: true }
    );
  }
  return { synced: parsed.length, skipped };
}
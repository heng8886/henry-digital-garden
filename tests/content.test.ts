import { describe, expect, it } from 'vitest';
import {
  buildArchiveMeta,
  createSearchDocument,
  sortEntriesByDate,
  type ArchiveEntry,
} from '../src/lib/content';

const fixtures: ArchiveEntry[] = [
  {
    id: 'bookmarks/visual-atlas',
    collection: 'bookmarks',
    section: '网站收藏',
    title: 'Visual Atlas',
    summary: '很适合收集视觉设计灵感的目录站。',
    category: '设计',
    tags: ['设计', '灵感'],
    date: '2026-03-10',
    permalink: '/bookmarks/visual-atlas/',
    externalUrl: 'https://example.com/atlas',
  },
  {
    id: 'notes/reading-rhythm',
    collection: 'notes',
    section: '笔记',
    title: '关于慢阅读的笔记',
    summary: '记录我如何整理电子阅读节奏。',
    category: '阅读',
    tags: ['阅读', '方法'],
    date: '2026-04-01',
    permalink: '/notes/reading-rhythm/',
  },
  {
    id: 'essays/april-wind',
    collection: 'essays',
    section: '花园随想',
    title: '四月的风和内容整理',
    summary: '把收藏和写作放进一个长期维护的系统。',
    category: '随想',
    tags: ['写作', '系统'],
    date: '2025-12-31',
    permalink: '/garden/april-wind/',
  },
];

describe('sortEntriesByDate', () => {
  it('orders entries from newest to oldest', () => {
    const sorted = sortEntriesByDate(fixtures);
    expect(sorted.map((entry) => entry.id)).toEqual([
      'notes/reading-rhythm',
      'bookmarks/visual-atlas',
      'essays/april-wind',
    ]);
  });
});

describe('buildArchiveMeta', () => {
  it('collects unique categories, tags, years, and sections for filters', () => {
    const meta = buildArchiveMeta(fixtures);

    expect(meta.categories).toHaveLength(3);
    expect(meta.categories).toEqual(expect.arrayContaining(['设计', '阅读', '随想']));
    expect(meta.tags).toHaveLength(6);
    expect(meta.tags).toEqual(expect.arrayContaining(['写作', '方法', '灵感', '系统', '设计', '阅读']));
    expect(meta.years).toEqual(['2026', '2025']);
    expect(meta.sections).toHaveLength(3);
    expect(meta.sections).toEqual(expect.arrayContaining(['网站收藏', '笔记', '花园随想']));
  });
});

describe('createSearchDocument', () => {
  it('builds lowercase searchable text from the visible metadata', () => {
    const document = createSearchDocument(fixtures[0]);

    expect(document).toContain('visual atlas');
    expect(document).toContain('设计');
    expect(document).toContain('灵感');
    expect(document).toContain('很适合收集视觉设计灵感的目录站。'.toLowerCase());
  });
});

export type SectionKey = 'bookmarks' | 'notes' | 'quotes' | 'essays';

export interface ArchiveEntry {
  id: string;
  collection: SectionKey;
  section: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
  permalink: string;
  externalUrl?: string;
  featured?: boolean;
}

export interface ArchiveMeta {
  categories: string[];
  tags: string[];
  years: string[];
  sections: string[];
}

export const SECTION_INFO: Record<
  SectionKey,
  {
    label: string;
    href: string;
    description: string;
  }
> = {
  bookmarks: {
    label: '网站收藏',
    href: '/bookmarks/',
    description: '整理值得反复回看的链接、工具和在线目录。',
  },
  notes: {
    label: '笔记',
    href: '/notes/',
    description: '把知识和经验压缩成可检索、可复用的文本。',
  },
  quotes: {
    label: '文案摘录',
    href: '/quotes/',
    description: '保存触动自己的句子、段落和表达方式。',
  },
  essays: {
    label: '花园随想',
    href: '/garden/',
    description: '发布更完整的文章、日志和长期写作。',
  },
};

const compareText = (left: string, right: string) => left.localeCompare(right, 'zh-Hans-CN');

export const sortEntriesByDate = (entries: ArchiveEntry[]) =>
  [...entries].sort((left, right) => right.date.localeCompare(left.date));

export const buildArchiveMeta = (entries: ArchiveEntry[]): ArchiveMeta => {
  const categories = new Set<string>();
  const tags = new Set<string>();
  const sections = new Set<string>();
  const years = new Set<string>();

  entries.forEach((entry) => {
    categories.add(entry.category);
    sections.add(entry.section);
    years.add(entry.date.slice(0, 4));
    entry.tags.forEach((tag) => tags.add(tag));
  });

  return {
    categories: [...categories].sort(compareText),
    tags: [...tags].sort(compareText),
    years: [...years].sort((left, right) => right.localeCompare(left)),
    sections: [...sections].sort(compareText),
  };
};

export const createSearchDocument = (entry: ArchiveEntry) =>
  [
    entry.title,
    entry.summary,
    entry.category,
    entry.section,
    entry.tags.join(' '),
    entry.externalUrl ?? '',
  ]
    .join(' ')
    .toLowerCase();

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

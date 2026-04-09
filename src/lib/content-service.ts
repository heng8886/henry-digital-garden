import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTION_INFO, sortEntriesByDate, type ArchiveEntry, type SectionKey } from './content';

type SourceEntry = CollectionEntry<SectionKey>;

const normalizeSummary = (body: string, summary: string) => {
  if (summary.trim().length > 0) {
    return summary;
  }

  return body
    .replace(/[#>*`~_-]/g, ' ')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
};

const toArchiveEntry = (entry: SourceEntry): ArchiveEntry => {
  const { collection, data, id, body = '' } = entry;

  return {
    id,
    collection,
    section: SECTION_INFO[collection].label,
    title: data.title,
    summary: normalizeSummary(body, data.summary),
    category: data.category,
    tags: data.tags,
    date: data.date.toISOString().slice(0, 10),
    permalink: `${SECTION_INFO[collection].href}${id}/`,
    externalUrl: data.externalUrl,
    featured: data.featured,
  };
};

export const getArchiveEntries = async () => {
  const [bookmarks, notes, quotes, essays] = await Promise.all([
    getCollection('bookmarks'),
    getCollection('notes'),
    getCollection('quotes'),
    getCollection('essays'),
  ]);

  return sortEntriesByDate(
    [...bookmarks, ...notes, ...quotes, ...essays].map((entry) => toArchiveEntry(entry as SourceEntry)),
  );
};

export const getCollectionEntries = async (collection: SectionKey) => {
  const entries = await getCollection(collection);
  return sortEntriesByDate(entries.map((entry) => toArchiveEntry(entry as SourceEntry)));
};

export const getFeaturedEntries = async () => {
  const entries = await getArchiveEntries();
  return entries.filter((entry) => entry.featured).slice(0, 6);
};

export const getLatestByCollection = async () => {
  const [bookmarks, notes, quotes, essays] = await Promise.all([
    getCollectionEntries('bookmarks'),
    getCollectionEntries('notes'),
    getCollectionEntries('quotes'),
    getCollectionEntries('essays'),
  ]);

  return {
    bookmarks: bookmarks.slice(0, 3),
    notes: notes.slice(0, 3),
    quotes: quotes.slice(0, 3),
    essays: essays.slice(0, 3),
  };
};

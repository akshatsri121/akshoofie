import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { categories, categoryLabel } from '../data/site';
import {
  filterInterests,
  type InterestItem,
} from '../lib/interests';
import './ExploreBrowser.css';

type Props = {
  items: InterestItem[];
  fixedCategory?: string;
};

export default function ExploreBrowser({ items, fixedCategory = '' }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(fixedCategory);
  const [ready, setReady] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    startTransition(() => {
      setQuery(params.get('q') ?? '');
      setCategory(fixedCategory || (params.get('category') ?? ''));
      setReady(true);
    });
  }, [fixedCategory]);

  useEffect(() => {
    if (!ready) return;

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category && !fixedCategory) params.set('category', category);

    const search = params.toString();
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${search ? `?${search}` : ''}`,
    );
  }, [category, fixedCategory, query, ready]);

  const results = filterInterests(items, {
    query: deferredQuery,
    category,
  });
  const hasFilters = Boolean(query || (!fixedCategory && category));

  const clearFilters = () => {
    startTransition(() => {
      setQuery('');
      setCategory(fixedCategory);
    });
  };

  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <label className="search-field">
          <span>QUERY://</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive..."
          />
          <kbd>CMD</kbd>
        </label>

        {!fixedCategory && (
          <div className="filter-grid">
            <label>
              <span>Category</span>
              <select
                value={category}
                onChange={(event) =>
                  startTransition(() => setCategory(event.target.value))
                }
              >
                <option value="">All sectors</option>
                {categories.map((item) => (
                  <option value={item.slug} key={item.slug}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="result-line" aria-live="polite">
        <span>
          <i aria-hidden="true"></i>
          {results.length.toString().padStart(2, '0')} records located
        </span>
        {hasFilters && (
          <button type="button" onClick={clearFilters}>
            CLEAR_FILTERS [X]
          </button>
        )}
      </div>

      {results.length ? (
        <div className="interest-grid">
          {results.map((item, index) => (
            <article className="interest-card" key={item.slug}>
              <div className="interest-cover">
                {item.cover ? (
                  <img src={item.cover} alt="" loading="lazy" />
                ) : (
                  <div className="cover-fallback" aria-hidden="true">
                    <span>{categoryLabel(item.category).slice(0, 2)}</span>
                    <i>{String(index + 1).padStart(2, '0')}</i>
                  </div>
                )}
              </div>
              <div className="interest-card-body">
                <h2>{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="explorer-empty">
          <div className="empty-orbit" aria-hidden="true">
            <span></span>
          </div>
          <p className="eyebrow">Signal incoming</p>
          <h2>
            {hasFilters
              ? 'No matching frequency.'
              : 'The archive is warming up.'}
          </h2>
          <p>
            {hasFilters
              ? 'Try removing a filter or searching for something broader.'
              : 'Akshat has not logged anything here yet. The interface is ready for the first transmission.'}
          </p>
          {hasFilters && (
            <button
              type="button"
              className="filter-reset"
              onClick={clearFilters}
            >
              Reset console
            </button>
          )}
        </div>
      )}
    </div>
  );
}

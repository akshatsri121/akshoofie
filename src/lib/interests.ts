export type InterestItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  cover?: string;
  date: string;
};

export type InterestFilters = {
  query: string;
  category: string;
};

export function filterInterests(
  items: InterestItem[],
  filters: InterestFilters,
) {
  const query = filters.query.trim().toLocaleLowerCase();

  return items
    .filter((item) => {
      const haystack = [item.title, item.summary]
        .join(' ')
        .toLocaleLowerCase();

      return (
        (!query || haystack.includes(query)) &&
        (!filters.category || item.category === filters.category)
      );
    });
}

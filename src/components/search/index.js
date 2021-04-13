import { default as React, createRef, useState } from 'react';

import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './search-box';
import SearchResult from './search-result';
import algoliasearch from 'algoliasearch/lite';

export default function Search({ indices }) {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );
  const show = () => query && query.length > 0 && hasFocus;

  return (
    <InstantSearch
      ref={rootRef}
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus}></SearchBox>

      <div style={{ position: 'relative' }}>
        {show() && (
          <SearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          ></SearchResult>
        )}
      </div>
    </InstantSearch>
  );
}

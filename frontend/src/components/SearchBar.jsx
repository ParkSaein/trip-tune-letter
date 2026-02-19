function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="여행지 검색..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchBar;

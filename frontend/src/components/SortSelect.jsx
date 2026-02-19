function SortSelect({ sort, setSort }) {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="latest">최신순</option>
      <option value="oldest">과거순</option>
    </select>
  );
}

export default SortSelect;

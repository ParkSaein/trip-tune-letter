function SortSelect({ sort, setSort }) {
  return (
    <select
      className="SortSelect"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="latest">최신순</option>
      <option value="oldest">오래된 순</option>
    </select>


    // <select value={sort} onChange={(e) => setSort(e.target.value)}>
    //   <option value="latest">최신순</option>
    //   <option value="oldest">과거순</option>
    // </select>
  );
}

export default SortSelect;

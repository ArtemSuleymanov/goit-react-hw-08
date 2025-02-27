import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  return (
    <div className={s.searchBox}>
      <label htmlFor="search" className={s.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className={s.input}
      />
    </div>
  );
};

export default SearchBox;

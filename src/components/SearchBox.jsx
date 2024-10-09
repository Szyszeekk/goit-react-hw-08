import { useDispatch, useSelector } from "react-redux";
import storeConfig from "../redux/store";
import css from "../css/SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector((state) => state.filters.name);
  const numberFilter = useSelector((state) => state.filters.number);

  const handleNameChange = (event) => {
    dispatch(storeConfig.actions.setNameFilter(event.target.value));
  };

  const handleNumberChange = (event) => {
    dispatch(storeConfig.actions.setNumberFilter(event.target.value));
  };

  return (
    <>
      <label>
        <p className={css.paragraph}>Find contacts by name</p>
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameChange}
          className={css.input}
        />
      </label>
      <label>
        <p className={css.paragraph}>Find contacts by number</p>
        <input
          type="text"
          value={numberFilter}
          onChange={handleNumberChange}
          className={css.input}
        />
      </label>
    </>
  );
};

export default SearchBox;

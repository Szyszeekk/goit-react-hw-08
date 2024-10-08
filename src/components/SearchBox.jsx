import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/filters"; // Importuj setFilter
import css from "../css/SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const { name, number } = useSelector((state) => state.filters); // Pobierz oba filtry

  const handleSearchChange = (event) => {
    dispatch(setFilter({ name, number: event.target.value })); // Uaktualnij tylko numer telefonu
  };

  const handleNameChange = (event) => {
    dispatch(setFilter({ name: event.target.value, number })); // Uaktualnij tylko nazwę
  };

  return (
    <div>
      <label>
        <p className={css.paragraph}>Find contacts by name</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className={css.input}
        />
      </label>
      <label>
        <p className={css.paragraph}>Find contacts by phone number</p>
        <input
          type="text"
          value={number}
          onChange={handleSearchChange}
          className={css.input}
        />
      </label>
    </div>
  );
};

export default SearchBox;

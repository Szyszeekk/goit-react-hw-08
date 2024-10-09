import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/contacts";
import css from "../css/Contact.module.css";

const Contact = ({ contact, onDeleteContact }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedNumber, setUpdatedNumber] = useState(contact.number);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const updatedContact = { name: updatedName, number: updatedNumber };
    dispatch(updateContact({ id: contact.id, updatedContact }));
    setIsEditing(false);
  };

  return (
    <li className={css.listItem}>
      {isEditing ? (
        <form onSubmit={handleUpdateContact}>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            value={updatedNumber}
            onChange={(e) => setUpdatedNumber(e.target.value)}
          />
          <button type="submit" className={css.button}>
            Save
          </button>
          <button
            type="button"
            onClick={handleEditToggle}
            className={css.button}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div>
            {contact.name} <br />
            {contact.number}
          </div>
          <button
            onClick={() => onDeleteContact(contact.id)}
            className={css.button}>
            Delete
          </button>
          <button onClick={handleEditToggle} className={css.button}>
            Edit
          </button>
        </>
      )}
    </li>
  );
};

export default Contact;

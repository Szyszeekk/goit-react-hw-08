import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, updateContact } from "../redux/contacts";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";
import toast from "react-hot-toast";

const notifyDelete = (contactName) =>
  toast(`Contact ${contactName} successfully deleted!`);

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const nameFilter = useSelector((state) => state.filters.name);
  const numberFilter = useSelector((state) => state.filters.number);
  const [editingContact, setEditingContact] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNumber, setEditedNumber] = useState("");

  const handleDelete = (contactId, contactName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${contactName}?`
    );
    if (isConfirmed) {
      dispatch(deleteContact(contactId));
      notifyDelete(contactName);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact); // Ustawiamy kontakt do edytowania
    setEditedName(contact.name);
    setEditedNumber(contact.number);
  };

  const handleUpdateContact = (contactId) => {
    if (editedName && editedNumber) {
      dispatch(
        updateContact({ id: contactId, name: editedName, number: editedNumber })
      );
      setEditingContact(null); // Resetujemy edytowany kontakt
      setEditedName("");
      setEditedNumber("");
    } else {
      alert("Both fields are required!");
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      contact.number.includes(numberFilter)
  );

  return (
    <>
      {editingContact ? (
        <div className={css.editForm}>
          <h3>Edit Contact</h3>
          <label>
            Name:
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={css.input}
            />
          </label>
          <label>
            Number:
            <input
              type="text"
              value={editedNumber}
              onChange={(e) => setEditedNumber(e.target.value)}
              className={css.input}
            />
          </label>
          <button onClick={() => handleUpdateContact(editingContact.id)}>
            Update Contact
          </button>
          <button onClick={() => setEditingContact(null)}>Cancel</button>
        </div>
      ) : (
        <ul className={css.list}>
          {filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              onDeleteContact={() => handleDelete(contact.id, contact.name)}
              onEditContact={() => handleEditContact(contact)} // Przekazujemy funkcję edycji
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;

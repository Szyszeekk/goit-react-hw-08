import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contacts";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";
import toast, { Toaster } from "react-hot-toast";

const notify = (contactName) =>
  toast(`Contact ${contactName} succesfully deleted!`);

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const nameFilter = useSelector((state) => state.filters.name);
  const numberFilter = useSelector((state) => state.filters.number);

  const handleDelete = (contactId, contactName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${contactName}?`
    );
    if (isConfirmed) {
      dispatch(deleteContact(contactId));
      notify(contactName);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      contact.number.includes(numberFilter)
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDeleteContact={() => handleDelete(contact.id, contact.name)} // Przekazujemy nazwę kontaktu
        />
      ))}
    </ul>
  );
};

export default ContactList;

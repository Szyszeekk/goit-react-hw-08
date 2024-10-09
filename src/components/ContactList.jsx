import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contacts";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const nameFilter = useSelector((state) => state.filters.name);
  const numberFilter = useSelector((state) => state.filters.number);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      contact.number.includes(numberFilter) // Filtrowanie po numerze telefonu
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDeleteContact={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

export default ContactList;

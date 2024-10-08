import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contacts";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const { name, number } = useSelector((state) => state.filters);

  const filteredContacts = contacts.filter((contact) => {
    const nameMatch = contact.name.toLowerCase().includes(name.toLowerCase());
    const numberMatch = contact.number
      .toLowerCase()
      .includes(number.toLowerCase());
    return nameMatch || numberMatch; // Filtruj po nazwie lub numerze
  });

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

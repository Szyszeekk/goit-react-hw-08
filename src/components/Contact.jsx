import css from "../css/Contact.module.css";

const Contact = ({ contact, onDeleteContact, onEditContact }) => {
  return (
    <li className={css.listItem}>
      <div>
        {contact.name} <br />
        {contact.number}
      </div>
      <button
        onClick={() => onDeleteContact(contact.id)}
        className={css.button}>
        Delete
      </button>
      <button
        onClick={() => onEditContact(contact)} // Przekazujemy cały obiekt kontaktu
        className={css.button}>
        Edit
      </button>
    </li>
  );
};

export default Contact;

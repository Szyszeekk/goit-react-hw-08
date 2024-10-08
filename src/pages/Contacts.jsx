import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";
import ContactList from "../components/ContactList";
import DocumentTitle from "../components/DocumentTitle";

const Contacts = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <DocumentTitle>Contacts</DocumentTitle>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default Contacts;

import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import s from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { selectError, selectLoading } from "./redux/contacts/contactsSlice";
import { fetchContacts } from "./redux/contacts/contactsOps";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={s.div}>
      <h1>PhoneBook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <p>Loading contacts...</p>}
      {error && <p className={s.error}>Error: {error}</p>}
      <ContactList />
    </div>
  );
};

export default App;

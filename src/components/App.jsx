import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact, delContact } from 'redux/actions';

// const getFromLocalStorage = key => {
//   const contactsFromLocalStorage = localStorage.getItem(key);

//   return contactsFromLocalStorage
//     ? JSON.parse(contactsFromLocalStorage)
//     : hardCodedContact;
// };

// const hardCodedContact = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  // const handleChange = e => {
  //   const { value } = e.target;
  //   setFilter(value);
  // };

  const handleSubmit = e => {
    // const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact(name, number));
    }
  };

  const handleDelete = e => {
    dispatch(delContact(e));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filterContactsList;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts</h2>
      <Filter />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
};

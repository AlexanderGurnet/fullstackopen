import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      const persons = res.data;
      setPersons(persons);
    });
  }, []);

  const filteredPersons =
    filter === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  const handleNumberAddition = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const isPersonExist = persons.find((person) => person.name === newPerson.name);

    if (isPersonExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios.post('http://localhost:3001/persons', newPerson).then((res) => {
        setPersons(persons.concat(res.data));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNumberAddition={handleNumberAddition}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </>
  );
};

export default App;

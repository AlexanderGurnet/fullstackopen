import { useEffect, useState } from 'react';

import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

    const alreadyExistingPerson = persons.find((person) => person.name === newPerson.name);

    if (alreadyExistingPerson) {
      if (
        window.confirm(
          `${alreadyExistingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(alreadyExistingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(persons.map((person) => (person.id !== alreadyExistingPerson.id ? person : updatedPerson)));
            setIsError(false);
            setNotification(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch((error) => {
            setIsError(true);
            setNotification(`Information of ${alreadyExistingPerson.name} has already been removed from server`);
            setPersons(persons.filter((p) => p.id !== alreadyExistingPerson.id));
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }
    } else {
      personService.create(newPerson).then((newlyCreatedPerson) => {
        setPersons(persons.concat(newlyCreatedPerson));
        setNewName('');
        setNewNumber('');
        setIsError(false);
        setNotification(`Added ${newlyCreatedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
    }
  };

  const handlePersonDeletion = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteById(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          setIsError(true);
          setNotification(`Information of ${person.name} has already been removed from server`);
          setPersons(persons.filter((p) => p.id !== person.id));
          setTimeout(() => {
            setNotification(null);
          }, 3000);
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
      <Notification message={notification} isError={isError} />
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
      <Persons persons={filteredPersons} handlePersonDeletion={handlePersonDeletion} />
    </>
  );
};

export default App;

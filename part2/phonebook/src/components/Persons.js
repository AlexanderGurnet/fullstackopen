import React from 'react';

import Person from './Person';

const Persons = ({ persons, handlePersonDeletion }) =>
  persons.map((person) => <Person key={person.id} person={person} handlePersonDeletion={handlePersonDeletion} />);

export default Persons;

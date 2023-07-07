import React from 'react';

import Person from './Person';

const Persons = ({ persons }) => persons.map((person) => <Person key={person.id} person={person} />);

export default Persons;

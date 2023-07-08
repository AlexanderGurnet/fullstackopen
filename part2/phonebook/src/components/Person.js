const Person = ({ person, handlePersonDeletion }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handlePersonDeletion(person)}>delete</button>
    </div>
  );
};

export default Person;

const Person = ({ person }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}
    </div>
  );
};

export default Person;

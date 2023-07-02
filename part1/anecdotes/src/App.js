import { useState } from 'react';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const Title = ({ text }) => <h1>{text}</h1>;

const ShowVotes = ({ number }) => <div>Has {number} votes</div>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map((_) => 0));

  const pickRandom = () => {
    while (true) {
      const possibleNext = Math.floor(Math.random() * anecdotes.length);
      if (possibleNext !== selected) return possibleNext;
    }
  };

  const voteSelected = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    if (newVotes[selected] > votes[mostVotes]) {
      setMostVotes(selected);
    }
  };

  return (
    <>
      <Title text="Anecdote of the day" />
      {anecdotes[selected]}
      <ShowVotes number={votes[selected]} />
      <div>
        <Button text="vote" handleClick={voteSelected} />
        <Button text="next anecdote" handleClick={() => setSelected(pickRandom())} />
      </div>
      <Title text="Anecdote with most votes" />
      {anecdotes[mostVotes]}
      <ShowVotes number={votes[mostVotes]} />
    </>
  );
};

export default App;

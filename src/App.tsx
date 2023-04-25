import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './components/List';
import './App.css';
import AddToList from './components/AddToList';

export interface IState{
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  }[]
}

function App() {
  const [people, setPeople] = useState<IState["people"]>([
  ]);
  const [gotData, setGotData] = useState<boolean>(false);
  useEffect(() => {
    
    axios.get('https://dummyjson.com/users/?limit=3')
      .then((res: any) => {
        const users = res.data.users.map((user: any) => ({
          name: `${user.firstName} ${user.lastName}`,
          age: user.age,
          url: user.image,
        }));
        setPeople(users);
        setGotData(true);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>People Invited to the Party</h1>
      <List people={people} isLoading={people.length === 0} gotData={gotData} setPeople={setPeople} />
      <AddToList people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;

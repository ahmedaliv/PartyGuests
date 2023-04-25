import React from 'react'
import { IState as IProps } from '../App';

interface Props extends IProps {
  isLoading: boolean;
  setPeople: React.Dispatch<React.SetStateAction<IProps["people"]>>;
  gotData: boolean;
}

const List: React.FC<Props> = ({ people, isLoading,setPeople,gotData }) => {
  const handleDelete = (name: string): void => {
    const newPeople = people.filter((person) => person.name !== name);
    setPeople(newPeople);
  };


  const renderList = ():JSX.Element[] => {
   return( people.map((person) => {
    const { name, age, url, note } = person;
    return (
      <li className="List">
        <div className="List-header">
          <img className="List-img" src={url} alt={name} />
          <h2>{name}</h2>
        </div>
        <p>{age} years old</p>
        <p className="List-note">{note}</p>
        <button style={{backgroundColor:'#333333',color:'white',display:'inline-block',borderRadius:'5px',border:'none',padding:'5px 10px',cursor:'pointer'}} 
          onClick={()=>handleDelete(name)}
        >Delete</button>
      </li>
    );
  }))
  }

  if (isLoading && !gotData) {
    return <div>Loading...</div>;
  }
  if (gotData && people.length === 0) {
    return <div>No Guests till now...</div>;
  }

  return <ul>{renderList()}</ul>;
}

export default List

import React, {useState, useEffect} from "react";
import Icone from './assets/icon.png';

function TodoList() {

 const listStorage = localStorage.getItem('List');
 const [list, setlist] = useState(listStorage ? JSON.parse(listStorage) : []);
 const [newItem, setNewItem] = useState("");

 useEffect(()=> {
    localStorage.setItem('List', JSON.stringify(list))

 }, [list])

 function addItem(form) {
  form.preventDefault();
  if(!newItem) {
   return;
  }
  setlist([...list, {text: newItem, isCompleted: false}])
  setNewItem("");
  document.getElementById('entry-input').focus();
 }

 function clicked(index) { 

  const listAux = [...list];
  listAux[index].isCompleted = !listAux[index].isCompleted;
  setlist(listAux);

 }

 function deleted(index) {
  const listAux = [...list];
  listAux.splice(index, 1);
  setlist(listAux);
 }

 
 function deletedAll() {
  setlist([]);
 }

 return (

  <div>

   <h1>Todo List</h1>

   <form onSubmit={addItem}>

    <input 
    id="entry-input"
    placeholder="add an task."
    value={newItem}
    onChange={(e)=>{setNewItem(e.target.value)}}    type="text" 
    />

    <button className="add" type="submit">add</button>

   </form>

   <div className="taskList">

    <div>
    {
     list.length <1
     ?
     <img className="iconPng" src={Icone} />
     :
     list.map((item, index)=>(
      <div key={index} className={ item.isCompleted ? "item completed" : "item" }>
      <span onClick={()=>{clicked(index)}}>{item.text}</span>
      <button onClick={()=>{deleted(index)}} className="delete">delete</button>
     </div>
     ))

    }

    {
     list.length > 1 &&
    
    
    <button onClick={()=>{deletedAll()}} className="deleteAll">delete all</button>
}
   </div>
   </div>
  </div>
 )
}
export default TodoList
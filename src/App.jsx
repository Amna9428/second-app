import { useState, useRef} from 'react'
import Listitems from './components/Listitems';
import './App.css'

function App() {
  const [items, setItems] = useState(['multan', 'karachi', 'Lahore']);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const inputRef = useRef(null);

  const addItem = () => {
    if (name == "" || name.length < 3) {
      return
    }
    const newItemsAr = [...items, name];
    setItems(newItemsAr);
    setName("");

  }
  const deleteItem = (index) => {
    if (window.confirm("do you want to del this item")) {
      const newItems = items.filter((el, i) => i != index);
      setItems(newItems);
    }

  }
  const editItem = (index) => {
    setName(items[index]);
    setEditing(true);
    setCurrentIndex(index);
    inputRef.current.focus();
  }
  const updateItems = () => {
    if (name == "" || name.length < 3) {
      return
    }
    const updatedItems = items.map((el, i) => (i == currentIndex) ? name : el);
    setItems(updatedItems);
    setName("");
    setEditing(false);
    setCurrentIndex(null);
  }

  const handleEnterpress = (e) => {
    if (e.key == "Enter") {
      (editing == true) ? updateItems() : addItem();
    }

  }
  return (
    <div>
      <div className='d-flex gap-2 mb-3'>
        <input className='form-control'ref = {inputRef} onKeyUp={handleEnterpress} onChange={(e) => { setName(e.target.value) }} value={name} type='text' placeholder='New' />
        <button className='btn btn-sm btn-warning' onClick={(editing == true) ? updateItems : addItem}>
          {
            (editing == true) ? "Update" : "Add"
          }
        </button>
      </div>
      <table className="table table-bordered" style={{ width: "500px" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">City Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, i) => {
              return (
                <Listitems deleteItem={deleteItem} editItem={editItem} item={item} key={i} index={i} />
              )

            })

          }

        </tbody>
      </table>

    </div>
  )
}


export default App;

// import React from 'react'
// import { useState } from 'react'

// function App() {
//   const [email, setEmail] = useState("");
//   const inputVal = (event) => {
//     setEmail(event.target.value);
//   }
//   const handleSubmit = () => {
//     setEmail("");
//   }
//   return (
//     <div>
//       <form onSubmit={(e) => { e.preventDefault() }}>
//         <input onChange={inputVal} type='text' value={email} placeholder='email' />
//         <button className="btn btn-sm btn-secondary" onClick={handleSubmit}>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default App

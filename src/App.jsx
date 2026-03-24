import { useState } from 'react'
import './App.css'
import Vector from './assets/Vector.svg'
import moon from './assets/Vector (1).svg'
import imgdefolt from './assets/Detective-check-footprint 1.svg'
import Modaladd from './components/modaladd'


function App() {
  const [todoitem, setTodoitem] = useState([])

    
  const [searchitem, setSearchitem] = useState('')
  const [filter, setFilter] = useState('all')
  const [inputValue, setInputValue] = useState('');
  const [openfiltertitel, setOpenfiltertitel] = useState(false)
  const [openmodal, setOpenmodal] = useState(false)


  const addtodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      } 
    

      setTodoitem([...todoitem, newTodo])
      setInputValue('');
      setOpenmodal(false)
    }
  }

  // useEffect(() => {
  //   const loaddate = async () => {
  //       try {
  //       const getdate = await fetch('');
  //       const data = await getdate.json()
  //       setTodoitem(data)
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }

  //   loaddate();
  // },[])

  const openfilt = () => {
    setOpenfiltertitel(!openfiltertitel)
  }

  const filtertitel = todoitem.filter(todos => {
    if (filter === 'complete') return todos.completed;
    if (filter === 'incomplete') return !todos.completed;
    return true;
  })

  const delet = (id) => {
    setTodoitem(todos => todos.filter(item => item.id !== id))
  }

const done = (id) => {
  setTodoitem(todoitem.map(item => item.id === id ? {...item, completed: !item.completed} : item))
  console.log('done')
}
  

  return (
    <>
      <div className='blocktodo'>
        <h1>Todo Item</h1>
        <div className='seasrch'> 
          <div className='searchblocks'> 
            <input className='sreachvalue' type="text"  value={searchitem} onChange={(e) => setSearchitem(e.target.value)} placeholder='Search note...'/>
            <button className='searchbutton' onClick=''><img src={Vector} alt="" srcset="" /></button>
          </div>
          <div className='buttons'>
            <nav className='sorttitel' onClick={openfilt}>{filter}
              <ul className={`sortspisoc ${openfiltertitel ? 'open' : ''}`}>
                <li className='sortvariant' onClick={() => {setFilter('all')}}>all</li>
                <li className='sortvariant' onClick={() => {setFilter('complete')}}>complete</li>
                <li className='sortvariant' onClick={() => {setFilter('incomplete')}}>incomplete</li>
              </ul>
            </nav>
            <button className='chanchetheme'><img src={moon} alt="" /></button>
          </div>
        </div>

        <ul className='todosnav'>
            {filtertitel.length  === 0 ? (
              <div className='nothing'>
                <img src={imgdefolt} alt="" srcset="" />
              </div>
            ) : (
                filtertitel.slice(0,7).map(titel => (
                  <li key={titel.id}>
                    <div className = {`checkbox ${titel.completed ? 'don' : ''}`}   onClick={() => done(titel.id)}/>
                    <div className='block'>
                      <div className='content'>
                        <span className={`content__text ${titel.completed ? 'done' : ''}`} onClick={() => done(titel.id)}>{titel.text}</span>
                        <span className='content__date'>{titel.dateadd}</span>
                      </div>
                      <button className='buttondelet' onClick={() => delet(titel.id)}>x</button>
                    </div>
                  </li>
                ))
            )}
        </ul>
      </div>

      <button className='buttonadd' onClick={() => setOpenmodal(!openmodal,console.log(openmodal))}>+</button>
      <Modaladd open={openmodal} setOpenmodal={setOpenmodal} add={addtodo} inputValue={inputValue} setInputValue={setInputValue} />
      
    </>
  )
}

export default App

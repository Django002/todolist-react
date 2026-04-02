import { useEffect,useState } from 'react'
import './App.css'
import Vector from './assets/Vector.svg'
import moon from './assets/Vector (1).svg'
import imgdefolt from './assets/Detective-check-footprint 1.svg'
import Modaladd from './components/modaladd'
import Load from './components/loader/load'


function App() {
  const [todoitem, setTodoitem] = useState(() => {
    const saved = localStorage.getItem('titel');
    return saved ? JSON.parse(saved) : [];})
  const [searchitem, setSearchitem] = useState('')
  const [filter, setFilter] = useState('all')
  const [inputValue, setInputValue] = useState('');
  const [openfiltertitel, setOpenfiltertitel] = useState(false)
  const [openmodal, setOpenmodal] = useState(false)
  const [buttonmore, setButtonmore] = useState(true)
  const [zadacha, setZadacha] = useState(5)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    let timeoutId
    timeoutId = setTimeout(() => setLoader(false), 2000);
    return () => clearTimeout(timeoutId);
   
  },[])
  

  useEffect(() => {
  localStorage.setItem('titel', JSON.stringify(todoitem));
}, [todoitem]);

    const addtodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return alert ('Вы ничего не ввели')

      const tempId = Date.now();
      const newTodo = {
        id: tempId,
        text: inputValue,
        completed: false,
      };

      setTodoitem([...todoitem, newTodo])
      setOpenmodal(false)
      setInputValue('')

    
  }

    const delet = (id) => {
      setTodoitem(todoitem.filter(item => item.id !== id))

    }

    const done = (id,completed) => {
      setTodoitem(todoitem.map(todo => todo.id === id ? {...todo, completed: !completed} : todo))
    }


  // useEffect(() => {
  //   const loaddate = async () => {
     

  //     let isMounted = true;  
  //     const locadate = localStorage.getItem('titel')
  //     setTodoitem(JSON.parse(locadate))       

  //     setLoader(true)
  //       try {
  //       const getdate = await fetch('http://localhost:3000/tasks');
  //       const data = await getdate.json()
  //       setTodoitem(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     finally{
  //       if (isMounted) {
  //         setTimeout(()=>setLoader(false),2000)
  //       } 
  //     }
        
  //   }
  //   loaddate();
  // },[])

    

  if (loader) return <Load />

  const addzadacha = ()=> {
    setZadacha(zadacha+todoitem.length)
    setButtonmore(!buttonmore)
  }

  const delzadacha = ()=> {
    setZadacha(5)
    setButtonmore(!buttonmore)
  }



  // const addtodo = async (e) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;

  //     const tempId = Date.now();
  //     const newTodo = {
  //       id: tempId,
  //       text: inputValue,
  //       completed: false,
  //     };

      
  //     try {
  //       const addtitel = await fetch('http://localhost:3000/tasks',{
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(newTodo)
  //       });

  //       const savedTodo = await addtitel.json();
  //       setTodoitem([...todoitem, savedTodo])
  //       setInputValue('');
  //       setOpenmodal(false)
        
  //     } catch (error) {
  //       console.error('Failed to add todo:', error);
  //       setTodoitem(prev => prev.filter(todo => todo.id !== tempId));
  //     }

    
  // }


  const openfilt = () => {
    setOpenfiltertitel(!openfiltertitel)
  }

  const filtertitel = todoitem.filter(todos => {
    if (filter === 'complete') return todos.completed;
    if (filter === 'incomplete') return !todos.completed;
    return true;
  })

  // const delet = async (id) => {
  //   try {
  //     await fetch(`http://localhost:3000/tasks/${id}`, {
  //       method: 'DELETE',
  //     })
      
  //     setTodoitem(todos => todos.filter(item => item.id !== id))
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  // const done = async (id,completed) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/tasks/${id}`,{
  //       method: 'PATCH',
  //       headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       body: JSON.stringify({completed: !completed})
  //     })

  //     if (!response.ok) {
  //       throw new Error(`Ошибка HTTP: ${response.status}`);
  //     }
  //     const update = await response.json()
  //     setTodoitem(prev => prev.map(item =>
  //   item.id === id ? { ...item, completed: update.completed } : item
  // ));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  

  return (
    <>
    <div className='allblock'>
        <div className='blocktodo'>
        <div className='seasrch'> 
           <h1>Todo Item</h1>
          <div className='searchblocks'> 
            <input className='sreachvalue' name='sreachvalue' type="text"  value={searchitem} onChange={(e) => setSearchitem(e.target.value)} placeholder='Search note...'/>
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

        <ul className={`todosnav ${filtertitel.length > zadacha ? '' : 'scrol'}`}>
            {filtertitel.length  === 0 ? (
              <div className='nothing'>
                <img src={imgdefolt} alt="" srcSet="" />
              </div>
            ) : (
                filtertitel.slice(0,zadacha).map(titel => (
                  <li key={titel.id}>
                    <div className = {`checkbox ${titel.completed ? 'don' : ''}`}   onClick={() => done(titel.id,titel.completed)}/>
                    <div className='block'>
                      <div className='content'>
                        <span className={`content__text ${titel.completed ? 'done' : ''}`} onClick={() => done(titel.id,titel.completed)}>{titel.text}</span>
                        <span className='content__date'>{titel.dateadd}</span>
                      </div>
                      <button className='buttondelet' onClick={() => delet(titel.id)}>x</button>
                    </div>
                  </li>
                ))
            )}
          {filtertitel.length > zadacha && (<button className="load" onClick={()=>addzadacha()}> ещё</button>)}
          {zadacha > 5 && (<button className="load" onClick={()=>delzadacha()}>назад</button>)}
        </ul>
        
      </div>
      {buttonmore && <button className='buttonadd' onClick={() => setOpenmodal(!openmodal,console.log(openmodal))}>+</button>}
     
    </div>
    
      <Modaladd open={openmodal} setOpenmodal={setOpenmodal} add={addtodo} inputValue={inputValue} setInputValue={setInputValue} />
      
    </>
    
  )
}

export default App

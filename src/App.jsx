import { useState } from 'react'
import './App.css'
import Vector from './assets/Vector.svg'
import moon from './assets/Vector (1).svg'

function App() {
  // const [todoitem, setTodoitem] = useState([])
  const [searchitem, setSearchitem] = useState('')
  const [filter, setFilter] = useState('all')


  const search = () => {
    console.log('yes')
  }

  return (
    <>
    <div className='blocktodo'>
       <h1>Todo Item</h1>
      <div className='seasrch'> 
        <div className='searchblocks'> 
          <input className='sreachvalue' type="text"  value={searchitem} onChange={(e) => setSearchitem(e.target.value)} placeholder='Search note...'/>
          <button className='searchbutton' onClick={search}><img src={Vector} alt="" srcset="" /></button>
        </div>
        <div className='buttons'>
          <nav className='sorttitel'>{filter}
            <ul className='sortspisoc'>
              <li className='sortvariant' onClick={() => {setFilter('all')}}>all</li>
              <li className='sortvariant' onClick={() => {setFilter('complete')}}>complete</li>
              <li className='sortvariant' onClick={() => {setFilter('incomplete')}}>incomplete</li>
            </ul>
          </nav>
          <button className='chanchetheme'><img src={moon} alt="" /></button>
        </div>
       </div>
    </div>
     
    </>
  )
}

export default App

import '../components/stylemodal.css'

function Modaladd({open,setOpenmodal,add,inputValue,setInputValue}) {
   return(
        <div className={`back ${open ? 'open' : ''}`}>
            <div className='modalcontent'>
                <h1 className='zagalovoc'>Добавить задачу</h1>
                <input className='valuetitel' 
                type="text" 
                value={inputValue} 
                onChange={(e)=>setInputValue(e.target.value)}
                placeholder='Ведите задачу...'/>
                <div className='modalcontentbuttons'>
                    <button className='buttonscansel' onClick={()=>setOpenmodal(false)}>Назад</button>
                    <button className='buttonsadd' onClick={add}>Добавить</button>
                </div>
            </div>
        </div>
   )
}

export default Modaladd;
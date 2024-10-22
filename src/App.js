import './App.css';
import { FaClipboardCheck } from "react-icons/fa6";
import useForm from './useForm';
import { useState } from 'react';
import { getRandomChar, getSpecial } from './Utils';
import toast from 'react-hot-toast';

function App() {

  const [values, handleChange] = useForm({
    length: 6,
    capital: true,
    small: true,
    numbers: false,
    special: false
  });

  const [result,setResult] = useState("")

  const filedsArray = [
    {field : values.capital,
      getChar : ()=> getRandomChar(65,90)
    },
    {field : values.small,
      getChar : ()=> getRandomChar(97,122)
    },
    {field : values.numbers,
      getChar : ()=> getRandomChar(48,57)
    },
    {field : values.special,
      getChar : ()=>getSpecial()
    }
  ]

  const handleSubmit =(e)=>{
    e.preventDefault()
    let PasswordGen=''
    const checkedFiled = filedsArray.filter(({field})=>field)

    for(let i =0;i<values.length;i++ ){
      const index = Math.floor(Math.random() * checkedFiled.length)
      const letter = checkedFiled[index]?.getChar()

      if(letter){
        PasswordGen+=letter;
      }

    }
    if(PasswordGen){
      setResult(PasswordGen)
    }


  }
  const handleClipboard = async() =>{
    if(result){
    await navigator.clipboard.writeText(result)
    toast.success('copied to your clipbaord')}
    else{
      toast.error('no password')
    }

  }

  return (
    <div className="container">
      <form id='pg-form' onSubmit={handleSubmit}>
        <div className="result">
          <input
            type="text"
            id="result"
            placeholder="min 6 characters"
            value={result}
          />
          <div className="clipboard">
            <FaClipboardCheck onClick={handleClipboard} />
          </div>
        </div>
        
        <div>
          <div className='field'>
            <label htmlFor='length'>Password Length</label>
            <input
              type='number'
              id='length'
              min={3}
              max={10}
              name='length'
              value={values.length}
              onChange={handleChange}
            />
          </div>

          <div className='capital'>
            <label htmlFor='capital'>Capital Letters</label>
            <input
              type='checkbox'
              id='capital'
              name='capital'
              checked={values.capital}
              onChange={handleChange}
            />
          </div>

          <div className='small'>
            <label htmlFor='small'>Small Letters</label>
            <input
              type='checkbox'
              id='small'
              name='small'
              checked={values.small}
              onChange={handleChange}
            />
          </div>

          <div className='number'>
            <label htmlFor='numbers'>Numbers</label>
            <input
              type='checkbox'
              id='numbers'
              name='numbers'
              checked={values.numbers}
              onChange={handleChange}
            />
          </div>

          <div className='special'>
            <label htmlFor='special'>Special Characters</label>
            <input
              type='checkbox'
              id='special'
              name='special'
              checked={values.special}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type='submit'>Generate Password</button>
      </form>
    </div>
  );
}

export default App;

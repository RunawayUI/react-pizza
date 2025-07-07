import React, { useCallback, useContext, useRef, useState,  } from 'react'

import styles from './Search.module.scss'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = React.useContext(SearchContext)
  const inputRef = useRef();


  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = useCallback(
    debounce(str => {
      setSearchValue(str);
    }, 500),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value);
    // setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  }
 
  return (
    <div className={styles.root}>

        <input 
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className={styles.input}
          placeholder="Поиск пиццы..." 
        />
        {value && 
        <svg onClick={onClickClear} className={styles.clear} viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        }
        
    </div>
    
  )
}

export default Search
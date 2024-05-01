import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Test() {
  const [count, setCount] = useState(0)


    const data = () => {

        return  GetWatchLaterContents()
        .then((response) => {
          setContents(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }

  return (
    <>
        <button onClick={GetWatchLaterContents()}>
            Click 
        </button>
        <h4></h4>
    </>
  )
}

export default Test

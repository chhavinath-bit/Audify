import React from 'react'
import Audio from './Audio'
import AddAudio from './AddAudio'

const Home = () => {
    
  return (
    <div className='container-fluid Page' style={{color:"white", }}>
    <div className='row'>
    <AddAudio/>
   <Audio/>
    </div>
   
    </div>
  )
}

export default Home


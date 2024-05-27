
import './App.css';
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Topsales from './Components/Topsales';
import Revenue from './Components/Revenue';
import Registration from './Components/Registration';
import Login from './Components/Login';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';




function App() {

  // const Dispatch=useDispatch();
  // useEffect(()=>{
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   Dispatch({type:"LOGOUT"})
  // },[])

  return (
    <div >
    <BrowserRouter>
    <Navbar />
     <Routes>
     <Route path="/" element={<Login />}></Route>
      <Route path="/Form" element={<Form />}></Route>
      <Route path="/Topsales" element={<Topsales />}></Route>
      <Route path="/Revenue" element={<Revenue />}></Route>
      <Route path="/Login" element={<Login /> }></Route>
      <Route path="/Registration" element={<Registration /> }></Route>


     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

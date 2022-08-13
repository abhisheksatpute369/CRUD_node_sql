
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Addvehicle from './components/addvehicle';
import Single from './components/single';
import Vehicle from './components/vehicle';
import Signup from './components/signup';
import Login from './components/login';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/allvehicle' element={<Vehicle />} />
        <Route path='/newvehicle' element={<Addvehicle />} />
        <Route path='/single/:id' element={<Single />} />
        <Route path='/update/:id' element={<Addvehicle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

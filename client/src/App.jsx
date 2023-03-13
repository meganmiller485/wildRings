import React, { useState, useEffect } from 'react';
import { getAllPrints } from './api/prints';
import { Route, Routes } from 'react-router-dom';
import {
  NavBar,
  Home,
  About,
  Areas,
  AllPrints,
  GetInvolved,
  Contact,
  LoginRegister,
} from './Components/Index';

function App() {
  const [prints, setPrints] = useState([]);

  useEffect(() => {
    const fetchedPrints = async () => {
      const allPrints = await getAllPrints();
      setPrints(allPrints);
    };
    console.log('these are al theprints', prints);
    fetchedPrints();
  }, []);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/areas'
          element={<Areas />}
        />
        <Route
          path='/prints'
          element={<AllPrints prints={prints} />}
        />
        <Route
          path='/getinvolved'
          element={<GetInvolved />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/member'
          element={<LoginRegister />}
        />
      </Routes>
    </div>
  );
}

export default App;

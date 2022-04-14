import logo from './logo.svg';
import React from 'react';
import './App.css';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import HeaderComponent from './component/HeaderComponent';
import FooterComponent from './component/FooterComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateEmployeeComponent from './component/CreateEmployeeComponent';
import UpdateEmployeeComponent from './component/UpdateEmployeeComponent';
import ViewEmployeeComponent from './component/ViewEmployeeComponent';
function App() {
  return (
    <div>
      <Router>
          <HeaderComponent/>
            <div className="container">
              <Routes> 
                {/* http://localhost:3000/ */}
                <Route path='/' exact element={<ListEmployeeComponent/>}></Route>
                {/* http://localhost:3000/employees */}
                <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
                <Route path='/add-employees/:id' element={<CreateEmployeeComponent/>}></Route>
                {/* <Route path='/update-employees/:id' element={<UpdateEmployeeComponent/>}></Route> */}
                <Route path='/view-employees/:id' element={<ViewEmployeeComponent/>}></Route>
              </Routes>
              
            </div>
          <FooterComponent/>
      </Router>
    </div>
    
  );
}

export default (App);

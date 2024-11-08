import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./Components/Navbar/navbar";

import Main from "./Pages/Main/main";
import Add from './Pages/Add/add';
import BooksDue from "./Pages/BooksDue/due";
import Oops from "./Pages/Error/error";
import Search from "./Pages/Search/search";
import SearchFirst from './Pages/Search/searchFirst';
import PatronSearch from './Pages/Search/patronsearch';
import SearchBookName from './Pages/Search/searchBookName';
import RestrictedPatronSearch from './Pages/Search/restrictedPatrons';
import OverDue from './Pages/OverDue/OverDue';
import Update from './Pages/Update/update';

import AfricanAmTitles from './Generes/AfricanAm';
import AfricanAmHistory from './Generes/AfricanAmHistory';
import Biography from './Generes/Bio';
import CareerReady from './Generes/CareerReady';
import Classics from './Generes/Classics';
import Fantasy from './Generes/Fantasy';
import Fiction from './Generes/Fiction';
import Horror from './Generes/Horror';
import LifeFiction from './Generes/LifeFic';
import Medical from './Generes/Medical';
import MovieTV from './Generes/MovieTv';
import NonFiction from './Generes/Non-Fict';
import Other from './Generes/Other';
import Reference from './Generes/Reference';
import Religious from './Generes/Religious';
import Romance from './Generes/Romance';
import Spanish from './Generes/Spanish';
import Suspense from './Generes/Suspense';

import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main/>}/>

          <Route path="/AfricanAm" element={<AfricanAmTitles/>}/>
          <Route path="/AfricanAmHistory" element={<AfricanAmHistory/>}/>
          <Route path="/Bio" element={ <Biography/>}/>
          <Route path="/Classics" element={<Classics/>}/>
          <Route path="/CareerReady" element={<CareerReady/>}/>
          <Route path="/Fantasy" element={<Fantasy/>}/>
          <Route path="/Fiction" element={<Fiction/>}/>
          <Route path="/Horror" element={<Horror/>}/>
          <Route path="/LifeFic" element={<LifeFiction/>}/>
          <Route path="/Medical" element={<Medical/>}/>
          <Route path="/MovieTv" element={ <MovieTV/>}/>
          <Route path="/Non-Fict" element={<NonFiction/>}/>
          <Route path="/Other" element={<Other/>}/>
          <Route path="/Reference" element={<Reference/>}/>
          <Route path="/Religious" element={<Religious/>}/>
          <Route path="/Romance" element={<Romance/>}/>
          <Route path="/Spanish" element={<Spanish/>}/>  
          <Route path="/Suspense" element={<Suspense/>}/> 

          <Route path="/searchALastname" element={<Search/>}/>
          <Route path="/searchAFirstname" element={<SearchFirst/>}/>
          <Route path="/searchABookname" element={<SearchBookName/>}/>
          <Route path="/searchPatronLastname" element={<PatronSearch/>}/>
          <Route path="/searchRestrictedPatrons" element={<RestrictedPatronSearch/>}/>
          <Route path="/dueDates" element={<BooksDue/>}/>
          <Route path="/overDue" element={<OverDue/>}/>
          <Route path="/Add" element={<Add/>}/>
          <Route path="/inventoryUpdate/:id" element={<Update/>}/>
             {/* Search by author */}
          <Route path="*" element={<Oops />}/>
 </Routes>
   
   </Router>  
</div>
  );
}

export default App;

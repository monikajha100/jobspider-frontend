import Category from "./admin/category/Category";
import DisplayAllCategory from "./admin/category/DisplayAllCategory";
import SubCategory from "./admin/subcategory/SubCategory";
import DisplayAllSubCategory from "./admin/subcategory/DisplayAllSubCategory";
import Company from"./admin/companies/Company";
import DisplayAllCompany from "./admin/companies/DisplayAllCompany";

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Category/>} path="/category"/>
          <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>
          <Route element={<SubCategory/>} path="/subcategory"/>
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory"/>
          <Route element={<Company/>} path="/company"/>
          <Route element={<DisplayAllCompany/>} path="/displayallcompany"/>
          
       </Routes>
      </Router>
    
    </div>
  );
}

export default App;

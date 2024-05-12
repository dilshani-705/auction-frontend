import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes

import AddItemForm from './component/Items/AddItemForm';
import ViewItems from './component/Items/ViewItems';



function App() {
  return (
    <BrowserRouter>
      {/* Use Routes to wrap Route components */}
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/update-ItemDetails/:id" element={<AddItemForm />} />
        <Route path="/add-ItemDetails" element={<AddItemForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Recipes from './components/Recipes.jsx';
import CreateCard from './components/CreateCard.jsx';
import UpdateCard from './components/UpdateCard.jsx';

const App = props => {
  return (
    <div className="router">
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<Recipes />}
          />
          <Route
            exact
            path="/create"
            element={<CreateCard />}
          />
           <Route
            exact
            path="/update"
            element={<UpdateCard />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

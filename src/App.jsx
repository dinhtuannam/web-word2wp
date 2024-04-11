import './App.css';
import HomePage from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<HomePage />}/>
          </Route>
        </Routes>
      </Router>
      
    </>
  );
};

export default App;

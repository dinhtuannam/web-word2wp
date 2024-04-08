import './App.css';
import HomePage from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Auth from './components/auth';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route >
            <Route path='/' element={<HomePage />}/>
          </Route>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </Router>
      
    </>
  );
};

export default App;

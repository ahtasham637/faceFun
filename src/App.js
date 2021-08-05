import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WebcamPage from './pages/WebcamPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
        <div className="App w-full h-screen bg-gray-600 container">
          <Navbar />

          <Switch>
            <ProtectedRoute exact path="/face">
              <WebcamPage />
            </ProtectedRoute>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

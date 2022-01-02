import logo from './logo.svg';
import './App.css';



import Links from './components/Links';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container p-4">
      <div className="row">
          <div className="col-12">
              <Links/>
          </div>
      </div>
      <ToastContainer/>
      
    </div>
  );
}

export default App;

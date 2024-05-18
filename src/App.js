import './App.css';
import { LoginPage } from './Components/Assets/LoginForm/LoginPage';
import {HomePage} from './Components/Assets/HomePage';
import { BusModule } from './Components/Assets/BusModule';
import {AboutUsPage} from './Components/Assets/AboutUs';
import {ContactUsPage} from './Components/Assets/ContactUs';
import { AdminPanel } from './Components/Assets/AdminPanel';


function App() {
  const currentPath = window.location.pathname; // Get the current path using window.location.pathname

  let componentToRender;
  if (currentPath === '/HomePage') {
    componentToRender = <HomePage />;
  }
  else if (currentPath === '/BusModule') {
    componentToRender = <BusModule />;
  } 
  else if (currentPath === '/AboutUs') {
    componentToRender = <AboutUsPage />;
  }
  else if (currentPath === '/ContactUs') {
    componentToRender = <ContactUsPage />;
  }
  else if (currentPath === '/AdminPanel') {
    componentToRender = <AdminPanel />;
  }
  else {
    componentToRender = <LoginPage />;
  }

  return (
    <div>
      {/* <LoginPage/>
      <HomePage/> */}
      {componentToRender}
 
    </div>
  );
}

export default App;

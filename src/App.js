import Navbar from './components/navbar/navbar.js';
import Body from './components/body/body.js';
import ConnectionChecker from './components/check_connection/connection_component.js';
function App() {
  return (
    <div>
      <Navbar/>
      <Body/>
      <ConnectionChecker/>
    </div>
  );
}

export default App;

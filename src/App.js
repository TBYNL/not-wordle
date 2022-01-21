import './App.css';
import Home from './components/Home';
import { NavigationBar } from './components/NavigationBar';
import { useStore } from './hooks/useStore';

function App() {

  const darkMode = useStore(state => state.darkMode)
  document.body.style.backgroundColor = darkMode ? 'black' : 'white';

  return (
    <>
      <NavigationBar />
      <Home />
    </>
  );
}

export default App;

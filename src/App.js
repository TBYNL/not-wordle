import { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { NavigationBar } from './components/NavigationBar';
import { useStore } from './hooks/useStore';
import { Modal } from './components/Modal';

function App() {

  const { modal: { show, title, description, children }, bgColor, setModalDetails } = useStore(state => ({ modal: state.modal, darkMode: state.darkMode, bgColor: state.bgColor(), setModalDetails: state.setModalDetails }));

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <>
      <NavigationBar />
      <Home />
      <Modal showModal={show} onClose={() => setModalDetails({ title, description, children, show: false })} title={title} description={description}>
        {children}
      </Modal>
    </>
  );
}

export default App;

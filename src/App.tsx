import './App.css'
import GeneralBackground from './components/GeneralBackground/GeneralBackground'
import { useDispatch } from 'react-redux';
import { setScreenWidth } from './redux/slice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
const forOrientation = () => {
        setTimeout(() => {
                dispatch(setScreenWidth(window.innerWidth));
        }, 100);
    };

  forOrientation();

  window.removeEventListener('orientationchange', forOrientation);

    useEffect(() => {
        window.addEventListener('orientationchange', forOrientation);
    });
  return (
      <GeneralBackground>
        form
      </GeneralBackground>
  )
}

export default App

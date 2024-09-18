import './App.css'
import GeneralBackground from './components/GeneralBackground/GeneralBackground'
import { useDispatch } from 'react-redux';
import { setScreenWidth, setScreenHeight } from './redux/slice';
import { useEffect } from 'react';
import TimerForm from './components/TimerForm/TimerForm';

function App() {
  const dispatch = useDispatch();
const forOrientation = () => {
        setTimeout(() => {
          dispatch(setScreenWidth(window.innerWidth));
          dispatch(setScreenHeight(window.innerHeight));
        }, 100);
    };

  useEffect(() => {
    forOrientation();
  })

  window.removeEventListener('orientationchange', forOrientation);

    useEffect(() => {
        window.addEventListener('orientationchange', forOrientation);
    });
  return (
      <GeneralBackground>
        <TimerForm/>
      </GeneralBackground>
  )
}

export default App

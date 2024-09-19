import './App.css'
import GeneralBackground from './components/GeneralBackground/GeneralBackground'
import { useDispatch, useSelector } from 'react-redux';
import { setScreenWidth, setScreenHeight } from './redux/slice';
import { getAnswer } from './redux/selectors';
import { useEffect } from 'react';
import TimerForm from './components/TimerForm/TimerForm';
import FinalComponent from './components/FinalComponent/FinalComponent';

function App() {
  const dispatch = useDispatch();

  const answer = useSelector(getAnswer);

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
      {(answer !== "goodTimer" && answer !== "goodFinal") && <TimerForm />}
      {(answer === "goodTimer" || answer === "goodFinal") && <FinalComponent/>}
      </GeneralBackground>
  )
}

export default App

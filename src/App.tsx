import GeneralBackground from './components/GeneralBackground/GeneralBackground'
import { useDispatch, useSelector } from 'react-redux';
import { setScreenWidth, setScreenHeight } from './redux/slice';
import { getAnswer } from './redux/selectors';
import { useEffect } from 'react';
import TimerForm from './components/TimerForm/TimerForm';
import FinalComponent from './components/FinalComponent/FinalComponent';
import FirstQuestion from './components/FirstQuestion/FirstQuestion';

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
      {(
        answer !== "goodTimer" &&
        answer !== "goodFinal" &&
        answer !== "badFinal" &&
        answer !== "goodFirst" &&
        answer !== "badFirst"
      ) && <TimerForm />}
      {(answer === "goodTimer" || answer === "badFirst") && <FirstQuestion/>}
      {(answer === "goodFirst" ||
        answer === "goodFinal" ||
        answer === "badFinal"
      ) && <FinalComponent />}
      </GeneralBackground>
  )
}

export default App

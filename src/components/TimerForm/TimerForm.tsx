import css from "./TimerForm.module.css";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "../../redux/slice";
import { getScreenWidth, getAnswer } from "../../redux/selectors";
import Heart from "../../svg-components/Heart";
import BrokenHeart from "../../svg-components/BrokenHeart";

const TimerForm = () => {
  const dispatch = useDispatch();

  const [years, setYears] = useState<number>(0);
  const [remainingMonths, setRemainingMonths] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [remainingHours, setRemainingHours] = useState<number>(0);
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [hoverCoefGood, setHoverCoefGood] = useState<number>(1);
  const [hoverCoefBad, setHoverCoefBad] = useState<number>(1);
  const screenWidth = useSelector(getScreenWidth);
  const answer = useSelector(getAnswer);

  const allDivRef = useRef<HTMLDivElement>(null);
  const secondAllDivRef = useRef<HTMLDivElement>(null);
  const firstMassageRef = useRef<HTMLImageElement>(null);
  const generalTextRef = useRef<HTMLParagraphElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const monthsRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minutesRef = useRef<HTMLSpanElement>(null);
  const secondsRef = useRef<HTMLSpanElement>(null);
  const questionTextRef = useRef<HTMLParagraphElement>(null);
  const answerFirstMessageRef = useRef<HTMLImageElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const brokenHeartRef = useRef<HTMLButtonElement>(null);
  const bedAnswerRef = useRef<HTMLDivElement>(null);
  const badGeneralTextRef = useRef<HTMLParagraphElement>(null);
  const badSecondGeneralTextRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    const start = new Date("2021-10-21 19:43:00");

    const interval = setInterval(() => {
      const now = new Date();

      let yearsDiff = now.getFullYear() - start.getFullYear();
      let monthsDiff = now.getMonth() - start.getMonth();
      let daysDiff = now.getDate() - start.getDate();
      let hoursDiff = now.getHours() - start.getHours();
      let minutesDiff = now.getMinutes() - start.getMinutes();
      let secondsDiff = now.getSeconds() - start.getSeconds();

      if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
      }

      if (daysDiff < 0) {
        monthsDiff--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        daysDiff += previousMonth.getDate(); 
      }

      if (hoursDiff < 0) {
        daysDiff--;
        hoursDiff += 24;
      }
      if (minutesDiff < 0) {
        hoursDiff--;
        minutesDiff += 60;
      }
      if (secondsDiff < 0) {
        minutesDiff--;
        secondsDiff += 60;
      }

      setYears(yearsDiff);
      setRemainingMonths(monthsDiff);
      setRemainingDays(daysDiff);
      setRemainingHours(hoursDiff);
      setRemainingMinutes(minutesDiff);
      setRemainingSeconds(secondsDiff);
      
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (screenWidth > 0 && allDivRef.current && secondAllDivRef.current
      && answerFirstMessageRef.current
      && heartRef.current && brokenHeartRef.current && bedAnswerRef.current) {
      const allDiv = allDivRef.current;
      const secondAllDiv = secondAllDivRef.current;
      const answerFirstMessage = answerFirstMessageRef.current;
      const heart = heartRef.current;
      const brokenHeart = brokenHeartRef.current;
      const bedAnswer = bedAnswerRef.current;

      allDiv.style.height = screenWidth / 2.5 + 'px';
      secondAllDiv.style.width = screenWidth / 1.9 + 'px';
      secondAllDiv.style.padding = screenWidth / 50 + 'px';
      secondAllDiv.style.paddingBottom = screenWidth / 20 + 'px';
      secondAllDiv.style.gap = screenWidth / 50 + 'px';

      answerFirstMessage.style.width = screenWidth / 13 + 'px';

      heart.style.right = screenWidth / 30 + 'px';
      brokenHeart.style.left = screenWidth / 30 + 'px';

      bedAnswer.style.fontSize = screenWidth / 70 + 'px';
    }

    if (firstMassageRef.current && generalTextRef.current && yearsRef.current && monthsRef.current
      && daysRef.current && hoursRef.current && minutesRef.current
      && secondsRef.current && questionTextRef.current) {
      const firstMassage = firstMassageRef.current;
      const generalText = generalTextRef.current;
      const yearsR = yearsRef.current;
      const monthsR = monthsRef.current;
      const daysR = daysRef.current;
      const hoursR = hoursRef.current;
      const minutesR = minutesRef.current;
      const secondsR = secondsRef.current;
      const questionText = questionTextRef.current;

      firstMassage.style.width = screenWidth / 4 + 'px';
      generalText.style.fontSize = screenWidth / 72 + 'px';
      generalText.style.textIndent = screenWidth / 50 + 'px';

      yearsR.style.fontSize = screenWidth / 60 + 'px';
      yearsR.style.width = screenWidth / 40 + 'px';

      monthsR.style.fontSize = screenWidth / 60 + 'px';
      monthsR.style.width = screenWidth / 40 + 'px';

      daysR.style.fontSize = screenWidth / 60 + 'px';
      daysR.style.width = screenWidth / 40 + 'px';

      hoursR.style.fontSize = screenWidth / 60 + 'px';
      hoursR.style.width = screenWidth / 40 + 'px';

      minutesR.style.fontSize = screenWidth / 60 + 'px';
      minutesR.style.width = screenWidth / 40 + 'px';

      secondsR.style.fontSize = screenWidth / 60 + 'px';
      secondsR.style.width = screenWidth / 40 + 'px';

      questionText.style.fontSize = screenWidth / 72 + 'px';
      questionText.style.textIndent = screenWidth / 50 + 'px';
    }

    if (badGeneralTextRef.current && badSecondGeneralTextRef.current) {
      const badGeneralText = badGeneralTextRef.current;
      const badSecondGeneralText = badSecondGeneralTextRef.current;

      badGeneralText.style.fontSize = screenWidth / 72 + 'px';
      badGeneralText.style.textIndent = screenWidth / 50 + 'px';

      badSecondGeneralText.style.fontSize = screenWidth / 72 + 'px';
      badSecondGeneralText.style.textIndent = screenWidth / 50 + 'px';

    }
  }, [screenWidth, answer]);

  function helpRightWords(time: number): string {
    const timeArray = String(time).split('');
    if (timeArray[timeArray.length - 2] !== '1' && timeArray[timeArray.length - 1] === '1') {
      return '1'
    } else if (timeArray[timeArray.length - 2] !== '1' && (
      timeArray[timeArray.length - 1] === '2' || timeArray[timeArray.length - 1] === '3' || timeArray[timeArray.length - 1] === '4'
    )) {
      return '2'
    }
    return String(time)
  }

  return (
    <div ref={allDivRef} className={css.allDiv}>
      <div ref={secondAllDivRef} className={css.secondAllDiv}>
        {answer === "badTimer" ? 
          <div>
            <p ref={badGeneralTextRef} className={css.text}>Уупс... Зрається ти випадково натиснула не ту кнопку, адже у нас все ідеально <span className={css.badSpan}>
              <span className={css.divInBadSpan}>
                <Heart color="red" size={screenWidth / 50} />
              </span>
            </span>
            </p>
            <p ref={badSecondGeneralTextRef} className={css.text}>{'Але не засмучуйся, завжди можна все виправити і обрати правильний варіннт))'}</p>
          </div>
        :
          <>
          <img ref={firstMassageRef} className={css.firstMassage} src='/love-postcard/images/first-message.jpg' alt="First message" />
      <div>
        <p ref={generalTextRef} className={css.text}>Cаме це повідомлення будо перше, що я написав тобі в Телеграмі. Саме це повідомлення стало відправною точкою нашої чарвної історії, яка триває вже
        <span ref={yearsRef} className={css.time}>{years}</span> {helpRightWords(years) === "1" ? "рік" : helpRightWords(years) === "2" ? "роки" : "років"},
        <span ref={monthsRef} className={css.time}>{remainingMonths}</span> {helpRightWords(remainingMonths) === "1" ? "місяць" : helpRightWords(remainingMonths) === "2" ? "місяці" : "місяців"},
        <span ref={daysRef} className={css.time}>{remainingDays}</span> {helpRightWords(remainingDays) === "1" ? "день" : helpRightWords(remainingDays) === "2" ? "дні" : "днів"},
        <span ref={hoursRef} className={css.time}>{remainingHours}</span> {helpRightWords(remainingHours) === "1" ? "годину" : helpRightWords(remainingHours) === "2" ? "години" : "годин"},
        <span ref={minutesRef} className={css.time}>{remainingMinutes}</span> {helpRightWords(remainingMinutes) === "1" ? "хвилину" : helpRightWords(remainingMinutes) === "2" ? "хвилини" : "хвилин"},
        <span ref={secondsRef} className={css.time}>{remainingSeconds}</span> {helpRightWords(remainingSeconds) === "1" ? "секунду" : helpRightWords(remainingSeconds) === "2" ? "секунди" : "cекунд"} і не збирається закінчуватися.
      </p>
      <p ref={questionTextRef} className={css.text}>І якби зараз в тебе зʼявилась би можливісь щось змінити в минулому, як би ти мені тоді відповіла на це првідомлення?</p>
      </div></>
        }
        <button ref={heartRef} className={`${css.button} ${css.heart}`}
          onMouseEnter={() => setHoverCoefGood(1.05)}
          onMouseLeave={() => setHoverCoefGood(1)}
          onClick={() => dispatch(setAnswer('goodTimer'))}
        >
        <div className={css.heartImageDiv}>
           <Heart size={screenWidth > 0 ? screenWidth/5 * hoverCoefGood : 200} color={answer === "badTimer" ? "var(--dark-red)" : "red"} />
        <img ref={answerFirstMessageRef} className={css.answerFirstMessage} src="/love-postcard/images/answer-first-message.jpg" alt="Answer first message"/>
       </div>
      </button>
        <button ref={brokenHeartRef} className={`${css.button} ${css.brokenHeart}`}
          onMouseEnter={() => setHoverCoefBad(1.05)}
          onMouseLeave={() => setHoverCoefBad(1)}
          onClick={() => dispatch(setAnswer('badTimer'))}
        >
          <div className={css.heartImageDiv}>
            <BrokenHeart size={screenWidth > 0 ? screenWidth / 5 * hoverCoefBad : 200} />
            <div ref={bedAnswerRef} className={css.bedAnswer}>
              <p>Щось інакше!!!</p>
            <p>{`Все пішло не по плану(((`}</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
};

export default TimerForm;
import css from "./FormTemplate.module.css";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "../../redux/slice";
import { getAnswer, getScreenWidth } from "../../redux/selectors";
import Heart from "../../svg-components/Heart";
import BrokenHeart from "../../svg-components/BrokenHeart";

type GeneralBackgroundProps = {
  children: React.ReactNode,
  goodAnswer: React.ReactNode,
  badAnswer: React.ReactNode,
  goodAnswerValue: string,
  badAnswerValue: string,
  heightCoef: number,
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  onClick?: () => void
}

const FormTemplate = ({
  children,
  goodAnswer,
  badAnswer,
  goodAnswerValue,
  badAnswerValue,
  heightCoef,
  onMouseEnter,
  onMouseLeave,
  onClick
}: GeneralBackgroundProps) => {
  const dispatch = useDispatch();
  const screenWidth = useSelector(getScreenWidth);
  const answer = useSelector(getAnswer);

  const allDivRef = useRef<HTMLDivElement>(null);
  const secondAllDivRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const brokenHeartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (allDivRef.current && secondAllDivRef.current && heartRef.current &&
      brokenHeartRef.current && answer !== 'goodFinal') {
      const allDiv = allDivRef.current;
      const secondAllDiv = secondAllDivRef.current;
      const heart = heartRef.current;
      const brokenHeart = brokenHeartRef.current;

      allDiv.style.height = screenWidth / heightCoef + 'px';
      secondAllDiv.style.width = screenWidth / 1.9 + 'px';
      secondAllDiv.style.padding = screenWidth / 50 + 'px';
      if (answer !== "badFirst") {
        secondAllDiv.style.paddingBottom = screenWidth / 20 + 'px';
      }
      secondAllDiv.style.gap = screenWidth / 50 + 'px';
      heart.style.right = screenWidth / 30 + 'px';
      brokenHeart.style.left = screenWidth / 30 + 'px';
    }
  }, [answer, screenWidth, heightCoef])
  return (
    <div ref={allDivRef} className={css.allDiv}>
      <div
        id="secondAllDiv"
        ref={secondAllDivRef}
        className={css.secondAllDiv}>
        {children}
        <button
          ref={heartRef}
          className={`${css.button} ${answer === 'goodFinal' ? css.goodFinal : css.hoverButton}`}
          onClick={() => dispatch(setAnswer(goodAnswerValue))}
          style={{
            'zIndex': answer === 'goodFinal' ? '10' : '5',
            '--size': screenWidth > 0 ? screenWidth / 5 + 'px' : 200 + 'px'
          } as React.CSSProperties}
        >
          <div className={css.heartImageDiv}>
          <Heart size='100%' color={answer === "badTimer" ? "var(--dark-red)" : "red"} />
            {goodAnswer}
            </div>
      </button>
        <button id="draggableElement"
          ref={brokenHeartRef}
          className={`${css.button} ${answer === 'goodFinal' ? css.goodFinal : css.hoverButton}`}
          onClick={() => {
            dispatch(setAnswer(badAnswerValue))
            if (onClick) {
              onClick()
            }
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={answer === "goodFinal"}
          style={{
            'zIndex': answer !== "goodFinal" ? "10" : '5',
            '--size': screenWidth > 0 ? screenWidth / 5 + 'px' : 200 + 'px'
          } as React.CSSProperties}
        >
          <div className={css.heartImageDiv}>
            <BrokenHeart size='100%' color={answer === "goodFinal" ? 'var(--black-background-transparent-color)' : 'black' } />
            {badAnswer}
            </div>
        </button>
      </div>
      </div>
  )
}

export default FormTemplate
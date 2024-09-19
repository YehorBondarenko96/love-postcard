import css from "./FinalComponent.module.css";
import FormTemplate from "../FormTemplate/FormTemplate";
import { useSelector } from "react-redux";
import { getScreenWidth } from "../../redux/selectors";
import { useState, useEffect, useCallback } from "react";

const FinalComponent = () => {
  const screenWidth = useSelector(getScreenWidth);

  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(null);
  const [secondAllDiv, setSecondAllDiv] = useState<HTMLDivElement | null>(null);
  const [badHover, setBadHover] = useState<boolean>(false);

const moveElement = useCallback((e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

  if (draggableElement && secondAllDiv) {
    const rect = secondAllDiv.getBoundingClientRect();
    const secondAllDivX = rect.left;
    const secondAllDivY = rect.top;
    const elemRect = draggableElement.getBoundingClientRect();
    const elemX = elemRect.left;
    const elemY = elemRect.top;

    draggableElement.style.transform = 'translate(0, 0)';
    if (
      mouseX - secondAllDivX < draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY < draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${mouseX - secondAllDivX - (mouseX - elemX)}px`;
      draggableElement.style.top = `${mouseY - secondAllDivY - (mouseY - elemY)}px`;
    } else if (
      mouseX - secondAllDivX >= draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY >= draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${(mouseX - secondAllDivX - (mouseX - elemX)) - (draggableElement.offsetHeight - (mouseX - elemX))}px`;
      draggableElement.style.top = `${(mouseY - secondAllDivY - (mouseY - elemY)) - (draggableElement.offsetHeight - (mouseY - elemY))}px`;
      
      } else if (
      mouseX - secondAllDivX >= draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY < draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${(mouseX - secondAllDivX - (mouseX - elemX)) - (draggableElement.offsetHeight - (mouseX - elemX))}px`;
      draggableElement.style.top = `${mouseY - secondAllDivY - (mouseY - elemY)}px`;
    } else if (
      mouseX - secondAllDivX < draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY >= draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${mouseX - secondAllDivX - (mouseX - elemX)}px`;
      draggableElement.style.top = `${(mouseY - secondAllDivY - (mouseY - elemY)) - (draggableElement.offsetHeight - (mouseY - elemY))}px`;
    }
    }
  }, [draggableElement, secondAllDiv]);
  
  const onMouseEnter = () => {
    if (draggableElement instanceof HTMLElement && secondAllDiv instanceof HTMLDivElement) {
      document.addEventListener('mousemove', moveElement);
      setBadHover(true)
    }
  };

  const onMouseLeave = () => {
    if (draggableElement instanceof HTMLElement && secondAllDiv instanceof HTMLDivElement) {
      document.removeEventListener('mousemove', moveElement);
      setTimeout(() => {
        setBadHover(false)
      }, 1000)
    }
  }

  useEffect(() => {
    const element = document.getElementById('draggableElement');
    const divElem = document.getElementById('secondAllDiv');
    if (element instanceof HTMLElement && divElem instanceof HTMLDivElement) {
      setDraggableElement(element)
      setSecondAllDiv(divElem)
    }
  }, [])

  return (
    <>
    {
      typeof screenWidth === "number" &&
      <FormTemplate
      goodAnswer={
        <div className={css.answerDiv} 
        style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}
        >
          <p>
          Так, коханий!!!
        </p>
                <p>Це було дуже приємно</p>
        </div>
      }
      goodAnswerValue="goodFinal"
      badAnswer={
        <div className={`${css.answerDiv} ${css.badAnswerDiv}`} 
          style={{
            'color': badHover ? "var(--white-background-transparent-color)" : "#ffffff",
            '--screenWidth': screenWidth + 'px'
          } as React.CSSProperties}
        >
          <p>Ні!</p>
          <p>{'Фігня якась(('}</p>
          <div
                  className={css.lastBadMessage}
            style={{
              'opacity': badHover ? 1 : 0,
              '--screenWidth': screenWidth + 'px'
            } as React.CSSProperties}
                >
                  <p>Ну, я же старався...</p>
            </div>
        </div>
      }
      badAnswerValue="badFinal"
            heightCoef={4}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
    >
            <p
              className={css.generalText}
        style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}
            >{'Ну що, тобі сподобався мій маленький інтерактивчик?)'}</p>
    </FormTemplate>
      }
    </>
  )
}

export default FinalComponent
import css from "./FinalComponent.module.css";
import FormTemplate from "../FormTemplate/FormTemplate";
import { useSelector } from "react-redux";
import { getScreenWidth, getAnswer } from "../../redux/selectors";
import { useState, useEffect, useCallback } from "react";
import Heart from "../../svg-components/Heart";

const FinalComponent = () => {
  const screenWidth = useSelector(getScreenWidth);
  const answer = useSelector(getAnswer);

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
      draggableElement.style.left = `${mouseX - secondAllDivX - (mouseX - elemX) + 10}px`;
      draggableElement.style.top = `${mouseY - secondAllDivY - (mouseY - elemY) + 10}px`;
    } else if (
      mouseX - secondAllDivX >= draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY >= draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${(mouseX - secondAllDivX - (mouseX - elemX)) - (draggableElement.offsetHeight - (mouseX - elemX)) - 10}px`;
      draggableElement.style.top = `${(mouseY - secondAllDivY - (mouseY - elemY)) - (draggableElement.offsetHeight - (mouseY - elemY)) - 10}px`;
      
      } else if (
      mouseX - secondAllDivX >= draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY < draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${(mouseX - secondAllDivX - (mouseX - elemX)) - (draggableElement.offsetHeight - (mouseX - elemX))- 10}px`;
      draggableElement.style.top = `${mouseY - secondAllDivY - (mouseY - elemY) + 10}px`;
    } else if (
      mouseX - secondAllDivX < draggableElement.offsetWidth / 2 + mouseX - secondAllDivX - (mouseX - elemX) &&
      mouseY - secondAllDivY >= draggableElement.offsetHeight / 2 + mouseY - secondAllDivY - (mouseY - elemY)
    ) {
      draggableElement.style.left = `${mouseX - secondAllDivX - (mouseX - elemX) + 10}px`;
      draggableElement.style.top = `${(mouseY - secondAllDivY - (mouseY - elemY)) - (draggableElement.offsetHeight - (mouseY - elemY)) - 10}px`;
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

  const randomNumber = () => {
    const result = Math.ceil(Math.random() * screenWidth);
    return result 
  }
  const number = randomNumber() + screenWidth/3;
  const heartArray = [];
  const time = () => {
    const randomTime = Math.random() * 32;
    return randomTime < 8 ? randomTime + 8 : randomTime
  };

  for (let i = 0; i <= number; i++){
    const left = () => { 
      const random = randomNumber() > screenWidth/2 ? randomNumber() / (screenWidth/100) - 10 :randomNumber() / (screenWidth/100) + 10;
      const randomLeft = randomNumber() > screenWidth / 2 ? random : 0 - random;
      console.log('randomLeft: ', randomLeft);
      return randomLeft
    }; 
    const top = () => {
      const firstRandom = randomNumber();
      const random = randomNumber() > screenWidth/2 ? firstRandom / screenWidth * 100 : 0 - firstRandom / screenWidth * 100;
      return Math.abs(random)
    }
    const heartObj = {
      left: `${left()}%`,
      top: `${top()}%`,
    }
    heartArray.push(heartObj)
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
                {answer === "goodFinal" && 
                  heartArray.map((heart, index) => <div key={index} className={css.elem} style={{ '--left': heart.left, '--top': heart.top, '--time': `${time()}s` } as React.CSSProperties}>
          <Heart color={`rgb(255, ${Math.ceil(Math.random()*225)}, ${Math.ceil(Math.random()*225)})`} size={index % 10 === 0 ? Math.random() * 50 : Math.random() * 30} />
        </div>)
                }
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
            >{answer === "goodFinal" ? 'Робив з любовʼю та натхненний думками про тебе, моє сонечко' : 'Ну що, тобі сподобався мій маленький інтерактивчик?)'}</p>
    </FormTemplate>
      }
    </>
  )
}

export default FinalComponent
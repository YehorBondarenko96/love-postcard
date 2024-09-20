import css from "./FirstQuestion.module.css";
import FormTemplate from "../FormTemplate/FormTemplate";
import { useSelector } from "react-redux";
import { getScreenWidth, getScreenHeight, getAnswer } from "../../redux/selectors";
import { useEffect, useState, useCallback } from "react";
import Message from "../../svg-components/Message";

const FirstQuestion = () => {
  const screenWidth = useSelector(getScreenWidth);
  const screenHeight = useSelector(getScreenHeight);
  const answer = useSelector(getAnswer);

  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(null);
  const [secondAllDiv, setSecondAllDiv] = useState<HTMLDivElement | null>(null);

const onClick = useCallback(() => {

  if (draggableElement && secondAllDiv) {
    const badLeft = Math.random() * screenWidth - draggableElement.offsetWidth;
    const badTop = Math.random() * screenHeight;
    const rect = secondAllDiv.getBoundingClientRect();
    const secondAllDivX = rect.left;
    const secondAllDivY = rect.top;
    const elemRect = draggableElement.getBoundingClientRect();
    const elemX = elemRect.left;
    const elemY = elemRect.top;
    const progresX = Math.abs(badLeft - elemX);
    const prograsY = Math.abs(badTop - elemY);

    let randomLeft = badLeft;
    let randomTop = badTop;

    if (progresX < draggableElement.offsetWidth) {
      if (Math.random() > 0.5) {
        randomLeft += draggableElement.offsetWidth
      } else {
        randomLeft -= draggableElement.offsetWidth
      }
    }

    if (prograsY < draggableElement.offsetHeight) {
      if (Math.random() > 0.5) {
        randomTop += draggableElement.offsetHeight
      } else {
        randomTop -= draggableElement.offsetHeight
      }
    }

    randomLeft = randomLeft >= screenWidth - secondAllDivX ? randomLeft - draggableElement.offsetWidth : randomLeft < 0 - secondAllDivX ? randomLeft + draggableElement.offsetWidth : randomLeft;
    randomTop = randomTop >= screenHeight - secondAllDivY ? randomTop - draggableElement.offsetHeight*2 : randomTop < 0 - secondAllDivY ? randomTop + draggableElement.offsetHeight*2 : randomTop;
    
    draggableElement.style.transform = 'translate(0, 0)';
    draggableElement.style.left = `${randomLeft}px`;
    draggableElement.style.top = `${randomTop}px`;
  }
    
    
  }, [draggableElement, screenHeight, screenWidth, secondAllDiv]);

  useEffect(() => {
    const element = document.getElementById('draggableElement');
    const divElem = document.getElementById('secondAllDiv');
    if (element instanceof HTMLElement && divElem instanceof HTMLDivElement) {
      setDraggableElement(element)
      setSecondAllDiv(divElem)
    }
  }, [])
  return (
    <FormTemplate
      goodAnswer={
        <div className={css.answerDiv} 
        style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}
        >
          <p
            style={{
              'whiteSpace': 'nowrap'
          }}>Звісно, коханий!!!</p>
          <p
            style={{
              'whiteSpace': 'nowrap'
          }}>Жити без тебе не можу!!!</p>
        </div>
      }
      badAnswer={
        <div className={`${css.answerDiv} ${css.badAnswerDiv}`} 
        style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}
        >
          <p>Ну...</p>
          <p
            style={{
              'whiteSpace': 'nowrap'
          }}>Я, навіть, не знаю...</p>
        </div>
      }
      goodAnswerValue="goodFirst"
      badAnswerValue="badFirst"
      heightCoef={2.1}
      onClick={onClick}
    >
      {answer === "badFirst" ?
        <div
          className={css.badDiv}
          style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}
        >
          <div className={css.imageDiv}>
            <img width={screenWidth / 6} src="/love-postcard/images/very-bad.jpeg" alt="Very Bad" />
            <Message
              top="-30%"
              color='var(--white-background-transparent-color)'
              text="Я в шоці..."
              topText="37%"
              size={screenWidth / 11}
              fontSize={screenWidth/75}
            />
          </div>
          <h2 className={css.badText}>ЩО???</h2>
        </div> :
      <div className={css.generalText}
        style={{'--screenWidth': screenWidth + 'px'}as React.CSSProperties}>
        <h2 className={css.title}>Любов моя, сонечко моє, зайка, рибка моя золота!!!</h2>
      <p>Ти найбільше щасття в житті. Найцінніший скарб. Ти - сенс мого життя. Я досі не можу повірити, що мені повезло бути з тобою. Що ти - моя, а я - твій.</p>
      <p>Всі мої сильні почуття та палкі відчуття до тебе взаємні?</p>
        </div>
      }
    </FormTemplate>
  )
}

export default FirstQuestion
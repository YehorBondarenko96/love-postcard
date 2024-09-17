import css from "./GeneralBackground.module.css"
import Heart from "../../svg-components/Heart"
import { useSelector } from "react-redux";
import { setScreenWidth } from "../../redux/selectors";

type GeneralBackgroundProps = {
  children: React.ReactNode
}

const GeneralBackground = ({ children }: GeneralBackgroundProps) => {
  const screenWidth = useSelector(setScreenWidth);

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
      const random = randomNumber() > screenWidth/2 ? randomNumber() / (screenWidth/100) - 10 : randomNumber() / (screenWidth/100) + 10;
      return random
    }; 
    const top = () => {
      const random = randomNumber() > screenWidth/2 ? randomNumber() / (screenWidth/100) : 0 - randomNumber() / (screenWidth/100);
      const randomTop = random > (screenWidth/10 + 20) ? random - (screenWidth/10 + 20) : random < -(screenWidth/10 + 20) ? random + (screenWidth/10 + 20) : random;
      return randomTop
    }
    const heartObj = {
      left: `${left()}%`,
      top: `${top()}%`,
    }
    heartArray.push(heartObj)
  }
  return (
    <div className={css.allDiv}>
      <div className={css.heartsBubblesDiv}>
        {heartArray.map((heart, index) => <div key={index} className={css.elem} style={{ '--left': heart.left, '--top': heart.top, '--time': `${time()}s` } as React.CSSProperties}>
          <Heart color={`rgb(255, ${Math.ceil(Math.random()*225)}, ${Math.ceil(Math.random()*225)})`} size={index % 10 === 0 ? Math.random() * 50 : Math.random() * 30} />
        </div>)}
      </div>
      <div className={css.childrenDiv}>{children}</div>
    </div>
  )
}

export default GeneralBackground
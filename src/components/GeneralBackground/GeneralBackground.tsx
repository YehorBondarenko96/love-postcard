import css from "./GeneralBackground.module.css"
import Heart from "../../svg-components/Heart"

type GeneralBackgroundProps = {
  children: React.ReactNode
}

const GeneralBackground = ({ children }: GeneralBackgroundProps) => {
  const randomNumber = () => {
    const result = Math.ceil(Math.random() * 1000);
    return result 
  }
  const number = randomNumber() + 300;
  const heartArray = [];
  const time = () => {
    const randomTime = Math.random() * 32;
    return randomTime < 8 ? randomTime + 8 : randomTime
  };
  for (let i = 0; i <= number; i++){
    const left = randomNumber()/10;
    const top = () => {
      const random = randomNumber() > 500 ? randomNumber() / 10 : 0 - randomNumber() / 10;
      const randomTop = random > 120 ? random - 120 : random < -120 ? random + 120 : random;
      return randomTop
    }
    const heartObj = {
      left: `${left}%`,
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
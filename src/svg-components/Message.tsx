import styled from 'styled-components';

type MessageProps = {
  size?: number | string
  color?: string;
  text: string
  colorText?: string
  fontSize?: number | string
  whiteSpace?: string
  top?: string
  left?: string
  topText?: string
  leftText?: string
};

const AllDiv = styled.div`
  position: absolute;
`;

const SecondAllDiv = styled.div`
  position: relative;
`;

const TextMessage = styled.p`
  position: absolute;
  transform: translate(-50%, -50%);
`;

const Message = ({ size=100, color='#ffffff', text, colorText='#000000', fontSize=14, whiteSpace='nowrap', top='50%', left='50%', topText='50%', leftText='50%' }: MessageProps) => {
  return (
    <AllDiv
      style={{
        'top': top,
        'left': left,
      }}
    >
      <SecondAllDiv>
          <svg
            fill={color}
            width={typeof size === "number" ? `${size}px` : size}
            height={typeof size === "number" ? `${size}px` : size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8z" />
          </svg>
        <TextMessage
          style={{
            'top': topText,
            'left': leftText,
            'color': colorText,
            'fontSize': typeof fontSize === "number" ? `${fontSize}px` : fontSize,
            'whiteSpace': whiteSpace
          }}>
          {text}
        </TextMessage>
      </SecondAllDiv>
    </AllDiv>
      )
}
export default Message
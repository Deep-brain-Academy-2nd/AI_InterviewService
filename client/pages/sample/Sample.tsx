import styled, { withProps } from '../../styles/styled-components';

// Theme 사용 sample - media, color
const StyledP = styled.p`
  ${props => props.theme.media.desktop`
    color: black;
    font-size: 1rem;
  `}
  color: ${props => props.theme.color.purple};
  font-size: 5rem;
  div {
    p {
    }
  }
`;

interface ISample {
  visible: string;
}

const SampleWithProps = withProps<ISample, HTMLSpanElement>(styled.span)`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

interface IProps {
  text?: string;
}

const Test = (props: IProps) => (
  <StyledP>
    <SampleWithProps visible={true}>🐶Sample🐔</SampleWithProps>
    <SampleWithProps visible={false}>🐶Sample🐔</SampleWithProps>
  </StyledP>
)

export default Test;
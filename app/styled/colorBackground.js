import styled from 'styled-components/native';
import Colors from '../utils/colors.utils';

const ColorBackground = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.condition ? Colors.identifyBackground(props.condition, props.day) : '#C0C0C0'};
`;

export default ColorBackground;

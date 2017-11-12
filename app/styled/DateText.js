import styled from 'styled-components/native';

const DateText = styled.Text`
  color: ${props => props.day ? '#5C5C5C' : '#F3F3F3'};
  line-height: ${props => props.space ? 25 : 1};
 `;

export default DateText;

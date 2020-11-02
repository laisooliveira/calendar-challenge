import styled from 'styled-components';

interface IEventProps {
  gridArea: string;
}

export const EventContainer = styled.div<IEventProps>`
  grid-area: ${props => props.gridArea};
  background-color: #eaeaea;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 10px;
`;

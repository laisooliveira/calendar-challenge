import styled from 'styled-components';

interface IRowGrid {
  gridArea: string;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 660px;
`;

export const Column = styled.div`
  height: 100%;
  padding: 0 5px;
  width: 80px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(22, 30px);
  justify-content: space-between;
  align-items: flex-start;

  span {
    display: flex;
    text-align: end;
    font-size: 16px;
    align-items: baseline;
    justify-content: flex-end;

    span {
      font-size: 10px;
      color: #a4a4a4;
      margin-left: 10px;
    }

    &:nth-child(even) {
      font-size: 10px;
      color: #a4a4a4;
    }
  }
`;

export const RowGrid = styled.div<IRowGrid>`
  width: 100%;
  border: 1px solid #cbcbcb;
  height: 660px;
  display: grid;
  grid-template-areas: ${props => props.gridArea};
  grid-template-columns: repeat(6, 1fr);
  grid-auto-columns: max-content;
  grid-template-rows: 30px;
  grid-auto-rows: 1fr;
`;

export const Row = styled.div`
  height: 30px;
  width: 100%;
  z-index: -1;
  &:nth-child(even) {
    border-bottom: 1px solid #cbcbcb;
  }
`;

export const RowGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 140px);
  left: 108px;
  height: 660px;
  position: absolute;
`;

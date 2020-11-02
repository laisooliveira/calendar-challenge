import React from 'react';
import { Container, RowGrid, Column, Row, RowGridContainer } from './styles';
import Event, { IEvent } from '../Event/Event';
import { times, matrixGridArea, eventsInitialize } from '../../data/data';

const gridSize = 22;

interface IRow {
  id: number;
  events: IEvent[];
}

interface State {
  rows: IRow[];
  rowsSet: IRow[];
  gridArea: string[][];
  events: IEvent[];
}

class Grid extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      rows: [],
      rowsSet: [],
      gridArea: matrixGridArea,
      events: eventsInitialize,
    };
    this.createRow = this.createRow.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.createRow();
    await this.initializeMatrix();
  }

  createRow(): void {
    const rowIndex = [];
    const rowSetIndex = [];
    const { events } = this.state;
    for (let i = 0; i <= gridSize; i += 1) {
      const id = i * 30;
      const event = events.filter(
        (ev: IEvent) => id >= ev.start && id <= ev.end,
      );
      const eventSet = events.filter((ev: IEvent) => id === ev.start);
      rowIndex.push({
        id,
        events: event,
      });
      rowSetIndex.push({
        id,
        events: eventSet,
      });
    }
    this.setState({ rows: rowIndex, rowsSet: rowSetIndex });
  }

  calcColumns(event: IEvent): any {
    const { rows } = this.state;
    const result = {
      colStart: 0,
      colEnd: 0,
    };
    const rowsArray = rows;
    const rowStartIndex = event.start / 30;
    const rowEndIndex = event.end / 30;
    let size = 0;
    for (let i = rowStartIndex; i <= rowEndIndex; i += 1) {
      const eventSize = 6 / rowsArray[i].events.length;
      size = eventSize;

      const { events } = rowsArray[i];
      const index = events.indexOf(event);
      if (index !== -1) {
        if (index === 0) {
          if (size === 1) {
            result.colStart = 0;
            result.colEnd = 5;
          } else {
            if (size === 6) {
              size = 6 / rowsArray[i - 1].events.length;
            }
            result.colStart = 0;
            result.colEnd = size;
          }
        } else {
          result.colStart = size * index;
          result.colEnd = size * index + size;
        }
      }
    }
    return result;
  }

  fillLines(
    rowStart: number,
    id: string,
    rowEnd: number,
    colStart: number,
    colEnd: number,
  ): void {
    const { gridArea } = this.state;
    const array = gridArea;
    for (let i = rowStart; i <= rowEnd; i += 1) {
      array[i].fill(id, colStart, colEnd);
    }
    this.setState({ gridArea: array });
  }

  addInMatrix(event: IEvent): void {
    const columnIndex = this.calcColumns(event);
    const rowStartIndex = event.start / 30;
    const rowEndIndex = event.end / 30 - 1;

    this.fillLines(
      rowStartIndex,
      event.gridKey,
      rowEndIndex,
      columnIndex.colStart,
      columnIndex.colEnd,
    );
  }

  initializeMatrix(): void[][] {
    const { rows } = this.state;
    return rows.map((row: IRow) => {
      return row.events.map((event: IEvent) => this.addInMatrix(event));
    });
  }

  createGridArea(): string {
    const { gridArea } = this.state;
    const result = gridArea.map(row => {
      return `"${row.toString().replace(/,/gi, ' ')}"`;
    });
    return result.toString().replace(/,/gi, '');
  }

  renderRow(row: IRow): JSX.Element[] {
    return row.events.map((event: IEvent) => this.renderEvent(event));
  }

  renderHourColumn(): JSX.Element[] {
    return times.map(time => (
      <span>
        {time.hour}
        {time.meridiem && <span>{time.meridiem}</span>}
      </span>
    ));
  }

  renderEvent({ name, start, end, id, gridKey }: IEvent): JSX.Element {
    return (
      <Event name={name} id={id} gridKey={gridKey} end={end} start={start} />
    );
  }

  render(): JSX.Element {
    const { rowsSet } = this.state;

    return (
      <Container>
        <Column>{this.renderHourColumn()}</Column>
        <RowGridContainer>
          {rowsSet.map(row => (
            <Row />
          ))}
        </RowGridContainer>
        <RowGrid gridArea={this.createGridArea()}>
          {rowsSet.map((row: IRow) => this.renderRow(row))}
        </RowGrid>
      </Container>
    );
  }
}

export default Grid;

import React from 'react';
import { EventContainer } from './styles';

export interface IEvent {
  name: string;
  start: number;
  end: number;
  gridKey: string;
  id: number;
}
const Event: React.FC<IEvent> = ({ name, gridKey }: IEvent) => {
  return <EventContainer gridArea={gridKey}>{name}</EventContainer>;
};

export default Event;

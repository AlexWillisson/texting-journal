import { Message } from '../message/message';

export interface TimestampedMessageBunch {
  timestamp: Date;
  messages: Message[];
}

// Preload all messages to avoid dynamic imports
import enMessages from '../messages/en.json';
import arMessages from '../messages/ar.json';
import heMessages from '../messages/he.json';

export const messages = {
  en: enMessages,
  ar: arMessages,
  he: heMessages
} as const;

export type Messages = typeof messages;
export type Locale = keyof Messages;

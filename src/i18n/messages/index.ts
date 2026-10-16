import * as about from './about';
import * as certs from './certs';
import * as common from './common';
import * as contact from './contact';
import * as footer from './footer';
import * as hero from './hero';
import * as info from './info';
import * as nav from './nav';
import * as projects from './projects';
import * as skills from './skills';
import * as stats from './stats';

type Prefixed<P extends string, T extends Record<string, string>> = {
  [K in keyof T & string as `${P}.${K}`]: T[K];
};

function prefix<P extends string, T extends Record<string, string>>(
  name: P,
  messages: T,
): Prefixed<P, T> {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => [`${name}.${key}`, value]),
  ) as Prefixed<P, T>;
}

/** Catálogo ES completo (las claves de aquí tipan `useT`). */
export const esMessages = {
  ...prefix('about', about.es),
  ...prefix('certs', certs.es),
  ...prefix('common', common.es),
  ...prefix('contact', contact.es),
  ...prefix('footer', footer.es),
  ...prefix('hero', hero.es),
  ...prefix('info', info.es),
  ...prefix('nav', nav.es),
  ...prefix('projects', projects.es),
  ...prefix('skills', skills.es),
  ...prefix('stats', stats.es),
};

export type MessageKey = keyof typeof esMessages;

/** Catálogo EN con las mismas claves que ES. */
export const enMessages: Record<MessageKey, string> = {
  ...prefix('about', about.en),
  ...prefix('certs', certs.en),
  ...prefix('common', common.en),
  ...prefix('contact', contact.en),
  ...prefix('footer', footer.en),
  ...prefix('hero', hero.en),
  ...prefix('info', info.en),
  ...prefix('nav', nav.en),
  ...prefix('projects', projects.en),
  ...prefix('skills', skills.en),
  ...prefix('stats', stats.en),
} as Record<MessageKey, string>;

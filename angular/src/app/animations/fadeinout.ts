import { trigger, transition, animate, style } from '@angular/animations'

const from = { opacity: 0 };
const to = { opacity: 1 };

export const FadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style(from),
    animate('200ms ease-in', style(to)),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style(from)),
  ]),
]);

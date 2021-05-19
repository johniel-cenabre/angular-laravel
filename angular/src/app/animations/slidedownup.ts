import { trigger, transition, animate, style } from '@angular/animations'

const from = { transform: 'translateY(-100%)', opacity: 0 };
const to = { transform: 'translateY(0%)', opacity: 1 };

export const SlideDownUp = trigger('slideDownUp', [
  transition(':enter', [
    style(from),
    animate('200ms ease-in', style(to)),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style(from)),
  ]),
]);

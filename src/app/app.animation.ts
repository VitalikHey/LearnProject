import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animationContinueButton: AnimationTriggerMetadata = trigger(
  'ValidNotValid',
  [
    state(
      'notValid',
      style({
        right: '-2000px',
      }),
    ),
    state(
      'valid',
      style({
        right: '0',
      }),
    ),
    transition('valid => notValid', [animate('400ms ease-in-out')]),
    transition('notValid => valid', [animate('400ms ease-in-out')]),
  ],
);

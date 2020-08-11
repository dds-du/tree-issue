import { trigger, state, style, transition, animate } from "@angular/animations";

export const navAnimate = trigger('navStatus', [
    state('shrink', style({
        width: 0
    })),
    
    state('open', style({
        width: '*'
    })),

    transition('shrink => open', animate('300ms')),

    transition('open => shrink', animate('300ms'))
]);

export const siderAnimate = trigger('siderStatus', [
    state('active', style({
        right: 0
    })),
    
    state('inactive', style({
        right: '-100%'
    })),

    transition('active =>inactive', animate('400ms ease-in')),
    transition('inactive =>active', animate('400ms ease-out'))
]);
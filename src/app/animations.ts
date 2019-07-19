import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

export const routeAnimation =
    trigger('routeAnimations', [
        transition('* => *', [
            query(':enter, :leave',
                style({ position: 'absolute', width: '100%', height: '100%' }),
                { optional: true }
            ),

            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.2s ease-out', style({ opacity: 1 }))
                ], { optional: true }),

                query(':enter .zoom-animation', [
                    style({ transform: 'scale(.8)' }),
                    animate('0.2s ease-out', style({transform: 'scale(1)'}))
                ], { optional: true }),

                query(':leave', [
                    style({ opacity: 1 }),
                    animate('0.3s ease-out', style({ opacity: 0 }))
                ], { optional: true }),

                query(':leave .zoom-animation', [
                    style({ transform: 'scale(1)' }),
                    animate('0.2s ease-out', style({ transform: 'scale(.8)'}))
                ], { optional: true }),
            ])
        ])
    ]);

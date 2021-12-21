import {NgModule,Component,Input,ChangeDetectionStrategy, ViewEncapsulation, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-progressBar',
    template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" [attr.aria-valuemin]="min" [attr.aria-valuenow]="value" [attr.aria-valuemax]="max"
            [ngClass]="{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="progressPercentage + '%'" style="display:flex">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && _progressPercentage !== 0 ? 'flex' : 'none'">{{value}}{{unit}}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container">
                <div class="p-progressbar-value p-progressbar-value-animate"></div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./progressbar.css'],
    host: {
        'class': 'p-element'
    }
})
export class ProgressBar implements OnChanges {

    @Input() value: number;

    @Input() min: number = 0;

    @Input() max: number = 100;

    @Input() showValue: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() unit: string = '%';

    @Input() mode: string = 'determinate';

    private progressPercentage: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('value') || changes.hasOwnProperty('min') || changes.hasOwnProperty('max')) {
            this.progressPercentage = ((this.value - this.min) * 100) / (this.max - this.min);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressBar],
    declarations: [ProgressBar]
})
export class ProgressBarModule { }

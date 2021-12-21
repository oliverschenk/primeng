import { SimpleChange } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBar } from './progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressBar', () => {

	let progressbar: ProgressBar;
	let fixture: ComponentFixture<ProgressBar>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				ProgressBar
			]
		});

		fixture = TestBed.createComponent(ProgressBar);
		progressbar = fixture.componentInstance;
	});

	it('should fill 50%', () => {
		progressbar.value = 50;

		// manually force change event
		fixture.componentInstance.ngOnChanges({
			value: new SimpleChange(null, progressbar.value, false)
		});
		fixture.detectChanges();

		const progressbarValueEl = fixture.debugElement.query(By.css('.p-progressbar-value')).nativeElement;
		const progressbarLabelEl = fixture.debugElement.query(By.css('.p-progressbar-label')).nativeElement;
		expect(progressbarValueEl.style.width).toEqual('50%');
		expect(progressbarLabelEl.textContent).toEqual('50%');
	});

	it('should not show value', () => {
		progressbar.value = 50;
		progressbar.showValue = false;

		// manually force change event
		fixture.componentInstance.ngOnChanges({
			value: new SimpleChange(null, progressbar.value, false)
		});
		fixture.detectChanges();

		const progressbarValueEl = fixture.debugElement.query(By.css('.p-progressbar-value')).nativeElement;
		const progressbarLabelEl = fixture.debugElement.query(By.css('.p-progressbar-label'));
		expect(progressbarValueEl.style.width).toEqual('50%');
		expect(progressbarLabelEl).toBeFalsy();
	});

	it('should change style and styleClass', () => {
		progressbar.value = 50;
		progressbar.style = { 'height': '300px' };
		progressbar.styleClass = "Primeng";
		fixture.detectChanges();

		const progressbarEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(progressbarEl.style.height).toEqual('300px');
		expect(progressbarEl.className).toContain('Primeng');
	});

	it('should change unit', () => {
		progressbar.value = 50;
		progressbar.unit = '&';
		fixture.detectChanges();

		const progressbarLabelEl = fixture.debugElement.query(By.css('.p-progressbar-label')).nativeElement;
		expect(progressbarLabelEl.textContent).toEqual('50&');
	});

	it('should change mode', () => {
		progressbar.value = 50;
		progressbar.mode = 'indeterminate';
		fixture.detectChanges();

		const progressbarLabelEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(progressbarLabelEl.className).toContain('p-progressbar-indeterminate');
	});

	describe('Test ProgressBar fill given min and max range inputs', function() {

		const testCases = [
			{ min: undefined, max: undefined, value: 60, progressValue: 60 },
			{ min: undefined, max: 80, 		  value: 60, progressValue: 75 },
			{ min: undefined, max: 120, 	  value: 60, progressValue: 50 },
			{ min: 20, 		  max: undefined, value: 60, progressValue: 50 },
			{ min: 30, 		  max: 80, 		  value: 60, progressValue: 60 },
			{ min: 40, 		  max: 120, 	  value: 60, progressValue: 25 },
			{ min: -25, 	  max: undefined, value: 60, progressValue: 68 },
			{ min: -20,		  max: 80, 		  value: 60, progressValue: 80 },
			{ min: -40,		  max: 120, 	  value: 60, progressValue: 62.5 }
		];

		for (var x = 0; x < testCases.length; x++) {
			test_min_max_fill(testCases[x]);
		}	

		function test_min_max_fill(testCase) {
			it('should fill ' + testCase.progressValue + '% when min=' + testCase.min + 
				', max=' + testCase.max + ', value=' + testCase.value, () => {
				if (testCase.min) {
					progressbar.min = testCase.min;
				}
				if (testCase.max) {
					progressbar.max = testCase.max;
				}
				progressbar.value = testCase.value;

				// manually force change event
				fixture.componentInstance.ngOnChanges({
					value: new SimpleChange(null, testCase.value, false)
				});
				fixture.detectChanges();
		
				const progressbarValueEl = fixture.debugElement.query(By.css('.p-progressbar-value')).nativeElement;
				expect(progressbarValueEl.style.width).toEqual(testCase.progressValue + '%');
			});
		}
	});
});

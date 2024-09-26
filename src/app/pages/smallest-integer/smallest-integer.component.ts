import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-smallest-integer',
    standalone: true,
    imports: [],
    templateUrl: './smallest-integer.component.html',
    styleUrls: ['./smallest-integer.component.scss'],
})
export class SmallestIntegerComponent implements OnInit {
    ngOnInit(): void {
        this.test([1, 6, 3, 4, 2, 1], 5); // should log 5
        this.test([1, 2, 3, 4, 5], 6); // should log 6
        this.test([-1, -6, 4], 1); // should log 1
    }

    smallestMissingInt(A: number[]): number {
        const N = A.length;

        // 1: Replace out of range numbers with a placeholder (e.g., N+1)
        for (let i = 0; i < N; i++) {
            if (A[i] <= 0 || A[i] > N) {
                A[i] = N + 1;
            }
        }

        // 2: Use the index as a hash to mark numbers seen in the array
        for (let i = 0; i < N; i++) {
            const num = Math.abs(A[i]);
            if (num <= N) {
                A[num - 1] = -Math.abs(A[num - 1]); // Mark the number as seen by making the value at index num-1 negative
            }
        }

        // 3: Find the first missing positive number
        for (let i = 0; i < N; i++) {
            if (A[i] > 0) {
                return i + 1;
            }
        }

        // If all numbers are present, the missing number is N + 1
        return N + 1;
    }

    /**
     * Do not edit this function
     */
    private test(arr: number[], expected: number): void {
        const result = this.smallestMissingInt(arr);

        if (result === expected) {
            console.log(`Success: ${result} is the correct answer`);
        } else {
            console.error(`ERROR: ${result} !== ${expected}`);
        }
    }
}

import {Injectable, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    currentTemperature = signal('Loading...');
    private apiKey = '354b4e751f41872ac5ee002579748a47';
    private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) {
        this.getUserLocationAndFetchTemperature();
        setInterval(() => {
            this.getUserLocationAndFetchTemperature();
        }, 30000); // Update every 30 seconds
    }

    private getUserLocationAndFetchTemperature() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                this.fetchTemperature(lat, lon);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    private fetchTemperature(lat: number, lon: number) {
        this.http.get<any>(`${this.apiUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`)
            .pipe(
                map(data => Math.round(data.main['temp'])),  // Round temperature
                tap(temperature => this.currentTemperature.set(`${temperature}º`)), // Update the signal
                catchError(error => {
                    console.error("Error fetching weather data: ", error);
                    return of(null); // Return null or handle error gracefully
                })
            ).subscribe();
    }
}

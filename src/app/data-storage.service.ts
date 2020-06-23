import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Workout } from './shared/workout.model';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private workoutService: WorkoutService) { }

  storeWorkout() {
    const workout = this.workoutService.getWorkout();
    const date = workout.date.toDateString();
    const url = 'https://strengthpractice-7e443.firebaseio.com/' + date + '.json'

    this.http.put(url, workout).subscribe(response => { console.log(response) } )
  }

  fetchWorkout() {
    const date = new Date().toDateString()
    const url = 'https://strengthpractice-7e443.firebaseio.com/' + date + '.json'
    this.http.get(url).subscribe(workout => {console.log(workout)})
  }

  
}

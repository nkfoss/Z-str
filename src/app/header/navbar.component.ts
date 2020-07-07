import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { WorkoutService } from "../workout.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})

// =====================================================


export class NavbarComponent implements OnInit, OnDestroy {

	isAuthenticated = false;
	isNavbarCollapsed = true;
	logStatus = true;
	logStatusChanged = false;

	private userSub: Subscription

	// =====================================================

	constructor(private workoutService: WorkoutService,
		private router: Router,
		private authService: AuthService) { }

	ngOnInit() {
		this.userSub = this.authService.userSubject.subscribe(
			user => {
				this.isAuthenticated = !!user 
				// This makes it so if we get a null user, we will assign 'false'
		})
		
	}

	ngOnDestroy() { this.userSub.unsubscribe() }

	// =====================================================

	onLogout() {
		this.authService.logout()
	}

	onNavigateHome() {
		this.router.navigate(['home'])
	}

	onSaveData() {
		this.workoutService.storeWorkout();
	}

	onFetchData() {
		const date = new Date().toDateString();
		this.workoutService.fetchWorkout(date);
	}

	onPatchMaxes() {
		this.workoutService.patchMaxes()
	}

	onNavigateToToday() {
		const today = this.stripWeekday(
			new Date().toDateString()
		)
		const toNavigate = 'workout/' + today;
		this.router.navigate([toNavigate])
	}

	stripWeekday(dateString: string) {
		const regex = /^.{4}/gi
		return dateString.replace(regex, '')
	}

}



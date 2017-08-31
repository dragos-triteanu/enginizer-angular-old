import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { CasesService } from './services/cases.service';
import { Case } from '../../shared/models/case.model';

declare var jQuery: any;

@Component({
  selector: 'enginizer-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class ProtectedComponent implements OnInit, AfterViewChecked {

  cases: Case[];

  shouldDeleteCase = false;

  toBeDeletedCase: Case;

  tabSelected = 'in_progress';

  subscription: Subscription;

  loading = false;

  shouldRenderFab = false;

  constructor(private casesService: CasesService, private authenticationService: AuthenticationService) {
    this.subscription = casesService.activeCaseStatusAsObservable.subscribe(selectedTab => {
      this.tabSelected = selectedTab;
      console.log('This tab is selected:' + selectedTab);
    });
    this.shouldRenderFab = !(authenticationService.isUserWithRole('ADMIN') || authenticationService.isUserWithRole('DOCTOR'));
  }

  ngOnInit() {

    this.loading = true;
    this.cases = [];
    this.casesService.getAllCases().subscribe(
      (data) => {
        this.cases = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openCreateCaseModal() {
    jQuery('#createCaseModal').modal('open', {
      height: 300,
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
  }

  ngAfterViewChecked() {
    jQuery('.modal').modal();
  }

  addNewCaseToList(event) {
    this.cases.push(event);
  }

  deleteCase(event) {
    this.toBeDeletedCase = event;
    this.shouldDeleteCase = jQuery('#deleteCaseModal').modal('open', {
      height: 300,
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
    console.log(this.toBeDeletedCase);
  }

  performCaseDelete(shouldDeleteCase) {
    if (shouldDeleteCase) {
      this.casesService.deleteCase(this.toBeDeletedCase).subscribe(
        (data) => {
          const THIS = this;
          this.cases.forEach(function (item, index, arr) {
            if (item.id === THIS.toBeDeletedCase.id) {
              arr.splice(index, 1);
            }
          });
        }, (error) => {
          console.log(error);
        });

      jQuery('#deleteCaseModal').modal('close');
    }
  }

}

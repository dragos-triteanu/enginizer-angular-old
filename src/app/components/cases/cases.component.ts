import {Component, OnInit, AfterViewChecked} from "@angular/core";
import {CasesService} from "../../services/cases.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Case} from "../../models/case";
import {Subscription} from "rxjs";

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

  tabSelected: string = 'in_progress';

  subscription: Subscription;

  loading = false;

  shouldRenderFab = false;

  constructor(private casesService: CasesService, private authenticationService : AuthenticationService) {
    this.subscription = casesService.activeCaseStatusAsObservable.subscribe(selectedTab => {
      this.tabSelected = selectedTab;
      console.log("This tab is selected:" + selectedTab);
    });
    this.shouldRenderFab = !(authenticationService.isUserWithRole("ADMIN") || authenticationService.isUserWithRole("DOCTOR"));
  }

  ngOnInit() {

    var THIS = this;
    this.loading=true;
    this.cases =[]
    this.casesService.getAllCases()
                .then(function (data) {
                      THIS.cases= data.slice();
                      THIS.loading = false;
                      }).catch(function (error) {
                  console.log(error);
                  });
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
    var THIS = this;
    if (shouldDeleteCase) {
      THIS.casesService.deleteCase(this.toBeDeletedCase).then(function() {
        THIS.cases.forEach(function (item, index, arr) {
          if (item.id === THIS.toBeDeletedCase.id) {
            arr.splice(index, 1);
          }
        })
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      THIS.toBeDeletedCase = null;
    }

    jQuery('#deleteCaseModal').modal('close');
  }

  isTabSelected(someCase){
    return someCase.status === this.tabSelected;
  }

  handleSelection(event) {
    this.tabSelected = event;
  }
}

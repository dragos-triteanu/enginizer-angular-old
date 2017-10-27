import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { CasesService } from './services/cases.service';
import { CardModel } from '../../shared/models/case.model';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery: any;

@Component({
  selector: 'ngnizr-cases',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewChecked {

  cards: CardModel[] = [];

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
    this.cards = [];
    this.casesService.getAllCases().subscribe(
      (data) => {
        this.cards = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  ngAfterViewChecked() {
    jQuery('.modal').modal();
  }


}

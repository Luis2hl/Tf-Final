import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationComponent } from './registration/registration.component';
import { PlansComponent } from './components/plans/plans.component';
import { CommunityComponent } from './components/community/community.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'about', component: AboutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'services', component: ServicesComponent },
  //{ path: 'service-detail', component: ServiceDetailsComponent },
  //{ path: 'portfolio', component: PortfolioComponent },
  //{ path: 'portfolio-detail', component: PortfolioDetailsComponent },
  //{ path: 'team', component: TeamComponent },
  //{ path: 'blog', component: BlogComponent },
  //{ path: 'blog-detail', component: BlogDetailComponent },
  //{ path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { NewsComponent } from './pages/news/news.component';
import { CategoryComponent } from './pages/category/category.component';
import { PageComponent } from './pages/page/page.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SlidesComponent } from './pages/slides/slides.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { EventoComponent } from './pages/evento/evento.component';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UserComponent },
      { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
      { path: 'categorias', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'paginas', component: PageComponent, canActivate: [AuthGuard] },
      { path: 'funcionarios', component: EmployeesComponent, canActivate: [AuthGuard] },
      { path: 'slides', component: SlidesComponent, canActivate: [AuthGuard] },
      { path: 'cardapios', component: CardapioComponent, canActivate: [AuthGuard] },
      { path: 'eventos', component: EventoComponent, canActivate: [AuthGuard] },
      { path: 'documentos', component: MenuManagerComponent, canActivate: [AuthGuard] },
      { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

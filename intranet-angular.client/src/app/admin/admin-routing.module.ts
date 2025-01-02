import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UserComponent } from './pages/user/user.component';
import { NewsComponent } from './pages/news/news.component';
import { CategoryComponent } from './pages/category/category.component';
import { PageComponent } from './pages/page/page.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SlidesComponent } from './pages/slides/slides.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { EventoComponent } from './pages/evento/evento.component';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'usuarios', component: UserComponent },
      { path: 'news', component: NewsComponent },
      { path: 'categorias', component: CategoryComponent },
      { path: 'paginas', component: PageComponent },
      { path: 'funcionarios', component: EmployeesComponent },
      { path: 'slides', component: SlidesComponent },
      { path: 'cardapios', component: CardapioComponent },
      { path: 'eventos', component: EventoComponent },
      { path: 'documentos', component: MenuManagerComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

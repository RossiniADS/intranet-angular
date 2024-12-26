import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ElementComponent } from './pages/element/element.component';
import { NoticiaDetailsComponent } from './pages/noticia-details/noticia-details.component';
import { AniversariantesComponent } from './pages/aniversariantes/aniversariantes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'element', component: ElementComponent },
  { path: 'aniversariantes', component: AniversariantesComponent },
  { path: 'noticia/:id', component: NoticiaDetailsComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

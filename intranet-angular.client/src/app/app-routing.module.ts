import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CategoryComponent } from './pages/category/category.component';
import { NoticiaDetailsComponent } from './pages/noticia-details/noticia-details.component';
import { AniversariantesComponent } from './pages/aniversariantes/aniversariantes.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { DocumentsManagerComponent } from './pages/documents-manager/documents-manager.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'aniversariantes', component: AniversariantesComponent },
  { path: 'documentos', component: DocumentsManagerComponent },
  { path: 'noticia/:id', component: NoticiaDetailsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

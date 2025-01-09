import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './pages/news/news.component';
import { QuillModule } from 'ngx-quill';
import { CategoryComponent } from './pages/category/category.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageComponent } from './pages/page/page.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SlidesComponent } from './pages/slides/slides.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { EventoComponent } from './pages/evento/evento.component';
import { DiaSemanaPipe } from '../pipes/dia-semana.pipe';
import { TipoMidiaPipe } from '../pipes/tipo-midia.pipe';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    DashboardComponent,
    UserComponent,
    NewsComponent,
    CategoryComponent,
    PageComponent,
    EmployeesComponent,
    SlidesComponent,
    CardapioComponent,
    DiaSemanaPipe,
    EventoComponent,
    MenuManagerComponent,
    FeedbackComponent,
    TipoMidiaPipe,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    NgSelectModule
  ]
})
export class AdminModule { }

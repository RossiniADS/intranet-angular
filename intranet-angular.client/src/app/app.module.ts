import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloaderComponent } from './layout/preloader/preloader.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './pages/category/category.component';
import { NoticiaDetailsComponent } from './pages/noticia-details/noticia-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { ElementComponent } from './pages/element/element.component';
import { FormsModule } from '@angular/forms';
import { BackToTopComponent } from './layout/back-to-top/back-to-top.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AniversariantesComponent } from './pages/aniversariantes/aniversariantes.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { DocumentsManagerComponent } from './pages/documents-manager/documents-manager.component';
import { PdfViewerComponent } from './layout/pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CategoryComponent,
    NoticiaDetailsComponent,
    ContactComponent,
    NoticiasComponent,
    BlogDetailsComponent,
    ElementComponent,
    BackToTopComponent,
    AniversariantesComponent,
    EventosComponent,
    CardapioComponent,
    DocumentsManagerComponent,
    PdfViewerComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [
    DatePipe,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

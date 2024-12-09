import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: false,
  
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  aboutArea = {
    title: "Whats New",
    tabs: [
      { id: "nav-home", label: "Lifestyle", active: true },
      { id: "nav-profile", label: "Travel", active: false },
      { id: "nav-contact", label: "Fashion", active: false },
      { id: "nav-last", label: "Sports", active: false },
      { id: "nav-Sports", label: "Technology", active: false },
    ],
    articles: [
      {
        id: 1,
        imageSrc: "assets/img/gallery/whats_news_details1.png",
        title: "Secretart for Economic Airplane that looks like",
        author: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      },
      {
        id: 2,
        imageSrc: "assets/img/gallery/whats_news_details2.png",
        title: "Secretart for Economic Airplane that looks like",
        author: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      },
      {
        id: 3,
        imageSrc: "assets/img/gallery/whats_news_details3.png",
        title: "Secretart for Economic Airplane that looks like",
        author: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      },
      {
        id: 4,
        imageSrc: "assets/img/gallery/whats_news_details4.png",
        title: "Secretart for Economic Airplane that looks like",
        author: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      },
      {
        id: 5,
        imageSrc: "assets/img/gallery/whats_news_details5.png",
        title: "Secretart for Economic Airplane that looks like",
        author: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      },
      {
        id: 6,
        imageSrc: "assets/img/gallery/whats_news_details6.png",
        title: "Secretart for Economic Airplane that looks like",
        auth6r: "Alice Cloe",
        date: "Jun 19, 2020",
        description: "Struggling to sell one multi-million dollar home currently on the market won’t stop actress and singer Jennifer Lopez.",
      }
    ],
    followers: [
      { platform: "Facebook", icon: "assets/img/news/icon-fb.png", count: 8045 },
      { platform: "Twitter", icon: "assets/img/news/icon-tw.png", count: 8045 },
      { platform: "Instagram", icon: "assets/img/news/icon-ins.png", count: 8045 },
      { platform: "YouTube", icon: "assets/img/news/icon-yo.png", count: 8045 },
    ],
    posterImage: "assets/img/news/news_card.jpg",
    pagination: {
      pages: [1, 2, 3],
      activePage: 1,
    },
  };

  changePage(page: number): void {
    if (page >= 1 && page <= this.aboutArea.pagination.pages.length) {
      this.aboutArea.pagination.activePage = page;
      // Adicione qualquer outra lógica necessária, como carregar novos dados.
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../service/noticia.service';

@Component({
  selector: 'app-latest-news',
  standalone: false,

  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent implements OnInit {
  newsId: number = 0;
  aboutContent = {
    heading: '',
    body: '',
    socialLinks: [
      { icon: 'assets/img/news/icon-ins.png', alt: 'Instagram', link: '#' },
      { icon: 'assets/img/news/icon-fb.png', alt: 'Facebook', link: '#' },
      { icon: 'assets/img/news/icon-tw.png', alt: 'Twitter', link: '#' },
      { icon: 'assets/img/news/icon-yo.png', alt: 'YouTube', link: '#' }
    ],
    followers: [
      { icon: 'assets/img/news/icon-fb.png', count: '8,045', label: 'Fans' },
      { icon: 'assets/img/news/icon-tw.png', count: '8,045', label: 'Fans' },
      { icon: 'assets/img/news/icon-ins.png', count: '8,045', label: 'Fans' },
      { icon: 'assets/img/news/icon-yo.png', count: '8,045', label: 'Fans' }
    ],
    newsPoster: 'assets/img/news/news_card.jpg',
    mainImage: '',
  };

  constructor(private route: ActivatedRoute, private noticiaService: NoticiaService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newsId = params['id'];
      if (this.newsId !== 0) {
        this.noticiaService.getNoticia(this.newsId).subscribe((data) => {
          this.aboutContent = {
            heading: data.titulo,
            body: data.conteudo,
            socialLinks: [
              { icon: 'assets/img/news/icon-ins.png', alt: 'Instagram', link: '#' },
              { icon: 'assets/img/news/icon-fb.png', alt: 'Facebook', link: '#' },
              { icon: 'assets/img/news/icon-tw.png', alt: 'Twitter', link: '#' },
              { icon: 'assets/img/news/icon-yo.png', alt: 'YouTube', link: '#' }
            ],
            followers: [
              { icon: 'assets/img/news/icon-fb.png', count: '8,045', label: 'Fans' },
              { icon: 'assets/img/news/icon-tw.png', count: '8,045', label: 'Fans' },
              { icon: 'assets/img/news/icon-ins.png', count: '8,045', label: 'Fans' },
              { icon: 'assets/img/news/icon-yo.png', count: '8,045', label: 'Fans' }
            ],
            newsPoster: 'assets/img/news/news_card.jpg',
            mainImage: `https://localhost:7227/${data.midiaUrl}`,
          }
        })
      }
    });
  }
}

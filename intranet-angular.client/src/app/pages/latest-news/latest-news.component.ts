import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  standalone: false,

  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent {
  aboutContent = {
    heading: 'Here come the moms in space',
    paragraphs: [
      'Moms are like…buttons? Moms are like glue. Moms are like pizza crusts. Moms are the ones who make sure things happen—from birth to school lunch.',
      'Moms are like…buttons? Moms are like glue. Moms are like pizza crusts. Moms are the ones who make sure things happen—from birth to school lunch.',
      `My hero when I was a kid was my mom. Same for everyone I knew. Moms are untouchable. They’re elegant, smart, beautiful, kind…everything we want to be. At 29 years old, my favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top, makes me so proud of how far I’ve come, and so thankful for where I come from.
      The refractor telescope uses a convex lens to focus the light on the eyepiece. The reflector telescope has a concave lens which means it telescope sits on. The mount is the actual tripod and the wedge is the device that lets you attach the telescope to the mount.
      Moms are like…buttons? Moms are like glue. Moms are like pizza crusts. Moms are the ones who make sure things happen—from birth to school lunch.`
    ],
    unorderedListHeading: 'Unordered list style?',
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
    mainImage: 'assets/img/trending/trending_top.jpg',
    formPlaceholders: {
      message: 'Enter Message',
      name: 'Enter your name',
      email: 'Enter email address',
      subject: 'Enter Subject'
    } as Record<'message' | 'name' | 'email' | 'subject', string>, // Define as chaves explicitamente
    inputFields: ['name', 'email'] as Array<'name' | 'email'> // Define a lista de inputs dinamicamente
  };
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutDetails = {
    mission: {
      title: 'Our Mission',
      paragraphs: [
        'Consectetur adipiscing elit, sued do eiusmod tempor ididunt udfgt labore et dolore magna aliqua. Quis ipsum suspendisces gravida. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus.',
        'Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan.'
      ]
    },
    vision: {
      title: 'Our Vision',
      paragraphs: [
        'Consectetur adipiscing elit, sued do eiusmod tempor ididunt udfgt labore et dolore magna aliqua. Quis ipsum suspendisces gravida. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus.',
        'Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan.'
      ]
    }
  };

  supportCompany = {
    background: 'assets/img/gallery/section_bg02.jpg',
    image: 'assets/img/gallery/about.png',
    title: {
      subtitle: 'Our Top Services',
      main: 'Our Best Services'
    },
    content: {
      top: 'Mollit anim laborum duis adseu dolor iuyn voluptcate velit ess cillum dolore egru lofrre dsu quality mollit anim laborumuis au dolor in voluptate velit cillu.',
      bottom: 'Mollit anim laborum.Dvcuis aute serunt iruxvfg dhjkolohr indd re voluptate velit esscillumlore eu quife nrulla parihatur. Excghcepteur sfwsignjnt occa cupidatat non aute iruxvfg dhjinulpadeserunt moll.',
      button: 'More About Us',
      link: 'about.html'
    }
  };

  teamMembers = [
    {
      name: 'Ethan Welch',
      role: 'UX Designer',
      image: 'assets/img/gallery/team2.png'
    },
    {
      name: 'Ethan Welch',
      role: 'UX Designer',
      image: 'assets/img/gallery/team3.png'
    },
    {
      name: 'Ethan Welch',
      role: 'UX Designer',
      image: 'assets/img/gallery/team1.png'
    }
  ];

  bannerImage = 'assets/img/gallery/body_card3.png';

}

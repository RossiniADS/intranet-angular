import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  standalone: false,
  
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  // Dados principais
  blogData = {
    blogArea: {
      sectionClass: 'blog_area single-post-area section-padding',
      containerClass: 'container',
      rowClass: 'row',
    },
    postDetails: {
      mainColumnClass: 'col-lg-8 posts-list',
      post: {
        featureImg: 'assets/img/blog/single_blog_1.png',
        title: 'Second divided from form fish beast made every of seas all gathered us saying he our',
        categories: ['Travel', 'Lifestyle'],
        commentsCount: 3,
        excerpts: [
          'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower',
          'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training.',
        ],
        quote: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training.',
      },
      navigation: {
        likesInfo: 'Lily and 4 people like this',
        socialIcons: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-dribbble', 'fab fa-behance'],
        prevPost: {
          thumb: 'assets/img/post/preview.png',
          title: 'Space The Final Frontier',
        },
        nextPost: {
          thumb: 'assets/img/post/next.png',
          title: 'Telescopes 101',
        },
      },
      author: {
        name: 'Harvard Milan',
        description: "Second divided from form fish beast made. Every of seas all gathered use saying you're, he our dominion twon Second divided from",
        image: 'assets/img/blog/author.png',
      },
      comments: [
        {
          thumb: 'assets/img/comment/comment_1.png',
          text: 'Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser',
          author: 'Emilly Blunt',
          date: 'December 4, 2017 at 3:12 pm',
        },
        {
          thumb: 'assets/img/comment/comment_2.png',
          text: 'Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser',
          author: 'Emilly Blunt',
          date: 'December 4, 2017 at 3:12 pm',
        },
        {
          thumb: 'assets/img/comment/comment_3.png',
          text: 'Multiply sea night grass fourth day sea lesser rule open subdue female fill which them Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser',
          author: 'Emilly Blunt',
          date: 'December 4, 2017 at 3:12 pm',
        },
      ],
      commentForm: {
        fields: [
          { name: 'comment', placeholder: 'Write Comment', type: 'textarea' },
          { name: 'name', placeholder: 'Name', type: 'text' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'website', placeholder: 'Website', type: 'text' },
        ],
        submitButton: 'Send Message',
      },
    },
    sidebar: {
      search: { placeholder: 'Search Keyword', buttonIcon: 'fa-solid fa-magnifying-glass' },
      categories: [
        { name: 'Resaurant food', count: 37 },
        { name: 'Travel news', count: 10 },
        { name: 'Modern technology', count: 3 },
        { name: 'Product', count: 11 },
        { name: 'Inspiration', count: 21 },
        { name: 'Health Care', count: 21 },
      ],
      recentPosts: [
        { title: 'From life was you fish...', date: 'January 12, 2019', image: 'assets/img/post/post_1.png' },
        { title: 'The Amazing Hubble', date: '02 Hours ago', image: 'assets/img/post/post_2.png' },
        { title: 'Astronomy Or Astrology', date: '03 Hours ago', image: 'assets/img/post/post_3.png' },
        { title: 'Asteroids telescope', date: '01 Hours ago', image: 'assets/img/post/post_4.png' },
      ],
      tagClouds: ['project', 'love', 'technology', 'travel', 'restaurant', 'life style', 'design', 'illustration'],
      instagramFeeds: [
        'assets/img/post/post_5.png',
        'assets/img/post/post_6.png',
        'assets/img/post/post_7.png',
        'assets/img/post/post_8.png',
        'assets/img/post/post_9.png',
        'assets/img/post/post_10.png',
      ],
      newsletter: { placeholder: 'Enter email', button: 'Subscribe' },
    },
  };

}

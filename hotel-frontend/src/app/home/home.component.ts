import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any; // déclare jQuery globalement

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  banners = [
    {
      image: 'assets/images/banner-1.png',
      title: 'Spend Your Holiday',
      description: 'Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.'
    },
    {
      image: 'assets/images/banner-2.png',
      title: 'Spend Your Holiday',
      description: 'Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.'
    },
    {
      image: 'assets/images/banner-3.png',
      title: 'Spend Your Holiday',
      description: 'Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true
    });
  }
}

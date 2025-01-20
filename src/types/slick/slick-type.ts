declare module 'react-slick' {
  import * as React from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    arrows?: boolean;
    [key: string]: any; // 기타 설정 가능
  }

  export default class Slider extends React.Component<Settings> {}
}

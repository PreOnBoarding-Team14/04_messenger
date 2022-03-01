import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    bgGrayColor: string;
    subBgColor: string;
    pointColor: string;
    lightGrayColor: string;
    pointRedColor: string;
    pointBlueColor: string;
    borderColor: string;
    modalRed: string;
    rgba10: string;
    rgba20: string;
    rgba50: string;
    rgba80: string;
    font: string;
  }
}

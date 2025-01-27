export interface IconType {
  className?: string; // className을 전달받아 스타일링 가능
  width?: number; // 아이콘의 너비 (옵션)
  height?: number; // 아이콘의 높이 (옵션)
  color?: string; // 동적으로 색상 변경 가능 (옵션)
  onClick?: React.MouseEventHandler<SVGElement>; // onClick 타입 추가

  // 필요에 따라 추가해주세요.
}

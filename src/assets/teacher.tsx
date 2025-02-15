import * as React from "react";
const TeacherSVG = (props: any) => (
  <svg
    width={192}
    height={192}
    viewBox="0 0 192 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <path
      d="M16 16H128C143.088 16 150.624 16 155.312 20.688C160 25.376 160 32.912 160 48V96C160 111.088 160 118.624 155.312 123.312C150.624 128 143.088 128 128 128H72M80 52H128M16 136V104C16 96.456 16 92.688 18.344 90.344C20.688 88 24.456 88 32 88H48M16 136H48M16 136V176M48 88V136M48 88H96M48 136V176"
      stroke="#757575"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 52C48 56.2435 46.3143 60.3131 43.3137 63.3137C40.3131 66.3143 36.2435 68 32 68C27.7565 68 23.6869 66.3143 20.6863 63.3137C17.6857 60.3131 16 56.2435 16 52C16 47.7565 17.6857 43.6869 20.6863 40.6863C23.6869 37.6857 27.7565 36 32 36C36.2435 36 40.3131 37.6857 43.3137 40.6863C46.3143 43.6869 48 47.7565 48 52Z"
      stroke="#757575"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default TeacherSVG;

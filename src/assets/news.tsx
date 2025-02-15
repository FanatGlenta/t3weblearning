const NewsSVG = (props: any) => (
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
      d="M144 120V72C144 49.376 144 38.056 136.968 31.032C129.944 24 118.624 24 96 24H64C41.376 24 30.056 24 23.032 31.032C16 38.056 16 49.376 16 72V120C16 142.624 16 153.944 23.032 160.968C30.056 168 41.376 168 64 168H160M48 64H112M48 96H112M48 128H80"
      stroke="#757575"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M144 64H152C163.312 64 168.968 64 172.48 67.52C176 71.032 176 76.688 176 88V152C176 156.243 174.314 160.313 171.314 163.314C168.313 166.314 164.243 168 160 168C155.757 168 151.687 166.314 148.686 163.314C145.686 160.313 144 156.243 144 152V64Z"
      stroke="#757575"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default NewsSVG;

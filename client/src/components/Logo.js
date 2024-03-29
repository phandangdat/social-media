import { SvgIcon, createSvgIcon } from '@mui/material';

const LogoIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 47.5 47.5"
    id="p"
  >
    <defs>
      <clipPath id="a">
        <path d="M0 38h38V0H0v38Z"></path>
      </clipPath>
    </defs>
    <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
      <path
        fill="#3b88c3"
        d="M37 5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V5Z"
      ></path>
      <path
        fill="#fff"
        d="M16.428 19.41h3.162c1.954 0 3.194 1.426 3.194 3.287 0 1.86-1.24 3.286-3.194 3.286h-3.162V19.41Zm-4.651 8.248c0 1.457.868 2.418 2.419 2.418h5.487c4.559 0 7.938-2.977 7.938-7.41 0-4.527-3.504-7.349-7.752-7.349h-3.441v-5.085c0-1.551-.992-2.418-2.326-2.418-1.333 0-2.325.867-2.325 2.418v17.426z"
      ></path>
    </g>
  </svg>,
  'Home',
);

const Logo = (props) => {
  return <SvgIcon component={LogoIcon} {...props}></SvgIcon>;
};

export default Logo;

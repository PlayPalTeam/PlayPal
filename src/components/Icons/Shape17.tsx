interface Shape17Props {
  angle: number;
  width: string;
  height: string;
  startColor: string;
  endColor: string;
}

export function Shape17(params: Shape17Props) {
  return (
    <svg
      width={params.width}
      height={params.height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_133_21)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M99.9759 100C44.7585 99.987 -2.80187e-06 55.2204 -7.62939e-06 1.74846e-05L200 0C200 55.2204 155.242 99.987 100.024 100C155.242 100.013 200 144.78 200 200H1.11288e-06C1.11288e-06 144.78 44.7585 100.013 99.9759 100Z"
          fill="url(#paint0_linear_133_21)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_133_21"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(${params.angle})`}
        >
          <stop offset="0.0509862" stopColor={params.startColor} />{' '}
          <stop offset="1" stopColor={params.endColor} />{' '}
        </linearGradient>{' '}
        <clipPath id="clip0_133_21">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

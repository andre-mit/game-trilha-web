export default function Tabuleiro() {
  return (
    <svg
      width={500}
      height={500}
      fill="white"
      stroke="white"
      viewBox="-15 -15 375 375"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g name="t0">
          <circle cx="100" cy="100" r="10" />
          <circle cx="150" cy="100" r="10" />
          <circle cx="200" cy="100" r="10" />

          <circle cx="100" cy="150" r="10" />
          <circle cx="200" cy="150" r="10" />

          <circle cx="100" cy="200" r="10" />
          <circle cx="150" cy="200" r="10" />
          <circle cx="200" cy="200" r="10" />

          <line x1="100" y1="100" x2="200" y2="100" stroke-width="5" />
          <line x1="100" y1="200" x2="200" y2="200" stroke-width="5" />

          <line x1="100" y1="100" x2="100" y2="200" stroke-width="5" />
          <line x1="200" y1="100" x2="200" y2="200" stroke-width="5" />
        </g>

        <g name="t1">
          <circle cx="50" cy="50" r="10" />
          <circle cx="150" cy="50" r="10" />
          <circle cx="250" cy="50" r="10" />

          <circle cx="50" cy="150" r="10" />
          <circle cx="250" cy="150" r="10" />

          <circle cx="50" cy="250" r="10" />
          <circle cx="150" cy="250" r="10" />
          <circle cx="250" cy="250" r="10" />

          <line x1="50" y1="50" x2="250" y2="50" stroke-width="5" />
          <line x1="50" y1="250" x2="250" y2="250" stroke-width="5" />

          <line x1="50" y1="50" x2="50" y2="250" stroke-width="5" />
          <line x1="250" y1="50" x2="250" y2="250" stroke-width="5" />
        </g>

        <g name="t2">
          <circle cx="0" cy="0" r="10" />
          <circle cx="150" cy="0" r="10" />
          <circle cx="300" cy="00" r="10" />

          <circle cx="0" cy="150" r="10" />
          <circle cx="300" cy="150" r="10" />

          <circle cx="0" cy="300" r="10" />
          <circle cx="150" cy="300" r="10" />
          <circle cx="300" cy="300" r="10" />

          <line x1="0" y1="0" x2="300" y2="0" stroke-width="5" />
          <line x1="0" y1="300" x2="300" y2="300" stroke-width="5" />

          <line x1="0" y1="0" x2="0" y2="300" stroke-width="5" />
          <line x1="300" y1="0" x2="300" y2="300" stroke-width="5" />
        </g>
        <g name="ligacoes">
          <line x1="150" y1="0" x2="150" y2="100" stroke-width="5" />
          <line x1="150" y1="200" x2="150" y2="300" stroke-width="5" />

          <line x1="0" y1="150" x2="100" y2="150" stroke-width="5" />
          <line x1="200" y1="150" x2="300" y2="150" stroke-width="5" />
        </g>
      </g>
    </svg>
  );
}

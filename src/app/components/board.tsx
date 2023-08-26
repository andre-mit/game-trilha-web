export default function Board({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <svg
      width={500}
      height={500}
      className="fill-slate-500 stroke-gray-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
      viewBox="-15 -15 330 330"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g name="board">
        <g name="ligacoes">
          <line x1="150" y1="0" x2="150" y2="100" strokeWidth="5" />
          <line x1="150" y1="200" x2="150" y2="300" strokeWidth="5" />

          <line x1="0" y1="150" x2="100" y2="150" strokeWidth="5" />
          <line x1="200" y1="150" x2="300" y2="150" strokeWidth="5" />
        </g>

        <g name="t0">
          <line x1="0" y1="0" x2="300" y2="0" strokeWidth="5" />
          <line x1="0" y1="300" x2="300" y2="300" strokeWidth="5" />

          <line x1="0" y1="0" x2="0" y2="300" strokeWidth="5" />
          <line x1="300" y1="0" x2="300" y2="300" strokeWidth="5" />

          <circle cx="0" cy="0" r="10" />
          <circle cx="150" cy="0" r="10" />
          <circle cx="300" cy="00" r="10" />

          <circle cx="0" cy="150" r="10" />
          <circle cx="300" cy="150" r="10" />

          <circle cx="0" cy="300" r="10" />
          <circle cx="150" cy="300" r="10" />
          <circle cx="300" cy="300" r="10" />
        </g>

        <g name="t1">
          <line x1="50" y1="50" x2="250" y2="50" strokeWidth="5" />
          <line x1="50" y1="250" x2="250" y2="250" strokeWidth="5" />

          <line x1="50" y1="50" x2="50" y2="250" strokeWidth="5" />
          <line x1="250" y1="50" x2="250" y2="250" strokeWidth="5" />

          <circle cx="50" cy="50" r="10" />
          <circle cx="150" cy="50" r="10" />
          <circle cx="250" cy="50" r="10" />

          <circle cx="50" cy="150" r="10" />
          <circle cx="250" cy="150" r="10" />

          <circle cx="50" cy="250" r="10" />
          <circle cx="150" cy="250" r="10" />
          <circle cx="250" cy="250" r="10" />
        </g>

        <g name="t2">
          <line x1="100" y1="100" x2="200" y2="100" strokeWidth="5" />
          <line x1="100" y1="200" x2="200" y2="200" strokeWidth="5" />

          <line x1="100" y1="100" x2="100" y2="200" strokeWidth="5" />
          <line x1="200" y1="100" x2="200" y2="200" strokeWidth="5" />

          <circle cx="100" cy="100" r="10" />
          <circle cx="150" cy="100" r="10" />
          <circle cx="200" cy="100" r="10" />

          <circle cx="100" cy="150" r="10" />
          <circle cx="200" cy="150" r="10" />

          <circle cx="100" cy="200" r="10" />
          <circle cx="150" cy="200" r="10" />
          <circle cx="200" cy="200" r="10" />
        </g>
      </g>
      <g>{children}</g>
    </svg>
  );
}

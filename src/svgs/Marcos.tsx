import Svg, { SvgProps, Defs, ClipPath, Path, G } from "react-native-svg";

const MarcoSvg = (props: SvgProps) => (
  <Svg {...props} viewBox="0 0 1794 1795">
    <Defs>
      <ClipPath id="a">
        <Path d="M1303 340h1794v1795H1303z" />
      </ClipPath>
    </Defs>
    <G
      fill="none"
      stroke="#08C"
      strokeMiterlimit={8}
      strokeOpacity={0.698}
      strokeWidth={13.75}
      clipPath="url(#a)"
      transform="translate(-1303 -340)"
    >
      <Path d="M1467 1238c0-404.825 328.18-733 733-733s733 328.175 733 733c0 404.82-328.18 733-733 733s-733-328.18-733-733Z" />
      <Path d="M1601 1238c0-330.819 268.18-599 599-599s599 268.181 599 599c0 330.82-268.18 599-599 599s-599-268.18-599-599ZM1860.24 437.182c211.3-89.69 449.46-92.274 662.59-7.191M1860.236 2038.028c211.3 89.69 449.462 92.275 662.59 7.189M3000.428 1577.364c89.69-211.3 92.275-449.462 7.189-662.59M1399.572 897.633c-89.69 211.299-92.275 449.462-7.189 662.59" />
    </G>
  </Svg>
);

export default MarcoSvg;

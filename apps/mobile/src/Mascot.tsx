import React from "react";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from "react-native-svg";
export function Mascot({ size=220 }: {size?:number}) {
 return <Svg width={size} height={size} viewBox="0 0 320 300" accessibilityLabel="A happy green Gruntle hugging a heart">
 <Defs><LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FFF6D2"/><Stop offset="1" stopColor="#FADCE6"/></LinearGradient></Defs>
 <Rect width="320" height="300" rx="44" fill="url(#bg)"/><Circle cx="160" cy="139" r="107" fill="#FFE8B1"/>
 <Ellipse cx="160" cy="263" rx="111" ry="20" fill="#BDD49B"/>
 <Path d="M65 168C53 109 86 55 147 49c66-8 121 40 121 104 0 61-37 111-106 111-61 0-91-39-97-96Z" fill="#A5C67C" stroke="#284438" strokeWidth="7"/>
 <Path d="M76 135 45 119 63 155M246 129l31-19-12 43" fill="#A5C67C" stroke="#284438" strokeWidth="7" strokeLinejoin="round"/>
 <Path d="M111 138q15 18 29 0m40 0q15 18 29 0" fill="none" stroke="#284438" strokeWidth="7" strokeLinecap="round"/>
 <Path d="M150 162q11 11 22 0" fill="none" stroke="#284438" strokeWidth="5" strokeLinecap="round"/>
 <Ellipse cx="102" cy="162" rx="13" ry="8" fill="#F2A3AA"/><Ellipse cx="219" cy="162" rx="13" ry="8" fill="#F2A3AA"/>
 <Path d="M160 242c-75-49-61-88-29-88 15 0 24 8 29 19 12-27 42-26 53-11 19 25-4 50-53 80Z" fill="#F6B3C2" stroke="#284438" strokeWidth="6"/>
 <Path d="M72 177q10 29 41 29m137-29q-10 29-41 29" fill="none" stroke="#284438" strokeWidth="8" strokeLinecap="round"/>
 </Svg>;
}

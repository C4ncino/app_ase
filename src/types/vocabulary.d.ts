type Word = {
  id: number;
  word: string;
};
type SectionTitle =
  | "Aa"
  | "Bb"
  | "Cc"
  | "Dd"
  | "Ee"
  | "Ff"
  | "Gg"
  | "Hh"
  | "Ii"
  | "Jj"
  | "Kk"
  | "Ll"
  | "Mm"
  | "Nn"
  | "Ññ"
  | "Oo"
  | "Pp"
  | "Qq"
  | "Rr"
  | "Ss"
  | "Tt"
  | "Uu"
  | "Vv"
  | "Ww"
  | "Xx"
  | "Yy"
  | "Zz";

type WordList = {
  title: SectionTitle;
  data: Word[];
};

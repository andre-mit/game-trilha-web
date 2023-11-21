import { Profile } from "@/@types/profile";
import { Board } from "./board";

export type ProfileType = Profile & {
  pieces?: string;
  board?: Board;
};
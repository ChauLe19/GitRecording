import { Tutorial } from "./tutorial";

export class User {
  username!:string;
  token?: string;
  favorites?: Tutorial[];
}

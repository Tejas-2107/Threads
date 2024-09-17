export interface User {
  username: string;
  email: string;
  password: string;
  image: File | null;
  bio: string;
  date?: Date;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface UserProfile {
  user: {
    id: string;
    username: string;
    email: string;
    bio: string;
  };
}

export interface UpdateUser {
  id: string;
  username: string;
  email: string;
  bio: string;
  pathname: string;
}

export interface ThreadData {
  userId: string; 
  content: string;
  communityId: string | null;
  path: string;
}

export interface ThreadCardParams{
  key:string;
  postId:string;
  currUserId:string;
  text:string;
  date:Date;
  imageUrl:string;
  username:string;
  comments:any[]
}
export interface CommentProps{
  currentUserId:string;
  threadId:string;
  imageUrl:string
}
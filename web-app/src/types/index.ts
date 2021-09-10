export type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  surname: string | null;
  username: string | null;
  photos: string[] | null;
  profilePhotos: string[] | null;
  role: string | null;
};

export type Post = {
  author: User;
  text: string;
  type: string;
  createdAt: Date;
  images: string[];
  _id: string;
};

export type Request = {
  _id: string;
  receiver: User;
  sender: User;
};

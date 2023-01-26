import { IconButtonProps } from "@mui/material";

export type NavbarProps = {
    setConnectedUser: React.Dispatch<React.SetStateAction<boolean>>
}

export type PostsProps = {
    post: Post,
    getPosts: (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>, profile: boolean, type: string) => void,
    setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>,
    profile: boolean,
    type: string,
    posts: Post[],
}

export type Post = {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    htmlContent: string,
    _count: {
        postComments: number,
        postLikes: number,
    },
    _liked: boolean,
    postComments: Comment[],
}

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export type Comment = {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    postId: number,
    text: string,
}

export type Friend = {
    id: number,
    fromId: number,
    toId: number,
    status: string,
    from: User[],
    to: User[],
}


export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

export type CommentsProps = {
    comment: Comment,
    connectedUser: string,
    getPosts: (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>, profile: boolean, type: string) => void,
    setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>,
    profile: boolean,
    type: string,
    setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>,
    comments: Comment[],
}

export type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}
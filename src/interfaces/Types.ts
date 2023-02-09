import { IconButtonProps } from "@mui/material";

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
    user: User,
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
    user: User,
}

export type Friend = {
    id: number,
    fromId: number,
    toId: number,
    status: string,
    from: User,
    to: User,
}

export type Conversation = {
    id: number,
    createdAt: string,
    updatedAt: string,
    fromId: number,
    toId: number,
    from: User,
    to: User,
    messages: Message[],
}

export type Message = {
    id: number,
    createdAt: string,
    updatedAt: string,
    conversationId: number,
    userId: number,
    content: string,
    from: User,
}

export type Like = {
    id: number,
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export type NavbarProps = {
    setConnectedUser: React.Dispatch<React.SetStateAction<boolean>>
    connectedUser: boolean,
}

export type PostsProps = {
    post: Post,
    getPosts: (setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>, profile: boolean, type: string) => void,
    setPosts: React.Dispatch<React.SetStateAction<[] | Post[]>>,
    profile: boolean,
    type: string,
    posts: Post[],
}

export type CommentsProps = {
    comment: Comment,
    connectedUser: string,
    setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>,
    comments: Comment[],
}

export type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type FriendsItemsProps = {
    getFriends: (setTotalFriendsList: React.Dispatch<React.SetStateAction<[] | Friend[]>>, setFriendDemands: React.Dispatch<React.SetStateAction<[] | Friend[]>>, setFriendList: React.Dispatch<React.SetStateAction<[] | Friend[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setTotalFriendsList: React.Dispatch<React.SetStateAction<[] | Friend[]>>,
    setFriendDemands: React.Dispatch<React.SetStateAction<[] | Friend[]>>,
    setFriendList: React.Dispatch<React.SetStateAction<[] | Friend[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

type FriendsListAndDemandItemSoloProps = {
    value: Friend,
}

type SearchPeopleItemSoloProps = {
    value: {id: number, firstname: string, lastname: string, email: string},
    setSearchResponse: React.Dispatch<React.SetStateAction<User[]>>
    searchResponse: User[],
}

export type FriendsListAndDemandItemProps = FriendsItemsProps & FriendsListAndDemandItemSoloProps

export type SearchPeopleItemProps = FriendsItemsProps & SearchPeopleItemSoloProps
export interface PublicUser {
    visualName: string;
    avatarUrl: string | undefined;
}

export interface User {
    publicUser: PublicUser;
    authUser: any;
}
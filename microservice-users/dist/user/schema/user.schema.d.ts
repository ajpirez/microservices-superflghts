import * as moongoose from 'mongoose';
export declare const UserSchema: moongoose.Schema<any, moongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    username: string;
    email: string;
    password: string;
}, moongoose.Document<unknown, {}, moongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    username: string;
    email: string;
    password: string;
}>> & Omit<moongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    username: string;
    email: string;
    password: string;
}> & {
    _id: moongoose.Types.ObjectId;
}, never>>;

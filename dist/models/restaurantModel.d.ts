import { Schema, Model } from "mongoose";
interface IAddress {
    building: string;
    coord?: number[];
    street: string;
    zipcode: string;
}
interface IGrade {
    date: Date;
    grade: string;
    score: number;
}
interface IRestaurant {
    _id: Schema.Types.ObjectId;
    address: IAddress;
    borough: string;
    cuisine: string;
    grades: IGrade[];
    name: string;
    restaurant_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const Restaurants: Model<IRestaurant>;
export default Restaurants;
//# sourceMappingURL=restaurantModel.d.ts.map
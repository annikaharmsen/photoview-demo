export type Photo = {
	photo_id: number;
	image_url: string;
	description: string;
	uploaded_at?: Date;
};
export type Photos = Photo[];

export type User = {
	user_id: number;
	name: string;
};
export type Users = User[];

export type Format = {
	format_id: number;
	name: string;
	description?: string;
	price: number;
	stock?: number;
};
export type Formats = Format[];

export type CartItem = {
	cart_item_id: number;
	quantity: number;
	photo: Photo;
	format: Format;
};
export type CartItems = CartItem[];

export type User = {
    userId: number;
    userName: string;
    email: string;
    urlAvatar?: string;
    phoneNumber: string;
    emailConfirm: number;
    role: string;
}

export type Airline = {
    idAirline: number;
    airlineName: string;
    email: string;
    addressAirline: string;
    phoneNumber: string;
}

export type Plane = {
    idPlane: number;
    planeName: string;
    price: number;
    slot: number;
    emptySlot: number;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    idAirline: number;
    idAirlineNavigation: Airline;
}

export type NhaXe = {
    idNhaXe: number;
    nhaXeName: string;
    email: string;
    addressNhaXe: string;
    phoneNumber: string;
}

export type Bus = {
    idBus: number;
    busName: string;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    price: number;
    slot: number;
    emptySlot: number;
    idNhaXeNavigation: NhaXe;
}

export type OrderBus = {
    orderId: number;
    amount: number;
    totalPrice: number;
    buyTime: Date;
    userId: number;
    idBus: number;
    tBusTickets: {
        ticketId: number;
        orderId: number;
        guessName: string;
        guessEmail: string;
        phoneNumber: string;
    }[];
    idBusNavigation: Bus;
}

export type OrderPlane = {
    orderId: number;
    amount: number;
    totalPrice: number;
    buyTime: Date;
    userId: number;
    idPlane: number;
    tPlaneTickets: {
        ticketId: number;
        orderId: number;
        guessName: string;
        guessEmail: string;
        phoneNumber: string;
        dateOfBirth: Date;
        nationality: string;
        passpostNumber: string;
        expiredTime: Date;
    }[];
    idPlaneNavigation: Plane;
}

export type RoomType = {
    roomTypeId: number;
    roomTypeName: string;
    imageUrl: string;
    price: number;
    area: number;
    hotelId: number;
    hotel: Hotel;
}

export type Room = {
    idRoom: number;
    hotelId: number;
    roomTypeId: number;
    roomNumber: number;
    roomType: RoomType;
    hotel: Hotel;
}

export type Hotel = {
    idHotel: number;
    hotelName: string;
    email: string;
    addressHotel: string;
    phoneNumber: number;
    imageUrl: string;
    userId: string;
    roomCount?: number;
    tRooms: Room[];
    roomTypes: RoomType[];
}

export type OrderRoom = {
    billId: number;
    guessName: string;
    guessEmail: string;
    phoneNumber: string;
    amount: number;
    totalPrice: number;
    buyTime: Date;
    startTime: Date;
    endTime: Date;
    userId: number;
    tRooms: Room[];
    hotel: Hotel;
}

export type SearchedHotel = {
    hotel: Hotel;
    emptyRoomCount: number;
}

export type EmptyRoomType = {
    roomType: RoomType;
    emptyRoomCount: number;
}

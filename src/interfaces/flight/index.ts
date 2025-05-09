export interface IAirportInfo {
  airport: string;
  terminal: string;
  time: string;
}

export interface IPrice {
  currency: string;
  total: number;
}

export interface IFlight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: IAirportInfo;
  arrival: IAirportInfo;
  duration: string;
  price: IPrice;
  availableSeats: number;
}

export interface IFlightMetadata {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}

export interface IFlightResponse {
  data: IFlight[];
  metadata: IFlightMetadata;
}

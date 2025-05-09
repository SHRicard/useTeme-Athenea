import { storeTokens } from "@/utils";
import { apiClient } from "../api"


interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departure: {
        airport: string;
        terminal: string;
        time: string;
    };
    arrival: {
        airport: string;
        terminal: string;
        time: string;
    };
    duration: string;
    price: {
        currency: string;
        total: number;
    };
}

interface IFlights {
    data: Flight[];
    metadata: {
        origin: string;
        destination: string;
        departureDate: string;
        returnDate: string;
        passengers: number;
    };
}

export const flightsService = {
    getFlights: async (params: {
        originLocationCode: string;
        destinationLocationCode: string;
        departureDate: string;
        returnDate: string;
        adults?: number;
        max?: number;
    }): Promise<IFlights> => {
        const response = await apiClient.get('/flights', { params });
        return {
            data: response.data,
            metadata: {
                origin: params.originLocationCode,
                destination: params.destinationLocationCode,
                departureDate: params.departureDate,
                returnDate: params.returnDate,
                passengers: params.adults || 1,
            },
        };

    },
};
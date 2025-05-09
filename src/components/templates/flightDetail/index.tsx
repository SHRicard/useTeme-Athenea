import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FlightDetailCard } from "@/components/organisms/cards/flightDetail";
import { IFlight } from "@/interfaces/flight";

const flightInfo = {
  data: [
    {
      id: "1",
      airline: "Iberia",
      flightNumber: "IB1234",
      departure: {
        airport: "MAD",
        terminal: "4",
        time: "2024-05-20T08:00:00",
      },
      arrival: {
        airport: "MAD",
        terminal: "4",
        time: "2024-05-20T08:00:00",
      },
      duration: "2h 10m",
      price: {
        currency: "EUR",
        total: 100,
      },
      availableSeats: 9,
    },
  ],
  metadata: {
    origin: "MAD",
    destination: "BCN",
    departureDate: "2024-05-20",
    returnDate: "2024-05-27",
    passengers: 1,
  },
};

export const TemplateFlightDetail = () => {
  const outboundFlight: IFlight = {
    ...flightInfo.data[0],
    departure: {
      ...flightInfo.data[0].departure,
      airport: flightInfo.metadata.origin,
    },
    arrival: {
      ...flightInfo.data[0].arrival,
      airport: flightInfo.metadata.destination,
    },
  };

  const returnFlight: IFlight = {
    ...flightInfo.data[0],
    airline: "Norway Airlines",
    departure: {
      ...flightInfo.data[0].departure,
      airport: flightInfo.metadata.destination,
    },
    arrival: {
      ...flightInfo.data[0].arrival,
      airport: flightInfo.metadata.origin,
    },
  };

  const handleShare = () => {};

  const handleFavorite = () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlightDetailCard
          outboundFlight={outboundFlight}
          returnFlight={returnFlight}
          totalPrice={flightInfo.data[0].price.total}
          currency={flightInfo.data[0].price.currency}
          onShare={handleShare}
          onFavorite={handleFavorite}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 8,
  },
});

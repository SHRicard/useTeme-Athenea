import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LodgingCard } from "@/components/organisms/cards";
import { Pagination, ServiceSwitch } from "@/components/atoms";
import { mockLodgings } from "@/components/organisms/cards/lodging";
import { TemplateFlightDetail } from "../../flightDetail";
import { useFavoritesStore } from "../../../../store";


const mockFlights = Array(8)
  .fill({
    id: "1",
    airline: "Iberia",
    departure: {
      city: "Madrid",
      time: "15:45",
      date: "14/09/24",
    },
    arrival: {
      city: "Oslo",
      time: "03:00",
      date: "15/09/24",
    },
    duration: "12:00 hs",
    passengers: 2,
    price: 1800,
    scales: 2,
  })
  .map((flight, index) => ({
    ...flight,
    id: String(index + 1),
  }));


export const TemplateDashboardUser = () => {
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeService, setActiveService] = useState<"flights" | "lodging">(
    "flights"
  );
  const { addFavorite, removeFavorite, isFavorite, loadFavorites } =
    useFavoritesStore();
  useEffect(() => {
    loadFavorites();
  }, []);

  const getCardWidth = () => {
    if (width >= 1200) return '25%';
    if (width >= 768) return '33.33%';
    return '100%';

  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoriteToggle = (flight: any) => {
    if (isFavorite(flight.id)) {
      removeFavorite(flight.id);
    } else {
      addFavorite(flight);
    }
  };



  //const handleServiceChange = (service: "flights" | "lodging") => {
  // setActiveService(service);
  //   setCurrentPage(1);
  //  };

  //  return (
  //  <ScrollView style={styles.container}>
  //    <View style={styles.cardsContainer}>
  //    {mockFlights.map((flight) => (
  //      <View
  //       key={flight.id}
  //       style={[
  //         styles.cardWrapper,
  //       { width: getCardWidth() }
  //    ]}
  //   >
  //      <TransportCard
  //        flightInfo={flight}
  //         isFavorite={isFavorite(flight.id)}
  //      onAddToFavorites={() => handleFavoriteToggle(flight)}
  //      onAddToCart={() => console.log('Añadido al carrito')}
  //    />
  //   </View>
  //    ))}
  //  </View>


  const handleServiceChange = (service: 'flights' | 'lodging') => {
    setActiveService(service);
    setCurrentPage(1);
  };


  return (
    <View style={styles.container}>
      <ServiceSwitch
        activeService={activeService}
        onServiceChange={handleServiceChange}
      />

      <ScrollView style={styles.scrollContent}>
        <View style={styles.cardsContainer}>
          {activeService === "flights" &&
            mockFlights.map((flight) => (
              <View
                key={flight.id}
                style={[styles.cardWrapper, { width: getCardWidth() }]}
              >
                {/* <TransportCard
                  flightInfo={flight}
                  isFavorite={isFavorite(flight.id)}
                  onAddToFavorites={() => handleFavoriteToggle(flight)}
                  onAddToCart={() => console.log("Añadido al carrito")}
                />*/}
              </View>
            ))}
          {activeService === "lodging" &&
            mockLodgings.map((lodging) => (
              <View
                key={lodging.id}
                style={[styles.cardWrapper, { width: getCardWidth() }]}
              >
                <LodgingCard
                  lodgingInfo={lodging}
                  isFavorite={isFavorite(lodging.id)}
                  onAddToFavorites={() => handleFavoriteToggle(lodging)}
                />
              </View>
            ))}
        </View>

        <Pagination
          currentPage={currentPage}
          totalPages={15}
          onPageChange={handlePageChange}
        />
        <TemplateFlightDetail />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  cardsContainer: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  cardWrapper: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    padding: 20,
  },
});


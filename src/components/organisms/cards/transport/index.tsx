import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Label,
  ButtonIcon,
  ThreeColumns,
  FontAwesomeIcon,
} from "@/components/atoms";

export interface Flight {
  id: string;
  airline: string;
  departure: {
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  passengers: number;
  price: number;
  scales: number;
}

interface TransportCardProps {
  flightInfo: Flight;
  isFavorite?: boolean;
  onAddToFavorites?: () => void;
  onAddToCart?: () => void;
}

export const TransportCard: React.FC<TransportCardProps> = ({
  flightInfo,
  isFavorite = false,
  onAddToFavorites,
  onAddToCart,
}) => {
  const leftContent = (
    <>
      <Label text="Ida" type="secondary" size={12} color="#666666" />
      <Text style={styles.city}>{flightInfo.departure.city}</Text>
      <Text style={styles.date}>{flightInfo.departure.date}</Text>
      <Text style={styles.time}>{flightInfo.departure.time}</Text>
    </>
  );

  const centerContent = (
    <>
      <Label
        text="Duración"
        type="secondary"
        size={12}
        color="#666666"
        style={styles.durationLabel}
      />
      <Text style={styles.duration}>{flightInfo.duration}</Text>
      <Text style={styles.scales}>Escalas: {flightInfo.scales}</Text>
      <FontAwesomeIcon name="arrow-right" size={20} color="#1B4B66" />
    </>
  );

  const rightContent = (
    <>
      <Label text="Vuelta" type="secondary" size={12} color="#666666" />
      <Text style={styles.city}>{flightInfo.arrival.city}</Text>
      <Text style={styles.date}>{flightInfo.arrival.date}</Text>
      <Text style={styles.time}>{flightInfo.arrival.time}</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.actionIcons}>
        <ButtonIcon
          iconName={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color="#1B4B66"
          onPress={() => onAddToFavorites?.()}
        />
        <ButtonIcon
          iconName="cart-outline"
          size={24}
          color="#1B4B66"
          onPress={() => onAddToCart?.()}
        />
      </View>

      <View style={styles.airlinesContainer}>
        <View style={styles.airlineRow}>
          <View style={styles.airlineItem}>
            <FontAwesomeIcon name="plane" size={16} color="#1B4B66" />
            <Label text="Iberia" type="primary" size={14} color="#1B4B66" />
          </View>

          <View style={[styles.airlineItem, styles.airlineItemRight]}>
            <FontAwesomeIcon name="plane" size={16} color="#1B4B66" />
            <Label text="Norway Air" type="primary" size={14} color="#1B4B66" />
          </View>
        </View>
      </View>

      <ThreeColumns
        leftContent={leftContent}
        centerContent={centerContent}
        rightContent={rightContent}
        style={styles.flightInfo}
      />

      <View style={styles.footer}>
        <Text style={styles.price}>${flightInfo.price}</Text>
        <Text style={styles.passengers}>{flightInfo.passengers} Pasajeros</Text>
      </View>
    </View>
  );
};

interface TransportCardGridProps {
  flights: Flight[];
  onAddToFavorites?: (flightId: string) => void;
  onAddToCart?: (flightId: string) => void;
}

export const TransportCardGrid: React.FC<TransportCardGridProps> = ({
  flights,
  onAddToFavorites,
  onAddToCart,
}) => {
  return (
    <View style={styles.gridContainer}>
      {flights.map((flight) => (
        <TransportCard
          key={flight.id}
          flightInfo={flight}
          onAddToFavorites={() => onAddToFavorites?.(flight.id)}
          onAddToCart={() => onAddToCart?.(flight.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginBottom: 16,
  },
  airlinesContainer: {
    marginBottom: 20,
  },
  airlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  airlineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  airlineItemRight: {
    justifyContent: "flex-end",
  },
  flightInfo: {
    marginBottom: 20,
  },
  city: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4B66",
    marginVertical: 4,
  },
  time: {
    fontSize: 14,
    color: "#666666",
  },
  date: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 2,
  },
  durationLabel: {
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1B4B66",
    marginVertical: 4,
  },
  scales: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4CAF50",
    letterSpacing: 0.5,
  },
  passengers: {
    fontSize: 14,
    color: "#666666",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
    gap: 16,
  },
});

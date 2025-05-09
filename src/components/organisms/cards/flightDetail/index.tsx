import React from "react";
import { IFlight } from "@/interfaces/flight";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks";

interface FlightDetailCardProps {
  outboundFlight: IFlight;
  returnFlight: IFlight;
  totalPrice: number;
  currency: string;
  onShare?: () => void;
  onFavorite?: () => void;
}

export const FlightDetailCard: React.FC<FlightDetailCardProps> = ({
  outboundFlight,
  returnFlight,
  totalPrice,
  currency,
  onShare,
  onFavorite,
}) => {
  const theme = useAppTheme();

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yy");
  };

  const FlightInfo = ({
    flight,
    type,
  }: {
    flight: IFlight;
    type: "Ida" | "Vuelta";
  }) => (
    <View style={styles.flightSection}>
      <Text style={styles.flightType}>{type}</Text>
      <View style={styles.airlineInfo}>
        <MaterialCommunityIcons name="airplane" size={20} color="#666" />
        <Text style={styles.airlineName}>{flight.airline}</Text>
      </View>
      <Text style={styles.duration}>Duración total: {flight.duration}</Text>

      <View style={styles.routeContainer}>
        <View style={styles.locationInfo}>
          <Text style={styles.city}>{flight.departure.airport}</Text>
          <Text style={styles.time}>{formatTime(flight.departure.time)}</Text>
          <Text style={styles.date}>{formatDate(flight.departure.time)}</Text>
        </View>

        <View style={styles.arrowContainer}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#666" />
        </View>

        <View style={styles.locationInfo}>
          <Text style={[styles.city, styles.textEnd]}>
            {flight.arrival.airport}
          </Text>
          <Text style={[styles.time, styles.textEnd]}>
            {formatTime(flight.arrival.time)}
          </Text>
          <Text style={[styles.date, styles.textEnd]}>
            {formatDate(flight.arrival.time)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio por pasajero</Text>
          <Text style={styles.price}>
            {currency} {totalPrice}
          </Text>
        </View>
        <View style={styles.actions}>
          <IconButton icon="share-variant" size={20} onPress={onShare} />
          <IconButton icon="heart-outline" size={20} onPress={onFavorite} />
        </View>
      </View>

      <FlightInfo flight={outboundFlight} type="Ida" />
      <FlightInfo flight={returnFlight} type="Vuelta" />

      <View style={styles.footer}>
        <Text style={styles.includedLabel}>Equipaje incluido</Text>
        <View style={styles.luggageIcons}>
          <MaterialCommunityIcons
            name="bag-personal"
            size={24}
            color={theme.colors.textOnSecondary}
          />
          <MaterialCommunityIcons name="bag-carry-on" size={24} color="#666" />
          <MaterialCommunityIcons name="bag-checked" size={24} color="#666" />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
  },
  flightSection: {
    marginBottom: 24,
  },
  flightType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  airlineName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  routeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
  },
  city: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  arrowContainer: {
    paddingHorizontal: 16,
  },
  footer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  includedLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  luggageIcons: {
    flexDirection: "row",
    gap: 16,
  },
  textEnd: {
    textAlign: "right",
  },
});

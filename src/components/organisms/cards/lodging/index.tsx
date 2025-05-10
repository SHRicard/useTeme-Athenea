import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Label } from "@/components/atoms/labels";
import { Footer } from "@/components/atoms/footer";
import { ButtonIcon } from "@/components/atoms/btn/btnIcons";
import { FontAwesomeIcon } from "@/components/atoms/icons";
import { useAppTheme } from "@/hooks";


export interface Lodging {
  id: string;
  name: string;
  image: string;
  rating: number;
  type: string;
  price: number;
  distance: string;
}

interface LodgingCardProps {
  lodgingInfo: Lodging;
  isFavorite?: boolean;
  onAddToFavorites?: () => void;
}

// Datos de ejemplo

export const mockLodgings: Lodging[] = Array(8)
  .fill({
    id: "1",
    name: "Hotel Rui Plaza España",
    image:
      "https://media.istockphoto.com/id/104731717/es/foto/complejo-tur%C3%ADstico-de-lujo.jpg?s=612x612&w=0&k=20&c=16fmL6gv7E8ZgCCVDClop46wLaxarU4I5G5yxvX9mFw=",
    rating: 8.5,
    type: "Alojamiento",
    price: 25,
    distance: "A 500 m del centro",
  })
  .map((lodging, index) => ({
    ...lodging,
    id: String(index + 1),
  }));


export const LodgingCard: React.FC<LodgingCardProps> = ({
  lodgingInfo,
  isFavorite = false,
  onAddToFavorites,
}) => {
  const theme = useAppTheme();

  const handleMapButtonPress = () => {

  };

  const handleFavoritePress = () => {
    onAddToFavorites?.();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: lodgingInfo.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Label
              text={lodgingInfo.name}
              type="primary"
              size={16}
              color="#1B4B66"
              style={styles.title}
            />
            <View style={styles.ratingContainer}>
              <Label
                text={`${lodgingInfo.type} - ${lodgingInfo.rating}`}
                size={12}
                color="#666666"
              />
              <FontAwesomeIcon
                name="star"
                size={14}
                color="#FFD700"
              />

            </View>
          </View>
          <View>
            <Label
              text={`€ ${lodgingInfo.price}`}
              type="primary"
              size={22}
              color="#4CAF50"
            />
            <Label
              text="Por noche"
              size={10}
              color="#666666"
              style={styles.priceSubtext}
            />
          </View>
        </View>
        <Footer
          style={styles.cardFooter}
          height={40}
          backgroundColor="transparent"
          safeArea={false}
          contentStyle={styles.footerContent}
        >
          <View style={styles.footerContainer}>
            <View style={styles.locationContainer}>
              <FontAwesomeIcon
                name="map-marker"
                size={16}
                color="#666666"
              />
              <Label
                text={lodgingInfo.distance}
                size={12}
                color="#666666"
              />
            </View>
            <View style={styles.actionsContainer}>
              <ButtonIcon
                iconName={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={theme.colors.backgroundColorPrimary}
                onPress={handleFavoritePress}
                style={styles.actionButton}
              />
              <ButtonIcon
                iconName="map"
                size={24}
                color={theme.colors.backgroundColorPrimary}
                onPress={handleMapButtonPress}
                style={styles.actionButton}
              />
            </View>
          </View>
        </Footer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    marginBottom: 2,
  },
  ratingContainer: {

    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  priceSubtext: {
    textAlign: "right",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    textAlign: 'right',
  },
  cardFooter: {
    borderTopWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    height: 40,
    marginTop: 8,
  },
  footerContent: {
    paddingHorizontal: 0,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // locationContainer: {
  //   flexDirection: 'row',
  // alignItems: 'center',
  //   gap: 6,
  // flex: 1,
  // },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});

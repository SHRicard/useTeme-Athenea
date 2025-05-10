import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { TransportCard, LodgingCard } from '@/components/organisms/cards';
import { ServiceSwitch } from '@/components/atoms';
import { useFavoritesStore } from '@/store';
import { Flight } from '@/components/organisms/cards/transport';
import { Lodging } from '@/components/organisms/cards/lodging';

export const TempleFavoritesUser = () => {
    const { width } = useWindowDimensions();
    const { favorites, removeFavorite, activeService, setActiveService } = useFavoritesStore();

    const getCardWidth = () => {
        if (width >= 1200) return '25%';
        if (width >= 768) return '33.33%';
        return '100%';
    };

    const handleServiceChange = (service: 'flights' | 'lodging') => {
        setActiveService(service);
    };

    const flightFavorites = favorites.filter((item): item is Flight => 'airline' in item);
    const lodgingFavorites = favorites.filter((item): item is Lodging =>
        'name' in item &&
        'type' in item &&
        item.type === 'Alojamiento'
    );

    const currentFavorites = activeService === 'flights' ? flightFavorites : lodgingFavorites;
    const emptyMessage = activeService === 'flights'
        ? 'No tienes vuelos favoritos'
        : 'No tienes alojamientos favoritos';

    if (currentFavorites.length === 0) {
        return (
            <View style={styles.container}>
                <ServiceSwitch
                    activeService={activeService}
                    onServiceChange={handleServiceChange}
                />
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{emptyMessage}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ServiceSwitch
                activeService={activeService}
                onServiceChange={handleServiceChange}
            />
            <ScrollView style={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>
                        {activeService === 'flights' ? 'Vuelos Favoritos' : 'Alojamientos Favoritos'}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    {activeService === 'flights' ? (
                        flightFavorites.map((flight) => (
                            <View
                                key={flight.id}
                                style={[
                                    styles.cardWrapper,
                                    { width: getCardWidth() }
                                ]}
                            >
                                <TransportCard
                                    flightInfo={flight}
                                    isFavorite={true}
                                    onAddToFavorites={() => removeFavorite(flight.id)}
                                />
                            </View>
                        ))
                    ) : (
                        lodgingFavorites.map((lodging) => (
                            <View
                                key={lodging.id}
                                style={[
                                    styles.cardWrapper,
                                    { width: getCardWidth() }
                                ]}
                            >
                                <LodgingCard
                                    lodgingInfo={lodging}
                                    isFavorite={true}
                                    onAddToFavorites={() => removeFavorite(lodging.id)}
                                />
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1B4B66',
    },
    cardsContainer: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    cardWrapper: {
        padding: 8,
        flex: 1,
        minWidth: 300,
        maxWidth: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});

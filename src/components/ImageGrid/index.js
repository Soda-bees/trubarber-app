import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView, BackHandler } from 'react-native';
import { sizes } from '../../services';
import Modal from 'react-native-modal';

const ImageGrid = ({ images }) => {
    const scrollViewRef = useRef(null);
    const imageZoomRef = useRef(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openModal = (index) => {
        setSelectedIndex(index);
        setModalVisible(true);
    };

    const renderImage = ({ item, index }) => {
        if (index === 3 && images.length > 3) {
            return (
                <TouchableOpacity style={styles.imageContainer}
                    onPress={() => openModal(index)}
                >
                    <Image source={{ uri: item }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.text}>+{images.length - 3}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        if (index < 4) {
            return (
                <TouchableOpacity onPress={() => openModal(index)}
                    style={{ marginTop: sizes.screenWidth * 0.01, marginLeft: sizes.screenWidth * 0.01 }}>
                    <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
            );
        }

        return null;
    };

    const renderSingleImage = ({ item, index }) => {
        if (index === 0) {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.singleImageContainer}
                    onPress={() => openModal(index)}
                >
                    <Image source={{ uri: item }} style={styles.imageSecond} />
                    {
                        images.length > 1 &&
                        <View style={styles.overlay}>
                            <Text style={styles.text}>+{images.length - 1}</Text>
                        </View>
                    }
                </TouchableOpacity>
            );
        }
        return null;
    };

    useEffect(() => {
        if (modalVisible && scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current.scrollTo({ x: selectedIndex * sizes.screenWidth, animated: false });
            }, 0);
        }
    }, [modalVisible, selectedIndex]);

    return (
        <View style={styles.container}>
            {images.length > 3 ? (
                <FlatList
                    data={images}
                    renderItem={renderImage}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            ) : (
                <FlatList
                    data={images}
                    renderItem={renderSingleImage}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            )}

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.fullImageContainer}
                    >
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={styles.fullImage}
                            />
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: sizes.screenWidth * 0.3,
        height: sizes.screenWidth * 0.3,
        marginTop: sizes.screenWidth * 0.01,
        marginLeft: sizes.screenWidth * 0.01
    },
    image: {
        width: sizes.screenWidth * 0.3,
        height: sizes.screenWidth * 0.3,
        borderRadius: 8,
    },
    modalContainer: {
        // flex: 1,
        width: sizes.screenWidth,
        height: sizes.screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    fullImageContainer: {
        alignItems: 'center',
    },
    fullImage: {
        width: sizes.screenWidth,
        height: sizes.screenHeight * 0.8,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
    imageSecond: {
        width: sizes.screenWidth * 0.65,
        height: sizes.screenHeight * 0.4,
        borderRadius: 8,
    },
    singleImageContainer: {
        position: 'relative',
        margin: 4,
        width: sizes.screenWidth * 0.65,
        height: sizes.screenHeight * 0.4,
        marginBottom: 10,
        borderRadius: 8,
    },
});

export default ImageGrid;



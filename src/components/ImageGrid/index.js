import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView, BackHandler } from 'react-native';
import { sizes } from '../../services';
import Modal from 'react-native-modal';

const ImageGrid = ({ images }) => {
    const scrollViewRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [imageHeights, setImageHeights] = useState([]);
    const [singleImageHeights, setSingleImageHeights] = useState([]);

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
                    style={{ marginTop: sizes.screenWidth * 0.005, marginLeft: sizes.screenWidth * 0.005 }}
                >
                    <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
            );
        }

        return null;
    };

    const renderSingleImage = ({ item, index }) => {
        if (index === 0) {
            const imageDimensions = singleImageHeights[index] || { width: 0, height: 0 }; // Fallback in case dimensions are not available yet
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.singleImageContainer}
                    onPress={() => openModal(index)}
                >
                    <Image
                        source={{ uri: item }}
                        style={{
                            width: sizes.screenWidth*0.65,
                            height: sizes.screenHeight*0.4,
                            borderRadius: 8,
                            // resizeMode: 'contain'
                        }}
                    />
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

    const checkHeight = (imgUri, index) => {
        return new Promise((resolve, reject) => {
            Image.getSize(imgUri, (width, height) => {
                const aspectRatio = height / width;
                const calculatedHeight = sizes.screenWidth * aspectRatio;
                resolve({ index, height: calculatedHeight });
            }, (error) => {
                reject(error);
            });
        });
    };

    const calculateHeights = async () => {
        try {
            const heightsPromises = images.map((image, index) => checkHeight(image, index));
            const heights = await Promise.all(heightsPromises);
            const heightsArray = Array(images.length).fill(0);
            heights.forEach(({ index, height }) => {
                heightsArray[index] = height;
            });
            setImageHeights(heightsArray);
        } catch (error) {
            console.error('Error calculating image heights:', error);
        }
    };

    
    const checkDimensions = (imgUri, index) => {
        return new Promise((resolve, reject) => {
            Image.getSize(imgUri, (width, height) => {
                
                const aspectRatio = width / height;
                
                let calculatedWidth, calculatedHeight;
    
                if (width > sizes.screenWidth*0.64) {
                    calculatedWidth = sizes.screenWidth*0.65;
                    calculatedHeight = calculatedWidth / aspectRatio;
                } else {
                    calculatedWidth = width;
                    calculatedHeight = height;
                }
    
                if (calculatedHeight > sizes.screenHeight) {
                    calculatedHeight = sizes.screenHeight*0.65;
                    calculatedWidth = calculatedHeight * aspectRatio;
                }
    
                
                resolve({ index, width: calculatedWidth, height: calculatedHeight });
            }, (error) => {
                reject(error);
            });
        });
    };
    
    
const calculateDimensions = async () => {
    try {
        const dimensionsPromises = images.map((image, index) => checkDimensions(image, index));
        const dimensions = await Promise.all(dimensionsPromises);
        const dimensionsArray = Array(images.length).fill({ width: 0, height: 0 });
        dimensions.forEach(({ index, width, height }) => {
            dimensionsArray[index] = { width, height };
        });
        setSingleImageHeights(dimensionsArray);
    } catch (error) {
        console.error('Error calculating image dimensions:', error);
    }
};

    useEffect(() => {

        calculateDimensions();
    }, [images]);


    useEffect(() => {
        calculateHeights();
    }, [images]);



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
                                style={{
                                    width: sizes.screenWidth,
                                    height: imageHeights[index] || sizes.screenHeight * 0.4, // Use the height from the state
                                    resizeMode: 'contain',
                                    borderRadius: 8,
                                }}
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
        width: sizes.screenWidth * 0.65,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: sizes.screenWidth * 0.32,
        height: sizes.screenWidth * 0.39,
        marginTop: sizes.screenWidth * 0.005,
        marginLeft: sizes.screenWidth * 0.005
    },
    image: {
        width: sizes.screenWidth * 0.32,
        height: sizes.screenWidth * 0.39,
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
    imgContainer: {
        height: sizes.screenHeight * 0.8,
        width: sizes.screenWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullImage: {
        width: sizes.screenWidth,
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
        resizeMode: 'contain'
    },
    singleImageContainer: {
        position: 'relative',
        // margin: 4,
        // width: sizes.screenWidth * 0.65,
        maxHeight: sizes.screenHeight * 0.4,
        // marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden'
    },
});

export default ImageGrid;



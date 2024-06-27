import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, fontSize, sizes } from '../../services';
import images from '../../services/utilities/images';
import { styles } from '../../screens/SetUpOutlet/style';
import { Image } from 'react-native-svg';

const TimePickerComponent = ({ startTime, setStartTime, endTime, setEndTime , isBold }) => {
    // const [startTime, setStartTime] = useState(new Date());
    // const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onStartTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || startTime;
        setShowStartPicker(false);
        setStartTime(currentDate);
    };

    const onEndTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || endTime;
        setShowEndPicker(false);
        setEndTime(currentDate);
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row', paddingVertical: sizes.screenWidth * 0.02 }}>
                    <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                        <Text style={isBold ? { fontWeight: '800', color: 'black', fontSize: fontSize.medium } : {color: 'black', fontSize: fontSize.medium }}>
                            {`${formatTime(startTime)}`}</Text>
                    </TouchableOpacity>
                    <Text style={{color:colors.black}}> - </Text>
                    <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                        <Text style={isBold ? { fontWeight: '800', color: 'black', fontSize: fontSize.medium } : {color: 'black', fontSize: fontSize.medium }}>
                            {`${formatTime(endTime)}`}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Image
                    source={images.clockIcon}
                    // style={styles.clockIcon}
                    // resizeMode="contain"
                /> */}
            </View>
            {/* <Button onPress={() => setShowStartPicker(true)} title="Select Start Time" /> */}
            {/* <Button onPress={() => setShowEndPicker(true)} title="Select End Time" /> */}

            {/* <Text>{`${formatTime(startTime)} - ${formatTime(endTime)}`}</Text> */}
            {showStartPicker && (
                <DateTimePicker
                    testID="startTimePicker"
                    value={startTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    // themeVariant="dark"
                    // textColor="red"
                    positiveButton={{ label: 'Done' }}
                    negativeButton={{ label: 'Cancel' }}
                    onChange={onStartTimeChange}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    testID="endTimePicker"
                    value={endTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    positiveButton={{ label: 'Done' }}
                    negativeButton={{ label: 'Cancel' }}
                    onChange={onEndTimeChange}
                />
            )}
        </View>
    );
};

export default TimePickerComponent;

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style.js';
import images from '../../services/utilities/images';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import BackArrow from '../../components/BackArrow';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/index.js';
import Button from '../../components/Button/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectbarber } from '../../store/barber/index.js';
import {
  deleteCartItem,
  removeCart,
  selectCart,
  setCart,
  updateCart,
} from '../../store/cart/index.js';
import formatToJSON from '../../services/config/FormatToJson/index.js';
import { ErrorShow } from '../../components/Error/index.js';
import Toast from 'react-native-toast-message';
import { selectPaymentCard } from '../../store/paymentCard/index.js';
import Loader from '../../components/Loader/index.js';
import { selectAuthToken } from '../../store/authToken/index.js';
import {
  bookAppoinment,
  hanleGetBookedAppoinment,
} from '../../services/config/API/index.js';
import { addAppoinment, selectUserData } from '../../store/userData/index.js';
import { socket, socketService } from '../../services/Socket';
import Header from '../../components/Header/index.js';

export default function BookingProcess({ navigation, route }) {
  const dispatch = useDispatch();
  const barbers = useSelector(selectbarber);
  const cart = useSelector(selectCart);
  const paymentCard = useSelector(selectPaymentCard);
  const authToken = useSelector(selectAuthToken);
  const today = moment();

  const [selected, setSelected] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDuration, setTotalDuration] = useState();
  const [barber, setBarber] = useState();
  const [dateData, setDatedata] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [bookedTime, setBookedTime] = useState([]);
  const [dates, setDates] = useState(null)

  const userData = useSelector(selectUserData);

  useEffect(() => {
    const backAction = () => {
      if (loader) {
        ToastAndroid.show('Please wait, loading...', ToastAndroid.SHORT);
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [loader]);

  const findBarber = async () => {
    const barber = await barbers.find(barber => barber._id === cart?.barber);
    setBarber(barber);
    // handleCreateTimeSlot(barber);
    getBookedAppoinment(barber._id);
  };
  const setTotalPrice = () => {
    let totalPrice = 0;
    cart?.services.forEach(service => {
      totalPrice += parseFloat(service.price);
    });
    setTotalAmount(totalPrice);
  };

  const handleSetTotalDuration = () => {
    const services = cart?.services
    const totalTime = services?.reduce((acc, service) => acc + parseInt(service?.time, 10), 0);
    // console.log(typeof totalTime);
    setTotalDuration(totalTime)

    // let calculatedDuration = 0;

    // cart?.services.forEach(service => {
    //   const serviceDuration = parseInt(service.time, 10);
    //   if (!isNaN(serviceDuration)) {
    //     calculatedDuration += serviceDuration;
    //   }
    // });
    // console.log("type of duration==============>", typeof calculatedDuration);

    // setTotalDuration(calculatedDuration)
  };
  // const handleCreateTimeSlot = async barber => {
  //   const time = barber?.time;

  //   if (typeof time === 'string') {
  //     const [startTime, endTime] = time.split(' - ');
  //     console.log(startTime, endTime);

  //     const bookedSlots = ['2:00 PM', '4:00 PM', '8:00 PM'];
  //     const availableTimeSlot = handleCreateTimeSlotSecond(startTime, endTime);
  //     setDatedata(availableTimeSlot);
  //   } else {
  //     console.log('Invalid time format');
  //   }
  // };

  //   const handleCreateTimeSlotSecond = (
  //     startTime,
  //     endTime,
  //     timeToRemove,
  //     formattedDate,
  //     duration
  //   ) => {
  //     console.log("handleCreateTimeSlotSecond 1st" ,duration);

  //     const timeSlots = [];

  //     const convertTo24HourFormat = time => {
  //       let [hour, minutes] = time.split(':');
  //       minutes = minutes.slice(0, 2);
  //       const modifier = time.slice(-2);
  //       hour = parseInt(hour);
  //       minutes = parseInt(minutes);

  //       if (modifier === 'PM' && hour !== 12) {
  //         hour += 12;
  //       }
  //       if (modifier === 'AM' && hour === 12) {
  //         hour = 0;
  //       }
  //       return { hour, minutes };
  //     };

  //     console.log("duration", typeof duration);


  //     let { hour: startHour, minutes: startMinutes } =
  //       convertTo24HourFormat(startTime);
  //     let { hour: endHour, minutes: endMinutes } = convertTo24HourFormat(endTime);

  //     // Adjust the endHour to include the last slot
  //     if (endMinutes > 0) {
  //       endHour += 1;
  //     }

  //     var startTotalMinutes = startHour * 60 + startMinutes;
  //     var endTotalMinutes = endHour * 60 + endMinutes;
  //     endTotalMinutes -= duration;
  //     while (startTotalMinutes < endTotalMinutes) {
  //       const hours = Math.floor(startTotalMinutes / 60) % 24;
  //       const ampm = hours >= 12 ? 'PM' : 'AM';
  //       const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  //       const formattedMinutes = startTotalMinutes % 60;
  //       const formattedTime = `${formattedHour}:${formattedMinutes.toString().padStart(2, '0')} ${ampm}`;

  //       timeSlots.push(formattedTime);

  //       console.log("loop");

  //       // Update start time for the next slot
  //       startTotalMinutes += duration;

  //       // Check if we go past the end time
  //       if (startTotalMinutes >= endTotalMinutes) {
  //         break;
  //       }
  //     }

  //     // while (
  //     //   startHour < endHour ||
  //     //   (startHour === endHour && startMinutes < endMinutes) ||
  //     //   (startHour >= endHour && endHour < 24)
  //     // ) {
  //     //   const hours = startHour % 24;
  //     //   const ampm = hours >= 12 ? 'PM' : 'AM';
  //     //   const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  //     //   const formattedTime = `${formattedHour}:${startMinutes
  //     //     .toString()
  //     //     .padStart(2, '0')} ${ampm}`;
  //     //   timeSlots.push(formattedTime);
  //     //   console.log("handleCreateTimeSlotSecond 3rd");

  //     //   startHour = (startHour + Math.floor((startMinutes + duration) / 60)) % 24;
  //     //   startMinutes = (startMinutes + duration) % 60;

  //     //   if (startHour === endHour && startMinutes === endMinutes) {
  //     //     break;
  //     //   }
  //     // }

  //     console.log("handleCreateTimeSlotSecond 4rd", "handleCreateTimeSlotSecond 4rd" , timeSlots);

  //     let filteredTimeSlots = []; // Copy the original array
  // if (timeToRemove) {

  //     timeSlots.forEach((slot) => {
  //       const slotStartTime = moment(slot, 'h:mm A');
  //       const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
  //       let isConflicting = false;

  //       // Check if any minute in the slot duration falls into any of the removal intervals
  //       for (let time = slotStartTime.clone(); time.isBefore(slotEndTime); time.add(1, 'minute')) {
  //         const currentMinute = time.clone();

  //         // Check each removal range
  //         for (const range of timeToRemove) {
  //           const [removeStartTime, removeEndTime] = range.split(' - ').map(time => moment(time, 'h:mm A'));

  //           // If the current minute falls within the removal range, mark as conflicting
  //           if (currentMinute.isBetween(removeStartTime, removeEndTime, null, '[)')) {
  //             isConflicting = true;
  //             break; // No need to check further if a conflict is found
  //           }
  //         }

  //         if (isConflicting) break; // No need to check further minutes if a conflict is found
  //       }

  //       // Add non-conflicting slots to the filtered list
  //       if (!isConflicting) {
  //         filteredTimeSlots.push(slot);
  //       }
  //     });
  //     return filteredTimeSlots

  //   }

  //     return timeSlots;
  //   };


  // working function

  // const handleCreateTimeSlotSecond = (
  //   startTime,
  //   endTime,
  //   timeToRemove,
  //   duration
  // ) => {
  //   console.log("create time slot =============>", timeToRemove);

  //   const timeSlots = [];

  //   const convertTo24HourFormat = time => {
  //     let [hour, minutes] = time.split(':');
  //     minutes = minutes.slice(0, 2);
  //     const modifier = time.slice(-2);
  //     hour = parseInt(hour);
  //     minutes = parseInt(minutes);

  //     if (modifier === 'PM' && hour !== 12) {
  //       hour += 12;
  //     }
  //     if (modifier === 'AM' && hour === 12) {
  //       hour = 0;
  //     }
  //     return { hour, minutes };
  //   };

  //   const convertToMinutes = (hour, minutes) => hour * 60 + minutes;

  //   let { hour: startHour, minutes: startMinutes } = convertTo24HourFormat(startTime);
  //   let { hour: endHour, minutes: endMinutes } = convertTo24HourFormat(endTime);

  //   // Adjust the endHour to include the last slot
  //   if (endMinutes > 0) {
  //     endHour += 1;
  //   }

  //   let startTotalMinutes = convertToMinutes(startHour, startMinutes);
  //   let endTotalMinutes = convertToMinutes(endHour, endMinutes);
  //   endTotalMinutes -= 10; // Subtract to avoid going past the end time

  //   while (startTotalMinutes < endTotalMinutes) {
  //     const hours = Math.floor(startTotalMinutes / 60) % 24;
  //     const ampm = hours >= 12 ? 'PM' : 'AM';
  //     const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  //     const formattedMinutes = startTotalMinutes % 60;
  //     const formattedTime = `${formattedHour}:${formattedMinutes.toString().padStart(2, '0')} ${ampm}`;

  //     timeSlots.push(formattedTime);

  //     console.log("loop");

  //     // Update start time for the next slot
  //     startTotalMinutes += 10;

  //     // Check if we go past the end time
  //     if (startTotalMinutes >= endTotalMinutes) {
  //       break;
  //     }
  //   }

  //   // Filter out time slots that fall within the removal intervals
  //   let filteredTimeSlots = [];
  //   if (timeToRemove) {
  //     filteredTimeSlots = timeSlots.filter(slot => {
  //       const slotStartTime = moment(slot, 'h:mm A');
  //       const slotEndTime = slotStartTime.clone().add(10, 'minutes');
  //       return !timeToRemove.some(range => {
  //         const [removeStartTime, removeEndTime] = range.split(' - ').map(time => moment(time, 'h:mm A'));
  //         // Check if any minute in the slot duration falls within any of the removal intervals
  //         return slotStartTime.isBefore(removeEndTime) && slotEndTime.isAfter(removeStartTime);
  //       });
  //     });
  //   } else {
  //     filteredTimeSlots = timeSlots;
  //   }

  //   console.log("handleCreateTimeSlotSecond 4rd", "handleCreateTimeSlotSecond 4rd", filteredTimeSlots);

  //   return filteredTimeSlots;
  // };

  const handleCreateTimeSlotSecond = (
    startTime,
    endTime,
    timeToRemove,
    duration
  ) => {
    console.log("create time slot =============>", timeToRemove);

    const timeSlots = [];

    const convertTo24HourFormat = time => {
      let [hour, minutes] = time.split(':');
      minutes = minutes.slice(0, 2);
      const modifier = time.slice(-2);
      hour = parseInt(hour);
      minutes = parseInt(minutes);

      if (modifier === 'PM' && hour !== 12) {
        hour += 12;
      }
      if (modifier === 'AM' && hour === 12) {
        hour = 0;
      }
      return { hour, minutes };
    };

    const convertToMinutes = (hour, minutes) => hour * 60 + minutes;

    let { hour: startHour, minutes: startMinutes } = convertTo24HourFormat(startTime);
    let { hour: endHour, minutes: endMinutes } = convertTo24HourFormat(endTime);

    // Adjust the endHour to include the last slot
    if (endMinutes > 0) {
      endHour += 1;
    }

    let startTotalMinutes = convertToMinutes(startHour, startMinutes);
    let endTotalMinutes = convertToMinutes(endHour, endMinutes);
    endTotalMinutes -= duration; // Subtract to avoid going past the end time

    while (startTotalMinutes < endTotalMinutes) {
      const hours = Math.floor(startTotalMinutes / 60) % 24;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = startTotalMinutes % 60;
      const formattedTime = `${formattedHour}:${formattedMinutes.toString().padStart(2, '0')} ${ampm}`;

      timeSlots.push(formattedTime);

      console.log("loop");

      // Update start time for the next slot
      startTotalMinutes += 10;

      // Check if we go past the end time
      if (startTotalMinutes >= endTotalMinutes) {
        break;
      }
    }

    // Filter out time slots that fall within the removal intervals or cannot accommodate the service duration
    let filteredTimeSlots = [];
    if (timeToRemove) {
      filteredTimeSlots = timeSlots.filter(slot => {
        const slotStartTime = moment(slot, 'h:mm A');
        const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
        return !timeToRemove.some(range => {
          const [removeStartTime, removeEndTime] = range.split(' - ').map(time => moment(time, 'h:mm A'));
          // Check if the slot cannot be accommodated within removal intervals
          return slotStartTime.isBefore(removeEndTime) && slotEndTime.isAfter(removeStartTime);
        });
      }).filter(slot => {
        const slotStartTime = moment(slot, 'h:mm A');
        const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
        // Ensure the slot + duration does not exceed the end time
        return slotEndTime.isBefore(moment(endTime, 'h:mm A').add(1, 'minute'));
      });
    } else {
      filteredTimeSlots = timeSlots.filter(slot => {
        const slotStartTime = moment(slot, 'h:mm A');
        const slotEndTime = slotStartTime.clone().add(duration, 'minutes');
        // Ensure the slot + duration does not exceed the end time
        return slotEndTime.isBefore(moment(endTime, 'h:mm A').add(1, 'minute'));
      });
    }

    console.log("handleCreateTimeSlotSecond 4rd", "handleCreateTimeSlotSecond 4rd", filteredTimeSlots);

    return filteredTimeSlots;
  };

  useEffect(() => {
    findBarber();
    setTotalPrice();
    getNext30Days()
    handleSetTotalDuration()
    console.log("useEffect==>");

  }, [cart]);

  const deleteOptions = item => {
    dispatch(deleteCartItem(item));
  };

  // const checkAndReturnTime = (startTime, formattedDate) => {
  //   const dateTime = moment(
  //     `${formattedDate} ${startTime}`,
  //     'MM-DD-YYYY h:mm A',
  //   );
  //   const currentDateTime = moment();
  //   if (dateTime.isAfter(currentDateTime)) {
  //     return startTime;
  //   } else {
  //     return currentDateTime.format('hh:mm A');
  //   }
  // };

  const checkAndReturnTime = (startTime, formattedDate) => {
    const dateTime = moment(
      `${formattedDate} ${startTime}`,
      'MM-DD-YYYY h:mm A'
    );
    const currentDateTime = moment();

    // Function to round minutes to the nearest 5-minute interval
    const roundToNearest5 = minutes => {
      return Math.ceil(minutes / 5) * 5;
    };

    const adjustedDateTime = dateTime.isAfter(currentDateTime)
      ? dateTime
      : currentDateTime;

    const minutes = adjustedDateTime.minutes();
    const roundedMinutes = roundToNearest5(minutes);

    // Update the adjustedDateTime with rounded minutes
    adjustedDateTime.minutes(roundedMinutes);
    if (roundedMinutes === 60) {
      adjustedDateTime.hours(adjustedDateTime.hours() + 1);
      adjustedDateTime.minutes(0);
    }

    return adjustedDateTime.format('hh:mm A');
  };

  const getDayOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = new Date().getDay();
    return daysOfWeek[currentDay];
  };

  const getNext30Days = () => {
    const daysArray = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = moment().add(i, 'days');
      daysArray.push({
        date: currentDate.format('MM-DD-YYYY'), // Format: MM-DD-YYYY
        day: currentDate.format('ddd'), // Day of the week
      });
    }
    setDates(daysArray)
  };

  const getDayFromDate = (dateString) => {
    const date = moment(dateString, 'MM-DD-YYYY');
    return date.format('DD');
  };

  const getMonthsFromDateArray = (dateArray) => {
    const months = new Set(); // Use a Set to ensure unique month values

    dateArray.forEach(item => {
      const month = moment(item.date, 'MM-DD-YYYY').format('MMM'); // Extract the short month name
      months.add(month); // Add the month to the Set
    });

    return Array.from(months); // Convert the Set to an array and return it
  };

  // const handleDateSelected = (formattedDate, day) => {
  //   const isOff = barber?.offDays?.includes(day)
  //   console.log(formattedDate, day, isOff);

  //   if (isOff) {
  //     ErrorShow('error', 'Oops!', 'closed');
  //     setDatedata(null)
  //   } else {
  //     console.log("1nd==========>");

  //     setSelectedDate(formattedDate);

  //     const bookedTimesForSelectedDate = bookedTime
  //       .filter(booking => booking.date === formattedDate)
  //       .map(booking => booking.time);

  //     console.log("2nd==========>", bookedTimesForSelectedDate);

  //     const [startTime1, endTime] = barber.time.split(' - ');

  //     console.log("timeeeeeeeeeeeeeeeeeeee", endTime);
  //     const startTime = checkAndReturnTime(startTime1, formattedDate);

  //     let [startHour, startMinute, startPeriod] = parseTime(startTime);
  //     let [endHour, endMinute, endPeriod] = parseTime(endTime);

  //     if (startMinute > 0) {
  //       startHour += 1;
  //       if (startHour === 12 && startPeriod === 'AM') {
  //         startPeriod = 'PM';
  //       }
  //     }

  //     if (endMinute > 0) {
  //       endHour += 1;
  //       if (endHour === 12 && endPeriod === 'AM') {
  //         endPeriod = 'PM';
  //       }
  //     }

  //     startHour = startHour > 12 ? startHour - 12 : startHour;
  //     endHour = endHour > 12 ? endHour - 12 : endHour;

  //     const roundedStartTime = formatTime(startHour, startMinute, startPeriod);
  //     const roundedEndTime = formatTime(endHour, endMinute, endPeriod);

  //     console.log("====>", roundedStartTime, roundedEndTime);


  //     const availableTimeSlot = handleCreateTimeSlotSecond(
  //       startTime,
  //       endTime,
  //       bookedTimesForSelectedDate,
  //       totalDuration
  //     );
  //     setDatedata(availableTimeSlot);
  //   }


  // };


  const handleDateSelected = (formattedDate, day) => {
    const isOff = barber?.offDays?.includes(day)
    if (isOff) {
      setDatedata(null)
      setSelected(null)
      setSelectedDate(null)
      return ErrorShow('error', 'Oops!', 'Barber is not available today kindly choose another day');
    } else {
      setSelectedDate(formattedDate);
      const bookedTimesForSelectedDate = bookedTime
        .filter(booking => booking.date === formattedDate).map(booking => booking.time);
      const [startTime1, endTime] = barber.time.split(' - ');
      const startTime = checkAndReturnTime(startTime1, formattedDate);
      const availableTimeSlot = handleCreateTimeSlotSecond(
        startTime,
        endTime,
        bookedTimesForSelectedDate,
        totalDuration
      );
      setDatedata(availableTimeSlot);
    }


    // let [startHour, startMinute, startPeriod] = parseTime(startTime);
    // let [endHour, endMinute, endPeriod] = parseTime(endTime);

    // if (startMinute > 0) {
    //   startHour += 1;
    //   if (startHour === 12 && startPeriod === 'AM') {
    //     startPeriod = 'PM';
    //   }
    // }

    // if (endMinute > 0) {
    //   endHour += 1;
    //   if (endHour === 12 && endPeriod === 'AM') {
    //     endPeriod = 'PM';
    //   }
    // }

    // startHour = startHour > 12 ? startHour - 12 : startHour;
    // endHour = endHour > 12 ? endHour - 12 : endHour;

    // const roundedStartTime = formatTime(startHour, startMinute, startPeriod);
    // const roundedEndTime = formatTime(endHour, endMinute, endPeriod);

    // console.log("====>", roundedStartTime, roundedEndTime);
  };


  const parseTime = timeString => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    return [hour, minute, period];
  };

  const formatTime = (hour, minute, period) => {
    const formattedHour = (hour % 12 === 0 ? 12 : hour % 12)
      .toString()
      .padStart(2, '0');
    const formattedMinute = minute === 0 ? '00' : '00';
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  const getOneHourLater = selected => {
    let selectedTime = moment(selected, 'hh:mm A');
    selectedTime = selectedTime.add(totalDuration, 'minutes');
    return selectedTime.format('hh:mm A');
  };

  const getBookedAppoinment = async id => {
    try {
      const response = await hanleGetBookedAppoinment(authToken, id);
      if (response.status == 200) {
        setBookedTime(response?.data?.appointments);
        console.log("get book appointment", response?.data?.appointments);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const canBook = (array, barberId, date, time) =>
    array.some(
      ({ barber, status, date, time }) =>
        barber._id === barberId &&
        status === 'Pending' &&
        selectedDate === date &&
        selected === time,
    );

  // const handleConfirm = async () => {
  //   // Logging for debugging purposes
  //   // console.log("Can book:", canBook(userData.appoinment, barber._id, selectedDate, selected));
  //   console.log(
  //     'Can book:',
  //     canBook(userData.appoinment, barber._id, selectedDate, selected),
  //   );

  //   // Validate input fields
  //   if (!selectedDate) {
  //     return ErrorShow('error', 'Oops!', 'Please select a date');
  //   }
  //   if (!selected) {
  //     return ErrorShow('error', 'Oops!', 'Please select a time');
  //   }
  //   if (cart?.services?.length === 0) {
  //     return ErrorShow('error', 'Oops!', 'Please select a service');
  //   }
  //   if (!paymentCard) {
  //     return ErrorShow('error', 'Oops!', 'Please enter card info');
  //   }

  //   // Check if booking can proceed
  //   if (!canBook(userData.appoinment, barber._id, selectedDate, selected)) {
  //     const obj = {
  //       ...cart,
  //       date: selectedDate,
  //       time: selected,
  //     };

  //     try {
  //       setLoader(true); // Show loader
  //       const response = await bookAppoinment(obj, authToken);

  //       // Handle response
  //       if (response.status === 200) {
  //         ErrorShow(
  //           'success',
  //           'Congratulations!',
  //           response?.data?.message,
  //           onHide,
  //         );
  //       } else {
  //         ErrorShow('error', 'Oops!', response?.data?.message);
  //       }
  //     } catch (error) {
  //       console.error(error); // Log the error
  //     } finally {
  //       setLoader(false); // Hide loader in both success and error cases
  //     }
  //   } else {
  //     ErrorShow('error', 'Oops!', 'You already have requested appointment for this time slot');
  //     console.log('Cannot book at this time');
  //   }
  // };

  const addMinutesToTime = (timeStr, minutes) => {
    // Parse the time string into a Moment object
    const timeMoment = moment(timeStr, 'h:mm A');

    // Add the duration
    timeMoment.add(minutes, 'minutes');

    // Format the new time
    return timeMoment.format('h:mm A');
  };

  const handleConfirm = async () => {
    console.log(
      canBook(userData.appoinment, barber._id, selectedDate, selected),
    );
    if (canBook(userData.appoinment, barber._id, selectedDate, selected)) {
      return ErrorShow(
        'error',
        'Oops!',
        'You have already scheduled an appointment for this time slot.',
      );
    }
    if (!selectedDate) {
      return ErrorShow('error', 'Oops!', 'Please select date');
    }
    if (!selected) {
      return ErrorShow('error', 'Oops!', 'Please select time');
    }
    if (cart?.services?.length === 0) {
      return ErrorShow('error', 'Oops!', 'Please select service');
    }
    if (!paymentCard) {
      return ErrorShow('error', 'Oops!', 'Please enter card info');
    }
    const endTime = addMinutesToTime(selected, totalDuration);
    console.log("endTime=====>", endTime);

    const obj = {
      ...cart,
      date: selectedDate,
      time: `${selected} - ${endTime}`,
    };
    try {
      setLoader(true);
      const response = await bookAppoinment(obj, authToken);
      console.log(response.status);
      if (response.status == 200) {
        setLoader(false);
        ErrorShow(
          'success',
          'Congratulation!',
          response?.data?.message,
          onHide,
        );
      } else {
        setLoader(false);
        ErrorShow('error', 'Oops!', response?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const onHide = () => {
    navigation.navigate('Appointments');
    setLoader(false);
    dispatch(removeCart());
  };

  const maskCardNumber = cardNumber => {
    // Remove spaces from the card number
    const cardNumberWithoutSpaces = cardNumber.replace(/\s+/g, '');

    // Check if the card number is 16 digits
    if (cardNumberWithoutSpaces.length === 16) {
      // Mask all but the last 4 digits
      const maskedCardNumber =
        '************' + cardNumberWithoutSpaces.slice(-4);

      // Add spaces back to the masked card number
      return maskedCardNumber.replace(/(.{4})/g, '$1 ').trim();
    }

    // If the card number is not 16 digits, return it as is (or handle the error)
    return cardNumber;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title={'Book Appointment'} />
        <ScrollView>
          <View style={styles.topContentcontainer}>
            <View style={styles.rowcontainer}>
              <Text style={styles.datesHeading}>Select Date</Text>
              <Text style={styles.datesHeading}>
                {dates ? getMonthsFromDateArray(dates)?.join('-') : null}
              </Text>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // style={styles.containerCheck}
                contentContainerStyle={{ gap: sizes.screenWidth * 0.02, marginTop: sizes.screenHeight * 0.02 }}
              >
                {/* <CalendarStrip
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 100,
                    borderWidth: 1,
                  }}
                  style={{
                    height: sizes.screenHeight * 0.12,
                    paddingTop: sizes.screenHeight * 0.01,
                  }}
                  dayContainerStyle={{ borderWidth: 1 }}
                  scrollerPaging
                  useNativeDriver
                  scrollable
                  highlightDateNumberStyle={{ color: colors.black }}
                  calendarHeaderStyle={{ color: colors.black }}
                  highlightDateNameStyle={{ color: colors.black }}
                  highlightDateContainerStyle={{
                    backgroundColor: colors.grayBorder,
                    borderColor: colors.black,
                  }}
                  dateNameStyle={{ color: colors.black }}
                  dateNumberStyle={{ color: colors.black }}
                  leftSelector={[]}
                  rightSelector={[]}
                  onDateSelected={handleDateSelected}
                  minDate={today}
                /> */}
                {dates && dates?.map((item, index) => {                  
                  return (
                    <TouchableOpacity key={index} style={item?.date === selectedDate ? styles.datesTouchableSelected : styles.datesTouchable} onPress={() => handleDateSelected(item?.date, item?.day)}>
                      <Text style={styles.datesDay}>{item?.day}</Text>
                      <Text style={styles.datesDate}>{getDayFromDate(item?.date)}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          </View>
          {dateData?.length > 0 && (
            <View style={styles.timeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.timeAlligment}>
                  {dateData?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={
                        item === selected ? styles.selected : styles.notSelected
                      }
                      onPress={() => setSelected(item)}>
                      <Text
                        style={
                          item === selected
                            ? styles.selectedTextcolor
                            : styles.textBlack
                        }>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          <View style={styles.bookContainer}>
            <ScrollView>
              <View style={styles.barberContainer}>
                <View style={styles.barberNameImage}>
                  <View style={styles.imageContainer}>
                    <Image
                      // source={{ uri: barber?.businessProfile }}
                      source={barber?.profile ? { uri: barber?.profile } : barber?.gender === "male" ? images.male : images.female}
                      style={styles.imageContainer}
                    />
                  </View>
                  <View>
                    <Text style={styles.barberName}>{barber?.name}</Text>
                    <Text style={styles.time}>
                      {selected && `${selected} - ${getOneHourLater(selected)}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                {cart &&
                  cart?.services?.map((item, index) => {
                    return (
                      // <View key={index}>
                      <View style={styles.flexRow} key={index}>
                        <View style={styles.flexRow1}>
                          <TouchableOpacity
                            onPress={() => {
                              deleteOptions(item);
                            }}>
                            <Image
                              source={images.crossIcon}
                              style={styles.crossIcon}
                            />
                          </TouchableOpacity>
                          <Text style={styles.disabledText}>{item?.name}</Text>
                          <Text
                            style={
                              styles.disabledText1
                            }>{` (${item?.serviceName})`}</Text>
                          <Text style={
                            styles.disabledText1
                          }>{`  (${item?.time} min)`}</Text>
                        </View>
                        <Text
                          style={
                            styles.disabledText
                          }>{`$ ${item.price}.00`}</Text>
                      </View>
                      // </View>
                    );
                  })}
              </View>
              <View style={styles.total}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.priceBlack}>{`$${parseFloat(
                  totalAmount,
                )?.toFixed(2)}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() =>
                  navigation.navigate('BookAppointment', { item: barber })
                }>
                <Text style={styles.addAnotherservice}>
                  + Add Another Service
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.paymentBorder}>
            <View style={styles.paymentTitle}>
              <Text style={styles.title}>Payments</Text>
            </View>
            <View style={styles.credtDebit}>
              <Text style={styles.creditText}>Credit / Debit Cards</Text>
              <TouchableOpacity
                style={styles.blackPlusbox}
                onPress={() => navigation.navigate('AddCard')}>
                <Image
                  source={images.whiteCross}
                  style={styles.starSize}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {paymentCard && (
              <View style={styles.cardDetailscontainer}>
                <View style={styles.row}>
                  <Image
                    source={images.masterCard}
                    resizeMode="contain"
                    style={styles.masterCard}
                  />
                  <Text style={styles.cardText}>
                    {maskCardNumber(paymentCard?.number)}
                  </Text>
                </View>
                <Image
                  source={images.arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View
          style={
            Platform.OS == 'android' ? styles.btnMargin : styles.btnMarginIOS
          }>
          {loader ? (
            <Loader title={'Book'} />
          ) : (
            <Button title={'Book'} onPress={handleConfirm} />
          )}
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import RangeSlider from "react-native-range-slider-expo";

import Button from "../../components/Button";
import { useStoreActions, useStoreState } from "easy-peasy";
import DateTimePicker from "react-native-ui-datepicker";
import colors from "../../components/colors/colors";
import { ScrollView } from "react-native-gesture-handler";

const FilterModal = ({ isVisible, onClose }) => {
  const [showFilterModal, setFilterModal] = useState(isVisible);
  const [dates, setDates] = useState(null);

  const [ranges, setRanges] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const animacija = useRef(new Animated.Value(0)).current;
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(1000);
  const [value, setValue] = useState(0);
  const filter = useStoreState((state) => state.filter);
  const aktivacija = useStoreActions((actions) => actions.setactiv);
  const range = useStoreState((state) => state.range);
  const obrisifilter = useStoreActions((action) => action.deleteFilter);
  const Section = ({ title }) => {
    return (
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>{title}</Text>
      </View>
    );
  };

  function slideri(ime, max, min) {
    return (
      <View>
        <Section title={ime} manja={min} veca={max}></Section>
        <View style={{ flexDirection: "row-reverse" }}>
          <Text style={{ paddingTop: 0 }}>
            {fromValue}-{toValue}
          </Text>
        </View>
        <RangeSlider
          initialToValue={filter.to}
          initialFromValue={filter.from}
          fromKnobColor={colors.tipkana}
          toKnobColor={colors.tipkana}
          min={min}
          max={max}
          fromValueOnChange={(value) => {
            setFromValue(value);
          }}
          toValueOnChange={(value) => setToValue(value)}
        ></RangeSlider>
      </View>
    );
  }

  const aktiviraj = () => {
    aktivacija({
      to: toValue,
      from: fromValue,
      dateFrom: ranges.startDate,
      dateTo: ranges.endDate,
    });
    setFilterModal(false);
  };
  // {Animacije otvaranje i zatvaranje pretrage}

  useEffect(() => {
    setFromValue(range.from);
    setToValue(range.to);

    if (showFilterModal) {
      Animated.timing(animacija, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animacija, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);
  const obrisi = () => {
    obrisifilter();
    setFilterModal(false);
  };

  useEffect(() => {
    console.log(ranges);
  }, [ranges]);

  const modalY = animacija.interpolate({
    inputRange: [0, 1],
    outputRange: [useWindowDimensions().height, 100],
  });

  const onDateChange = (params) => {
    let newdate = new Date(params.date);
    newdate.setUTCHours(0, 0, 0, 0);
    newdate.setUTCDate(newdate.getUTCDate() + 1);

    // setDates(newdate.setHours(selectedDate.getHours() + 1));
    console.log(newdate);
    setDates(newdate);
  };

  const datum = (param) => {
    console.log(param);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)" }}
        onPress={() => setFilterModal(false)}
      >
        {/* Transparent Bacground  */}

        <TouchableWithoutFeedback onPress={() => setFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            top: modalY,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20,
          }}
        >
          {/* Naslov pretrage section */}

          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                }}
              >
                Filtriraj pretragu
              </Text>
              <Ionicons
                name={"close"}
                size={32}
                color="darkgray"
                onPress={() => setFilterModal(false)}
                style={{
                  borderWidth: 2,
                  borderColor: "lightgray",
                  borderRadius: 10,
                }}
              />
            </View>

            <View style={{ height: 150 }}>
              {/* {Prvi slider za udaljenost} */}
              {slideri("Cijena", range.to, range.from)}
            </View>

            <DateTimePicker
              onChange={(params) =>
                setRanges({
                  startDate: params.startDate,
                  endDate: params.endDate,
                })
              }
              startDate={ranges.startDate}
              endDate={ranges.endDate}
              selectedItemColor={colors.tipkana}
              mode="range"
            />

            <View style={{ paddingTop: 20 }}>
              {filter.aktivan ? (
                <Button
                  color="tipkana"
                  title={"Obriši filter"}
                  onpress={obrisi}
                >
                  {" "}
                </Button>
              ) : (
                <Button
                  color="primary"
                  title={"Potvrdi"}
                  onpress={aktiviraj}
                ></Button>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

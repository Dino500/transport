import React, { Component, useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import AppCard from "../../components//AppCard";
import AppTextimput from "../../components/AppTextimput";
import FilterModal from "./FilterModal";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";

import { action, useStoreActions, useStoreState } from "easy-peasy";

function Lista(props) {
  const [query, setquery] = useState(null);
  const [dataSource, setdataSource] = useState([]);
  const [dataBackup, setdataBackup] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const setfilter = useStoreActions((action) => action.setFilter);

  const filter = useStoreState((state) => state.filter);
  const setRange = useStoreActions((action) => action.setRange);
  const fromto = { to: "", from: "" };
  let dat;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filter.aktivan) {
      console.log(filter);
      setdataSource(
        dataBackup.filter(
          (i) =>
            parseInt(i.price, 10) >= filter.from &&
            parseInt(i.price, 10) <= filter.to
        )
      );
      setdataBackup(dataSource);
      if (filter.dateFrom && filter.dateTo) {
        setdataSource(
          dataBackup.filter(
            (i) =>
              toMillis(i.startDate) >= Date.parse(filter.dateFrom) &&
              toMillis(i.startDate) <= Date.parse(filter.dateTo)
          )
        );
        setdataBackup(dataSource);
      }
    } else {
      fetchData();
    }
  }, [showFilterModal]);

  const fetchData = async () => {
    try {
      const firestore = getFirestore(app);

      const collectionRef = collection(firestore, "objava");

      const snapshot = await getDocs(collectionRef);
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(newData[0].startDate);
      setdataSource(newData);
      setdataBackup(newData);

      fromto.to = Math.max(...newData.map((o) => o.price));

      fromto.from = Math.min(...newData.map((o) => o.price));
      setRange(fromto);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function filterItem(tekstZatraziti) {
    dat = dataBackup;

    setdataSource(
      dataBackup.filter(
        (i) =>
          i.startCity.toLowerCase().includes(tekstZatraziti.toLowerCase()) ||
          i.endCity.toLowerCase().includes(tekstZatraziti.toLowerCase())
      )
    );
    if (tekstZatraziti == "") {
      setdataSource(dataBackup);
    }
  }

  const getDate = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

    const dateObject = new Date(milliseconds);

    function formatDateToDDMMYYYY(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getUTCFullYear();

      return `${day}-${month}-${year}`;
    }

    return formatDateToDDMMYYYY(dateObject);
  };

  const toMillis = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

    return milliseconds;
  };

  return (
    <SafeAreaView style={styles.ime}>
      {/* Filter screeen */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        ></FilterModal>
      )}

      <AppTextimput
        icon="search"
        icon2="filter"
        klik={() => setShowFilterModal(true)}
        placeholder="pretraga"
        style={styles.app}
        onChangeText={(text) => filterItem(text)}
        height1={50}
      ></AppTextimput>

      <FlatList
        data={dataSource}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            startCity={item.startCity}
            endCity={item.endCity}
            startDate={getDate(item.startDate)}
            slika={item.img}
            price={item.price}
            onPress={() => props.navigation.navigate("listing", item)}
          />
        )}
        showsVerticalScrollIndicator="false"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
            tintColor={"cyan"}
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ime: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,

    elevation: 5,

    marginRight: 10,
    marginLeft: 10,
  },
  app: {
    flex: 1,
    height: "100%",
  },
  AppTextimput: {
    paddingRight: "28px",
  },
});
export default Lista;

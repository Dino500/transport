import React, { Component, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { event } from 'react-native-reanimated';
import AppCard from '../../components//AppCard';
import AppTextimput from '../../components/AppTextimput';
import FilterModal from './FilterModal';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native-web';
import db from '../../firebase';

function Lista(props) {
  const [query, setquery] = useState(null);
  const [dataSource, setdataSource] = useState([]);
  const [dataBackup, setdataBackup] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = db.collection('objava');
        const snapshot = await collectionRef.get();
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('newData', newData);
        setdataSource(newData);
        setdataBackup(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function filterItem(tekstZatraziti) {
    let dat = dataBackup;

    setdataSource(
      dataBackup.filter(
        (i) =>
          i.startCity.toLowerCase().includes(tekstZatraziti.toLowerCase()) ||
          i.endCity.toLowerCase().includes(tekstZatraziti.toLowerCase())
      )
    );
    if (tekstZatraziti == '') {
      setdataSource(dataBackup);
    }
  }

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
      ></AppTextimput>

      <FlatList
        data={dataSource}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            startCity={item.startCity}
            endCity={item.endCity}
            startDate={item.startDate}
            slika={item.img}
            price={item.price}
            onPress={() => props.navigation.navigate('listing', item)}
          />
        )}
        showsVerticalScrollIndicator="false"
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ime: {
    flex: 1,
    shadowColor: '#000',
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
    height: '100%',
  },
  AppTextimput: {
    paddingRight: '28px',
  },
});
export default Lista;

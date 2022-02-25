import { View, Text, Animated, ScrollView, TouchableWithoutFeedback, Modal, TouchableOpacity ,useWindowDimensions} from 'react-native';
import React, { useState , useEffect, useRef } from 'react'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';

import colorts from '../../components/colors/colors';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { render } from 'react-dom';



const FilterModal =({isVisible , onClose}) =>  {
const [showFilterModal, setFilterModal] = useState(isVisible)

    const animacija = useRef(new Animated.Value(0)).current
    const [fromValue, setFromValue] = useState(0);
     const [toValue, setToValue] = useState(0);
     const [value, setValue] = useState(0);

    const Section = ({title}) => {
       return( <View

        style={{

            marginTop:20,
            
        }}
        >

        <Text style={{fontSize:20}}>
            {title}
        </Text>
        

        </View>
       )

    }

    function slideri(){

        return(
                <View>
            <Section title={"daljina"} manja={10}   veca={1000}>

            </Section>
            <RangeSlider
            min={10} max={1000} initialFromValue={12}
            fromValueOnChange={value => setFromValue(value)}
            toValueOnChange={value => setToValue(value)}
            ></RangeSlider>

            </View>
        )
    }

useEffect(() => {
  if(showFilterModal){
    Animated.timing(animacija, {
        toValue:1,
        duration:200,
        useNativeDriver:false,
        
    }).start();

  }
  else{
    Animated.timing(animacija, {
        toValue:0,
        duration:200,
        useNativeDriver:false,
        
    }).start(() => onClose());

  }

}, [showFilterModal]);

const modalY = animacija.interpolate({
    inputRange: [0,1],
    outputRange:[useWindowDimensions().height + 640 , useWindowDimensions().height + 70 ]
})



return(


        <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}
        >
            <View
            style={ {flex: 1,
             backgroundColor: 'rgba(52, 52, 52, 0.8)',
             
            }}
            onPress={()=> setFilterModal(false)}
            >
                    
                     
                     
            {/* Transparent Bacground  */}

            <TouchableWithoutFeedback
            onPress={()=> setFilterModal(false)}
            
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0 , 
                    left: 0, 
                    right: 0,
                    
                }}>

                </View>
            </TouchableWithoutFeedback>
            <Animated.View
                
                style={{
                    position:"absolute",
                    top:modalY,
                    bottom:0,
                    left:0,
                    right:0,
                    backgroundColor:"white",
                    borderTopEndRadius:20,
                    borderTopLeftRadius:20,
                    padding:20
                }}
            >
                {/* header section */}


                <View
                style={{
                    flexDirection: 'row', 
                    alignItems: 'center'

                }}
                >
                    <Text style={{
                        flex:1 ,
                        fontSize: 18,
                        
                    }}>Filtriraj pretragu</Text>
                    <Ionicons name={'close'} size={32} color="darkgray" onPress={()=> setFilterModal(false)} style={{borderWidth:2 , borderColor: 'lightgray' , borderRadius:10}} />
                </View>
                <View>

                {slideri()}
                </View>
            </Animated.View>
            </View>
            </Modal>
    )
}

export default FilterModal; 
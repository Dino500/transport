import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../../components/AppText";
import ImageInput from "./ImageInput";
import AppTextimput from "../../components/AppTextimput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from '../../components/Button'

function ImageInputList({ images , onRemoveImage, onAddImage }) {
  const scrollView = useRef();

const [date , setDate ] = useState('09-10-2021')

  return (

  
    <KeyboardAwareScrollView style={{paddingHorizontal: 15}} extraHeight={300}>


      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
        <View style={styles.container}>
          {images.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                images={uri}
                onChangeImage={() => onRemoveImage(uri)}
                />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>


      <AppText style={{paddingTop: 20  }}>Relacija</AppText >
<AppTextimput>

</AppTextimput>
<AppText style={{paddingTop: 10  }}>Cijena</AppText >
<AppTextimput >
  
</AppTextimput>
<AppText style={{paddingTop: 10  }}>Datum Polaska</AppText >
<AppTextimput  >
  
</AppTextimput>


<AppText style={{paddingTop: 10 }}>Detalji objave</AppText >
<AppTextimput style={{height:100  }} >
  
</AppTextimput>

    
    <Button title={"Potvrdi"}>

    </Button>
                  
</KeyboardAwareScrollView>
                    
          
   
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
  
});

export default ImageInputList;
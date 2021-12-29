import React from 'react'
import PropTypes from 'prop-types'
import { concat } from 'react-native-reanimated'
import { useState } from 'react';
import ImageInput from './ImageInput';
import ImageInputList from './ImageInputList';

function imagelista(props) {
    const [images, setImages] = useState([]);
    
    const handleAdd = uri => {
        setImages([...images, uri]);
    }
    const  handleRemove = uri =>{
        setImages(images.filter((image) => image !== uri));
    }
    return (
        
        <ImageInputList  
        images={images} 
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}>

        </ImageInputList>
    )
}

export default imagelista


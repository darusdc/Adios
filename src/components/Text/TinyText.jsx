import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';
import PropTypes from 'prop-types';

const TinyText = (props) => {
    const { textToShow, textCustomStyle } = props;
    return (
        <Text style={[styles.tiny, textCustomStyle]} allowFontScaling={false}>{textToShow}</Text>
    )
};

TinyText.propTypes = {
    textToShow : PropTypes.string,
    textCustomStyle: PropTypes.object 
}

export default TinyText
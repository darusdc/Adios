import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';
import PropTypes from 'prop-types';

const SmallText = (props) => {
    const { textToShow, textCustomStyle } = props;
    return (
        <Text style={[styles.small, textCustomStyle]} allowFontScaling={false}>{textToShow}</Text>
    )
};

SmallText.propTypes = {
    textToShow : PropTypes.string,
    textCustomStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]) 
}

export default SmallText
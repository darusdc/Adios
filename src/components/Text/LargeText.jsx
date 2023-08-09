import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';
import PropTypes from 'prop-types';

// here is LargeText
const LargeText = (props) => {
    const { textToShow, textCustomStyle } = props;
    return (
        <Text style={[styles.large, textCustomStyle]} allowFontScaling={false}>{textToShow}</Text>
    )
};

LargeText.propTypes = {
    textToShow : PropTypes.string,
    textCustomStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default LargeText
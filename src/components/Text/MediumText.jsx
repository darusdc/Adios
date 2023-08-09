import React from 'react';
import { Text } from 'react-native';
import styles from './TextStyles';
import PropTypes from 'prop-types';

// here is MediumText
const MediumText = (props) => {
    const { textToShow, textCustomStyle } = props;
    return (
        <Text style={[styles.medium, textCustomStyle]} allowFontScaling={false}>{textToShow}</Text>
    )
};
MediumText.propTypes = {
    textToShow : PropTypes.string,
    textCustomStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]) 
}

export default MediumText
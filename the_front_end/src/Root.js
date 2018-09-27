import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import MainScreen from './screen/main';
import { IconContext } from 'react-icons';

const Root = ({ store }) => {
    return <Provider store = {store} >
        <IconContext.Provider value = {{color:'grey'}}>
            <MainScreen />
        </IconContext.Provider>
    </Provider>;
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};
export default Root;
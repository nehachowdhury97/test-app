import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components/Header';

export const HomeLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';



const PhoneContact = (props) => {


    return (
        <ListGroupItem>
            <div className='contact-name-surname'>
                <h4>{props.name} {props.surname}</h4>
                <i className="fa fa-phone" aria-hidden="true"></i><h6 className='contact-number'>{props.phoneNumber}</h6>
            </div>
            <Button color="danger" className='remove-contact' onClick={props.removeContact}><i className="fa fa-trash" aria-hidden="true"></i></Button>{' '}
        </ListGroupItem>
    );
};

// Validation of forwarded props to component PhoneContact

PhoneContact.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    removeContact: PropTypes.func.isRequired
};

export default PhoneContact;
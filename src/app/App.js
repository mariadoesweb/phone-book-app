import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Input } from 'reactstrap';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Search from './search_contacts/Search';
import PhoneContactsList from './phone_contacts/PhoneContactsList';
import { dataService } from '../service/dataService';



class App extends Component {
  state= {
    searchContact: "",
    modal: false,
    errorMessage: "",
    addContactName: "",
    addContactSurname: "",
    addContactNumber: "",
    contacts: []
  };



  // Fetch contacts data
  componentDidMount() {
    dataService.allContactsData()
    .then((allData) => {
        this.setState({
          contacts: allData
        })
    });
  };

  // Toggle react modal for button create new contact
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      errorMessage: ""
    });
  }

  // Add new contact to the list

    // Add contact name
    addNewContactName = e => {
      this.setState({ 
        addContactName: e.target.value,
        errorMessage: "" });
    };

    // Add contact surname
    addNewContactSurname = e => {
      this.setState({ 
        addContactSurname: e.target.value,
        errorMessage: "" });
    };

    // Add contact phone number
    addNewContactNumber = e => {
      this.setState({ 
        addContactNumber: e.target.value,
        errorMessage: "" });
    };


  // Handler function for adding new contact on click
  submitNewContact = e => {
    e.preventDefault();
    if(this.state.addContactName === "" || this.state.addContactSurname === "" || this.state.addContactNumber === "") {
      this.setState({
        errorMessage: 'All inputs must be filled!'
      })
    } else {      
      this.state.contacts.push({
        firstName: this.state.addContactName,
        lastName: this.state.addContactSurname,
        number: this.state.addContactNumber,
        id: Math.round(Math.random() * 4000 + 1234)
      });
      this.setState(this.state);

      this.submitAddedContact(this.state.contacts[this.state.contacts.length - 1]);
      this.setState({
        modal: false
      })
    }
  };

  // Send added contact on server
  submitAddedContact = (c) => {
    dataService.sendNewContact(c);
  };

  // Remove contact from the list
  removeContact = (contactId, contactIndex) => {
    dataService.deleteContact(contactId);
    this.setState({
      contacts: [
        ...this.state.contacts.slice(0, contactIndex),
        ...this.state.contacts.slice(contactIndex + 1)
      ]
    });
    console.log(contactId);
  };

  // Search contacts by surname
  updateSearch = e => {
    this.setState({searchContact: e.target.value})
  };



  render() {
    return (
      <Container className='main-container'>
        <Row >
          <Col md={{ size: 8, offset: 2 }} className='header'>
            <Header />
          </Col>
        </Row>

        <Container className='all-contacts'>
          <Row>
            <Col md={{ size: 8, offset: 2 }} className='phone-contact-field'>
                <h3 className='phone-contacts'>Contacts</h3>
                <div>
                  <Button color="primary" onClick={this.toggle}>+ Add Contact</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New contact</ModalHeader>
                    <ModalBody>
                    <Form method='post'>
                        <FormGroup>
                          <Input type="text" className='contact-data' value={this.addContactName} onChange={this.addNewContactName} placeholder="First name" autoComplete="none" />
                          <Input type="text" className='contact-data' value={this.addContactSurname} onChange={this.addNewContactSurname} placeholder="Last name" autoComplete="none" />
                          <Input type="text" className='contact-data' value={this.addContactNumber} onChange={this.addNewContactNumber} placeholder="Telephone number" />
                        </FormGroup>
                    </Form>
                      <div>{this.state.errorMessage}</div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.submitNewContact}>Create</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <Search 
                    updateSearch={this.updateSearch} 
                    searchValue={this.state.searchContact} />
                <PhoneContactsList 
                    allContacts={this.state.contacts}
                    removeContact={this.removeContact}
                    search = {this.state.searchContact}/>
            </Col>
          </Row>
        </Container>

        <Row>
          <Col md={{ size: 8, offset: 2 }}><Footer /></Col>
        </Row>
      </Container>
    );
  }
}


export default App;

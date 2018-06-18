class Contact {
    constructor(contact) {
        this.firstName = contact.first_name;
        this.lastName = contact.last_name;
        this.number = contact.phone_number;
        this.id = contact.id;
    }
}

export default Contact;
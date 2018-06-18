import Contact from '../entities/Contact';


class ContactsRequest {
    allContactsData = () => {
     return fetch(`https://www.mariadoesweb.com/api/api.php/contacts`) 
            .then((response) => response.json())
            .then((contactsList) => {
                return contactsList.map((contact, i) => {
                    return new Contact(contact);
                })
        });
    };

    sendNewContact = (newContact) => {
        return fetch('https://www.mariadoesweb.com/api/api.php/contacts', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: newContact.id,
                    first_name: newContact.firstName,
                    last_name: newContact.lastName,
                    phone_number: newContact.number
                })
                }).then(res=>res.json())
                .then(res => console.log(res));
    };

    deleteContact = (contactToChange) => {
        return fetch(`https://www.mariadoesweb.com/api/api.php/contacts/${contactToChange}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
             method: 'delete'
                
                }).then(res=>res.json())
                .then(res => console.log(res));
    };
};

export const dataService = new ContactsRequest();
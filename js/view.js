import {controller} from "./controller.js";

export const view = {
    addContact(name, phone){
        const newContact = {number: controller.currentContacts + 1, name: name, phone: phone};
        controller.contactsArray.push(newContact);
        controller.saveContacts();
        controller.loadContacts();
    },

    editContact(index, name, phone){
        controller.contactsArray[index].name = name;
        controller.contactsArray[index].phone = phone;
        controller.saveContacts();
        controller.loadContacts();
    },

    renderContacts(contacts){
        const tbody = controller.contactsTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        contacts.forEach((contact, index) => {
            const row = `
            <tr class="table-row">
                <td class="table-col-data_1">${index + 1}</td>
                <td class="table-col-data_2">${contact.name}</td>
                <td class="table-col-data_3">${contact.phone}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    },

    openAddModal() {
        controller.addModal.classList.add("modal_active");
    },

    closeAddModal() {
        controller.addModal.classList.remove("modal_active");
        this.clearField();
    },

    openEditModal() {
        if(controller.selectedContacts.size == 1)
        controller.editModal.classList.add("modal_active");
    },

    closeEditModal() {
        controller.editModal.classList.remove("modal_active");
        this.clearField();
    },

    clearField() {
        controller.nameAddModal.value = "";
        controller.phoneAddModal.value = "";
        controller.addErrorMessage.innerHTML = "";
        controller.nameEditModal.value = "";
        controller.phoneEditModal.value = "";
        controller.editErrorMessage.innerHTML = "";
    },

    selectContact(i) {
        if (controller.selectedContacts.has(i)) {
            controller.contacts[i].classList.remove("row-selected");
            controller.selectedContacts.delete(i);
        } else {
            controller.contacts[i].classList.add("row-selected");
            controller.selectedContacts.add(i);
        }
    
    },

    deleteSelectedContacts(){
        controller.contactsArray = controller.contactsArray.filter((_, index) => !controller.selectedContacts.has(index));
        controller.saveContacts();
        controller.loadContacts();
        controller.selectedContacts.clear();
    },

    validatePhone(phone) {
        let regex = /^\+\d+(\s\d+)*$/;
        return regex.test(phone);
    }
}
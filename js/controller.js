import {view} from "./view.js";
class Contact{
    constructor(number){
        this.number =+ document.querySelectorAll(".table-col-data_1")[number].innerHTML;
        this.name = document.querySelectorAll(".table-col-data_2")[number].innerHTML;
        this.phone = document.querySelectorAll(".table-col-data_3")[number].innerHTML;
    }
};

export const controller = {
    // contacts
    contacts: undefined,
    currentContacts: undefined,
    contactsArray: [],
    selectedContacts: undefined,
    contactsTable: undefined,

    // add
    addContactBtn: undefined,
    addModal: undefined,
    exitAddModal: undefined,
    nameAddModal: undefined,
    phoneAddModal: undefined,
    buttonAddModal: undefined,
    addErrorMessage: undefined,

    // delete
    deleteContactBtn: undefined,

    // edit
    editContactBtn: undefined,
    editModal: undefined,
    exitEditModal: undefined,
    nameEditModal: undefined,
    phoneEditModal: undefined,
    buttonEditModal: undefined,
    editErrorMessage: undefined,

    saveContacts(){
        localStorage.setItem('tableData', JSON.stringify(controller.contactsArray));
    },

    loadContacts(){
        const data = localStorage.getItem('tableData');
        if(data){
            this.contactsArray = JSON.parse(data);
            view.renderContacts(this.contactsArray);
            this.contacts = document.querySelectorAll(".table-row");
            this.currentContacts = this.contacts.length;
        }
        else
        {
            this.getContacts();
        }
    },

    getContacts() {
        this.contacts = document.querySelectorAll(".table-row");
        this.currentContacts = this.contacts.length;
        this.contactsArray = [];
        for (let i = 1; i <= this.currentContacts; i++) {
            this.contactsArray.push(new Contact(i - 1));
        }
    },

    init()
    {
        this.selectedContacts = new Set();
        this.contactsTable = document.querySelector(".table");

        this.addContactBtn = document.querySelector("#btn-add");
        this.addModal = document.querySelector(".add-modal");
        this.exitAddModal = document.querySelector("#btn-add-close");
        this.buttonAddModal = document.querySelector("#btn-add_modal");
        this.nameAddModal = document.querySelector(".add-modal_name");
        this.phoneAddModal = document.querySelector(".add-modal_phone");
        this.addErrorMessage = document.querySelector("#addErrorMessage");

        this.deleteContactBtn = document.querySelector("#btn-remove");

        this.editContactBtn = document.querySelector("#btn-edit");
        this.editModal = document.querySelector(".edit-modal");
        this.exitEditModal = document.querySelector("#btn-edit-close");
        this.buttonEditModal = document.querySelector("#btn-edit_modal");
        this.nameEditModal = document.querySelector(".edit-modal_name");
        this.phoneEditModal = document.querySelector(".edit-modal_phone");
        this.editErrorMessage = document.querySelector("#editErrorMessage");

        this.loadContacts();
    }
}
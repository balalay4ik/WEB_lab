import { controller } from "./controller.js";
import { view } from "./view.js";

window.addEventListener("DOMContentLoaded", () => {

    controller.init();

    controller.addContactBtn.addEventListener("click", (e) => {
        view.openAddModal();
    });

    controller.exitAddModal.addEventListener("click", (e) => {
        view.closeAddModal();
    });

    controller.editContactBtn.addEventListener("click", (e) => {
        view.openEditModal();
    });

    controller.exitEditModal.addEventListener("click", (e) => {
        view.closeEditModal();
    });

    controller.buttonAddModal.addEventListener("click", (e) => {
        const name = controller.nameAddModal.value;
        const phone = controller.phoneAddModal.value;

        if(!view.validatePhone(phone) && name.length == 0)
        {
            controller.addErrorMessage.innerHTML = "Некоректний формат імені та номеру";
        }
        else if (!view.validatePhone(phone))
        {
            controller.addErrorMessage.innerHTML = "Некоректний формат номеру";
        }
        else if (name.length == 0) {
            controller.addErrorMessage.innerHTML = "Некоректний формат імені";
        } 

        if(!view.validatePhone(phone) || name.length == 0) return;

        view.addContact(name, phone);
        controller.saveContacts();
    });

    controller.buttonEditModal.addEventListener("click", (e) => {
        const name = controller.nameEditModal.value;
        const phone = controller.phoneEditModal.value;

        if(!view.validatePhone(phone) && name.length == 0)
        {
            controller.editErrorMessage.innerHTML = "Некоректний формат імені та номеру";
        }
        else if (!view.validatePhone(phone))
        {
            controller.editErrorMessage.innerHTML = "Некоректний формат номеру";
        }
        else if (name.length == 0) {
            controller.editErrorMessage.innerHTML = "Некоректний формат імені";
        } 

        if(!view.validatePhone(phone) || name.length == 0) return;
        
        view.editContact(controller.selectedContacts.values().next().value, name, phone);
    });

    controller.contactsTable.addEventListener("click", (e) =>{

        let target = e.target;
        let index = target.parentNode.cells[0].textContent
        view.selectContact(index-1);
    });

    controller.deleteContactBtn.addEventListener('click', () => view.deleteSelectedContacts());

})
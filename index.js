const { Command } = require("commander");
const contactsOperations = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await contactsOperations.listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await contactsOperations.getContactById(id);
        console.log(contactById);
        break;

      case "add":
        const newContactsList = await contactsOperations.addContact(
          name,
          email,
          phone
        );
        console.table(newContactsList);
        break;

      case "remove":
        const contactsAfterRemove = await contactsOperations.removeContact(id);
        console.table(contactsAfterRemove);
        break;

      // default:
      //   console.warn("Something went wrong.");
    }
  } catch (error) {
    throw error;
  }
};

(async function () {
  await invokeAction(argv);
})();

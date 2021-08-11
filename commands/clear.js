module.exports = {
    name: "clear",
    description: "Allow to clear messages.",
    async execute(message, args) {
        if (!args[0]) {
            return message.reply("Please enter a number of messages to delete such as: >del <number of message to delete>");
        }

        if (isNaN(args[0])) {
            return message.reply("Please enter a number of messages to delete such as: >del <number of message to delete>");
        }

        if (args[0] > 100) {
            return message.reply("You cannot delete more than 100 messages");
        }

        if (args[0] < 1) {
            return message.reply("You must at least delete 1 message. Don't try to fuck my program you piece of shit");
        }
        
        remainingToDelete = 0;
    
        messagesList = await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            console.log("Deleting " + args[0] + " messages");

            deletedMessagesMap = message.channel.bulkDelete(messages, true);
            deletedMessagesMap.then((value) => {
                myIterator = value.keys();
                current = myIterator.next();
                cpt = 0;

                while (!current.done) {
                    cpt += 1;
                    current = myIterator.next();
                }

                console.log("Number of BULK deleted messages: " + cpt);
                if (cpt < args[0]) {
                    remainingToDelete = args[0] - cpt;
                    // Could be optimized if messages were also deleted from this map
                    messages.forEach((key, value) => {
                        key.delete().catch((error) => 
                        console.log('\x1b[31m\x1b[1m' + "Couldn't find the message with ID: " 
                            + key + "\n\tThis is normal if you deleted messages older than 2 weeks." + '\x1b[37m\x1b[0m'));
                    })
                }
                return remainingToDelete;
            });

            return;
        });
    }
}
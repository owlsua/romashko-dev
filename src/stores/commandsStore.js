import { types } from 'mobx-state-tree';

const Command = types.model({
  value: types.optional(types.string, ''),
});

const CommandsStore = types
  .model({
    commands: types.array(Command),
  })
  .views((self) => ({
    getCommands() {
      return self.commands.map((command) => command.value);
    },
    getIndexOfCommand(command) {
      return self.commands.indexOf(command);
    },
  }))
  .actions((self) => ({
    addCommand(command) {
      self.commands.push({ value: command });
    },
    removeCommand(command) {
      self.commands.remove(command);
    },
    clear() {
      self.commands.clear();
    },
  }));

export default CommandsStore;

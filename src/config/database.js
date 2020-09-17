const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(
  'mongodb+srv://omnistack:omnistack13@cluster0.4fydw.mongodb.net/omnistack8?retryWrites=true&w=majority'
);

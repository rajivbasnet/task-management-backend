import mongoose from "mongoose";
import config from "../config/default";

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export const dbconn = mongoose.connect(config.db,
    ).then(
        () => console.log(`Connected to ${config.db}`)
    ).catch(
        () => console.log('Database Connection Error!')
    );

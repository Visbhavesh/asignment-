import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://0.0.0.0:27017/InternTask`;
    try {
        await mongoose.connect(URL)
        .then(res => console.log('Connected to db'));
    } catch(error) {
        console.error('Error: ', error.message);
    }
};

export default Connection;
